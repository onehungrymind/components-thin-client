import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../shared/models/project.model';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent {
  @Input() projects: Project[];
  @Input() readOnly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
