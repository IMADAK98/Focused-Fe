import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

interface Step {
  id: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-design-shell',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './design-shell.component.html',
  styleUrl: './design-shell.component.css'
})
export class DesignShellComponent {
  steps: Step[] = [
    { id: 'focus-area', label: 'Focus', route: '/design/focus-area' },
    { id: 'intake', label: 'Intake', route: '/design/intake' },
    { id: 'as-is', label: 'As-Is', route: '/design/as-is' },
    { id: 'calibration', label: 'Calibrate', route: '/design/calibration' },
    { id: 'to-be', label: 'To-Be', route: '/design/to-be' },
    { id: 'daily-run', label: 'Run', route: '/design/daily-run' }
  ];

  constructor(private router: Router) {}

  currentIndex(): number {
    const currentRoute = this.router.url;
    return this.steps.findIndex(step => currentRoute.includes(step.id));
  }

  isComplete(index: number): boolean {
    return index < this.currentIndex();
  }

  isActive(index: number): boolean {
    return index === this.currentIndex();
  }

  stepClass(index: number): string {
    if (this.isActive(index)) {
      return 'stepper__dot stepper__dot--active';
    }
    if (this.isComplete(index)) {
      return 'stepper__dot stepper__dot--done';
    }
    return 'stepper__dot';
  }
}
