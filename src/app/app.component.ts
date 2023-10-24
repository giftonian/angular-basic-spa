import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // This is the tag name to be used for this component e.g., <app-root></app-root>
  //template: `<h2>Tour of Heroes</h2>`,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tour-of-heroes';
}
