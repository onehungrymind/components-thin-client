import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../shared/models/project.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {
  originalName;
  currentProject: Project;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
  @Input() set project(value) {
    if (value) { this.originalName = value.name; }
    this.currentProject = Object.assign({}, value);
  }
}
