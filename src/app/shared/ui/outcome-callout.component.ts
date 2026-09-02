import { Component, input } from '@angular/core';

@Component({
  selector: 'app-outcome-callout',
  standalone: true,
  templateUrl: './outcome-callout.component.html',
  styleUrl: './outcome-callout.component.css'
})
export class OutcomeCalloutComponent {
  statement = input('');
  note = input('');
}
