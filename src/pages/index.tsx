import * as React from 'react';

import { useProjects } from '@/data/use-projects.hook';

import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

export default function HomePage() {
  const projects = useProjects();

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          {/* <div className='layout flex min-h-screen flex-col items-center justify-center text-center'> */}
          <div className='flex flex-wrap'>

            {projects.map(p => (<a href={`/project?id=${p.id}`} key={p.id}>
              <div className="card w-96 bg-base-100 shadow-xl m-12">
                <figure><img src={p.avatarUrls?.['48x48']} alt={p.name} /></figure>
                <div className="card-body">
                  <h2 className="card-title">{p.name}</h2>
                  <p>{p.description}</p>
                </div>
              </div>

            </a>))}
          </div>
          <footer className='absolute bottom-2 text-gray-700'>
            © {new Date().getFullYear()} By{' '}
            <UnderlineLink href='https://victory.rs'>
              Victory.rs
            </UnderlineLink>
          </footer>
          {/* </div> */}
        </section>
      </main>
    </Layout>
  );
}
