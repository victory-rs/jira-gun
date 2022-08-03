import { NextApiRequest, NextApiResponse } from 'next';

import { jiraClient } from '@/services/jira.service';

export default async function users(req: NextApiRequest, res: NextApiResponse) {
  // const id = req.query.id as string;
  // const project = await jiraClient.projects.getProject({ projectIdOrKey: id });

  //group jira users: 98f1697f-01c9-4ec9-90c8-86ce2fcd2257
  // const users = await jiraClient.myself.getCurrentUser({ expand: 'groups' });
  const users = await jiraClient.users.getAllUsersDefault({ maxResults: 5000 });
  res.status(200).json(users.filter((u) => u.active));
}
