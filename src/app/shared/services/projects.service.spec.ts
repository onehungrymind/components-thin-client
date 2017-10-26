import { TestBed, inject } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import { HttpModule } from '@angular/http';

describe('ProjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectsService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([ProjectsService], (service: ProjectsService) => {
    expect(service).toBeTruthy();
  }));
});
