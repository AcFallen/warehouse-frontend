import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule],
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent {
  title = 'warehouse-frontend';
}
