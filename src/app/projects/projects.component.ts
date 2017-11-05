import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/models/project.model';
import * as ProjectActions from '../shared/actions/project.actions';
import { Observable } from 'rxjs/Observable';
import { SocketService } from '../shared/services/socket.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  currentProject$: Observable<Project>;

  constructor(private store: SocketService) {
    this.projects$ = store.select('projects');
    this.currentProject$ = store.select('currentProject');
  }

  ngOnInit() {
    this.store.dispatch(new ProjectActions.LoadAction());
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    const newProject: Project = { id: null, name: '', description: '' };
    this.store.dispatch(new ProjectActions.SelectAction(newProject));
  }

  setCurrentProject(project) {
    this.store.dispatch(new ProjectActions.SelectAction(project));
  }

  cancel() {
    this.resetCurrentProject();
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.store.dispatch(new ProjectActions.CreateAction(project));
    this.resetCurrentProject();
  }

  updateProject(project) {
    this.store.dispatch(new ProjectActions.UpdateAction(project));
    this.resetCurrentProject();
  }

  deleteProject(project) {
    this.store.dispatch(new ProjectActions.DeleteAction(project.id));
    this.resetCurrentProject();
  }
}
