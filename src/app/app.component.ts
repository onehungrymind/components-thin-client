import { Component } from '@angular/core';

// import 'rxjs/add/observable/from';
// import 'rxjs/add/observable/interval';
// import 'rxjs/add/operator/zip';
// import 'rxjs/add/operator/skip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  links = [
    {path: '/home', icon: 'home', label: 'Home'},
    {path: '/clients', icon: 'face', label: 'Clients'},
    {path: '/projects', icon: 'work', label: 'Projects'}
  ];
}
