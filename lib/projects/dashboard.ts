import type { Project } from "./types";

interface DashboardProjects {
  ownedProjects: Project[];
  sharedProjects: Project[];
}

export async function loadDashboardProjects(
  loadOwnedProjects: () => Promise<Project[]>,
  loadSharedProjects: () => Promise<Project[]>,
): Promise<DashboardProjects> {
  const ownedProjects = await loadOwnedProjects();
  const sharedProjects = await loadSharedProjects();

  return { ownedProjects, sharedProjects };
}
