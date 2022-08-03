import { NextApiRequest, NextApiResponse } from 'next';

import { jiraClient } from '@/services/jira.service';

export default async function projects(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projects = await jiraClient.projects.getAllProjects();
  res.status(200).json(projects);
}
