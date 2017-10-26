import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import * as ProjectActions from '../actions/project.actions';
export type Action = ProjectActions.All;

import { ProjectsService } from '../services/';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectEffects {
  @Effect() load$ = this.actions$
    .ofType(ProjectActions.LOAD)
    .switchMap(() => this.projectsService.all())
    .map(projects => new ProjectActions.LoadActionSuccess(projects))
  ;

  @Effect() create$ = this.actions$
    .ofType(ProjectActions.CREATE)
    .map((action: Action) => action.payload)
    .switchMap(project => {
      return this.projectsService.create(project)
        .catch(() => Observable.of(ProjectActions.CREATE_FAILED));
    })
    .map(result => new ProjectActions.LoadAction())
  ;

  @Effect() update$ = this.actions$
    .ofType(ProjectActions.UPDATE)
    .map((action: Action) => action.payload)
    .switchMap(project => this.projectsService.update(project))
    .map(result => new ProjectActions.LoadAction())
  ;

  @Effect() delete$ = this.actions$
    .ofType(ProjectActions.DELETE)
    .map((action: Action) => action.payload)
    .switchMap(projectId => this.projectsService.delete(projectId))
    .map(result => new ProjectActions.LoadAction())
  ;

  constructor(
    private projectsService: ProjectsService,
    private actions$: Actions
  ) { }
}
