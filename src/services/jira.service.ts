import { Version3Client } from 'jira.js';

export const jiraClient = new Version3Client({
  host: 'https://victoryrs.atlassian.net/',
  authentication: {
    basic: {
      email: process.env.JIRA_EMAIL ?? '',
      apiToken: process.env.JIRA_API_TOKEN ?? '',
    },
  },
  newErrorHandling: true,
});
