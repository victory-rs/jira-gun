import { User } from 'jira.js/out/version3/models';
import { Bodies, Composite, Engine, Mouse, MouseConstraint, Render, Runner, World } from 'matter-js';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useRef } from 'react';

import { useUsers } from '@/data/use-users.hook';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function ProjectPage() {
  const router = useRouter();
  const projectId = router.query.id as string;
  const users = useUsers();
  const visibleUsers: User[] = [];

  const scene = useRef<HTMLDivElement>(null);
  const engine = useRef<Engine>(Engine.create({ timing: { timeScale: 0.5 } } as any));
  const isPressed = useRef(false)

  useEffect(() => {
    const hiddenUsers: string[] = JSON.parse(localStorage.getItem('hiddenUsers') ?? '[]');
    users.filter(u => !hiddenUsers.includes(u.accountId)).forEach(u => visibleUsers.push(u));
    if (!visibleUsers || visibleUsers.length === 0) {
      return;
    }
    // mount
    const cw = document.body.clientWidth
    const ch = document.body.clientHeight

    const render = Render.create({
      element: scene.current ?? undefined,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent',
      }
    })

    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine.current, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: true
          },
        }
      } as any);
    Composite.add(engine.current.world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;


    // boundaries
    World.add(engine.current.world, [
      // Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-50, ch * 2.5, 100, ch * 5, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 50, ch * 2.5, 100, ch * 5, { isStatic: true })
    ])

    World.add(engine.current.world, [
      Bodies.rectangle(cw, ch / 5, cw / 2, 20, { isStatic: true }),
      Bodies.rectangle(cw - (cw / 4), ch / 5 - (40), 20, 80, { isStatic: true }),
    ])


    // users
    const avatarUrlToScale = (avatarUrl?: string): number => {
      if (!avatarUrl) {
        return 1;
      }
      if (avatarUrl.includes('default-avatar') || avatarUrl.includes('initials')) {
        return 0.18;
      }
      return 1;
    }
    let y = 0;
    const userBalls = visibleUsers.map(user => {
      y -= 30;
      return Bodies.circle(
        cw / 2,
        y,
        30,
        {
          mass: 10,
          restitution: 0.9,
          friction: 0.005,
          render: {
            sprite: {
              texture: user.avatarUrls?.['48x48'] ?? '',
              xScale: avatarUrlToScale(user.avatarUrls?.['48x48']),
              yScale: avatarUrlToScale(user.avatarUrls?.['48x48']),
            }
          }
        })
    })
    World.add(engine.current.world, userBalls)

    // run the engine
    Runner.run(engine.current)
    Render.run(render)

    // unmount
    return () => {
      // destroy Matter
      Render.stop(render);
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
      render.canvas.remove()
      render.textures = {}
    }
  }, [visibleUsers])

  return (
    <Layout>
      <Seo />

      <main>
        <section className='bg-gray-500 w-screen h-screen'>
          <div
          >
            <div ref={scene} style={{ width: '100%', height: '100%' }} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
