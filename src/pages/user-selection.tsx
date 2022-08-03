import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import * as React from 'react';
import { useEffect } from 'react';

import { useUsers } from '@/data/use-users.hook';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function ProjectPage() {
  const users = useUsers();
  const [hiddenUsers, setHiddenUsers] = React.useState<string[]>([]);

  useEffect(() => {
    const hiddenUsers: string[] = JSON.parse(localStorage.getItem('hiddenUsers') ?? '[]');
    if (hiddenUsers && hiddenUsers.length > 0) {
      setHiddenUsers(hiddenUsers);
    }
  }, [setHiddenUsers])

  const usersWithVisibility = users.map(user => ({
    ...user,
    hidden: hiddenUsers.includes(user.accountId),
  }));

  const toggleUserVisibility = (accountId: string) => {
    const newHiddenUsers: string[] = hiddenUsers.includes(accountId)
      ? hiddenUsers.filter(userId => userId !== accountId)
      : [...hiddenUsers, accountId];
    localStorage.setItem('hiddenUsers', JSON.stringify(newHiddenUsers));
    setHiddenUsers(newHiddenUsers);
  }


  return (
    <Layout>
      <Seo />

      <main>
        <section className='bg-gray-500 w-screen h-screen'>
          <div className='flex flex-wrap justify-around'>
            {usersWithVisibility.map(u => (<div onClick={() => { toggleUserVisibility(u.accountId) }} className='bg-white rounded-lg w-1/3 p-2 m-2 flex flex-row justify-between items-center gap-4' key={u.key}>

              <div className="avatar flex-1">
                <div className="w-24 mask mask-squircle">
                  <img src={u.avatarUrls?.['48x48']} />
                </div>
              </div>
              <p className='flex-1 w-0'>
                {u.displayName}
              </p>
              {u.hidden ? <EyeOffIcon className="h-12 w-12 flex-1" /> : <EyeIcon className="h-12 w-12 fex-1" />}
            </div>))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
