import { Engine } from 'matter-js';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useRef } from 'react';

import { useUsers } from '@/data/use-users.hook';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function ProjectPage() {
  const router = useRouter();
  const projectId = router.query.id as string;
  const users = useUsers();

  const scene = useRef<HTMLDivElement>(null);
  const engine = useRef<Engine>(Engine.create());

  return (
    <Layout>
      <Seo />

      <main>
        <section className='bg-gray-500'>
          {/* <div className='layout flex min-h-screen flex-col items-center justify-center text-center'> */}
          <div className='flex flex-wrap justify-between p-12'>
            {/* <h1>Project {projectId}</h1> */}
            {users.map(u => (
              <div className="card w-96 bg-base-100 shadow-xl m-12" key={u.accountId}>
                <figure className="px-10 pt-10">
                  <div className="avatar">
                    <div className="w-24 mask mask-squircle">
                      <img src={u.avatarUrls?.['48x48']} alt="Shoes" className="rounded-xl w-32 h-32" />
                    </div>
                  </div>
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{u.displayName}</h2>
                  {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
                  {/* <div className="card-actions">
                    <button className="btn btn-primary">Upucaj</button>
                  </div> */}
                </div>
              </div>

            ))}
            {/* </div> */}
          </div>
        </section>
      </main>
    </Layout>
  );
}
