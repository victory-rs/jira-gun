import { Project } from 'jira.js/out/version3/models';
import { useEffect, useState } from 'react';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await (await fetch('/api/projects')).json();
      setProjects(projects);
    };
    fetchProjects();
  }, [setProjects]);
  return projects;
};
