import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Documentproject';
  authEventData: { username: string, password: string } | null = null;

  onAuthEvent(eventData: { username: string, password: string }): void {
    this.authEventData = eventData;
  }
}
