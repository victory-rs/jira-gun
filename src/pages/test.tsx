import * as React from 'react';
import { useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function TestPage() {

  const [title, setTitle] = useState<string>('inicijalno nije više prazno');

  useEffect(() => { }, [title]);

  return (
    <Layout>
      <Seo />

      <main>
        <section className='bg-gray-500 w-screen h-screen'>
          <h1>{title}</h1>
          <button onClick={() => { setTitle('aaaa') }}>Promeni title</button>
        </section>
      </main>
    </Layout>
  );
}
