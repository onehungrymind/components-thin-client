import { Project } from './project.model';

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  projects: Project[];
}
