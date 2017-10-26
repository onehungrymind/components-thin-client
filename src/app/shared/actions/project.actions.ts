import { Action } from '@ngrx/store';
import { Project } from '../models/project.model';

export const LOAD = '[Project] Load';
export const LOAD_SUCCESS = '[Project] Load Success';
export const CREATE = '[Project] Create';
export const CREATE_FAILED = '[Project] Create FAILED';
export const UPDATE = '[Project] Update';
export const DELETE = '[Project] Delete';
export const SELECT = '[Project] Select';
export const CLEAR = '[Project] Clear';

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: any = null) { }
}

export class LoadActionSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Project[]) { }
}

export class CreateAction implements Action {
  readonly type = CREATE;

  constructor(public payload: Project) { }
}

export class CreateActionFailed implements Action {
  readonly type = CREATE_FAILED;

  constructor(public payload: any) { }
}

export class UpdateAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: Project) { }
}

export class DeleteAction implements Action {
  readonly type = DELETE;

  constructor(public payload: string) { }
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: Project) { }
}

export class ClearAction implements Action {
  readonly type = CLEAR;

  constructor(public payload: any = null) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type All
  = LoadAction
  | LoadActionSuccess
  | CreateAction
  | CreateActionFailed
  | UpdateAction
  | DeleteAction
  | SelectAction
  | ClearAction;
