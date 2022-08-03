import { User } from 'jira.js/out/version2/models';
import { useEffect, useState } from 'react';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await (await fetch('/api/users')).json();
      setUsers(users);
    };
    fetchUsers();
  }, [setUsers]);
  return users;
};
