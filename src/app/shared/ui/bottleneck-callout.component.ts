import { Component, Input } from '@angular/core';
import { Bottleneck } from '../../core/session/types';

@Component({
  selector: 'app-bottleneck-callout',
  standalone: true,
  templateUrl: './bottleneck-callout.component.html',
  styleUrl: './bottleneck-callout.component.css'
})
export class BottleneckCalloutComponent {
  @Input() bottleneck: Bottleneck | null = null;
  @Input() compact = false;
}
