import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'reposhot-footer',
  imports: [MatToolbarModule],
  templateUrl: './footer.html',
})
export class Footer {
  readonly currentYear = new Date().getFullYear();
}
