import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Step {
  id: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-design-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="min-h-screen flex flex-col">
      <header class="bg-rd-surface border-b border-rd-border px-6 py-4">
        <h1 class="text-2xl font-semibold text-rd-text-primary">Routine Designer</h1>
      </header>

      <div class="bg-rd-surface border-b border-rd-border px-6 py-4">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center justify-between">
            @for (step of steps; track step.id; let i = $index) {
              <div class="flex items-center">
                <div class="flex flex-col items-center">
                  <div 
                    [class]="getStepClass(i)"
                    class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2">
                    {{ i + 1 }}
                  </div>
                  <span class="text-xs text-rd-text-secondary">{{ step.label }}</span>
                </div>
                @if (i < steps.length - 1) {
                  <div class="w-16 h-0.5 bg-rd-border mx-2 mb-6"></div>
                }
              </div>
            }
          </div>
        </div>
      </div>

      <main class="flex-1">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class DesignShellComponent {
  steps: Step[] = [
    { id: 'focus-area', label: 'Focus', route: '/design/focus-area' },
    { id: 'intake', label: 'Intake', route: '/design/intake' },
    { id: 'as-is', label: 'As-Is', route: '/design/as-is' },
    { id: 'calibration', label: 'Calibration', route: '/design/calibration' },
    { id: 'to-be', label: 'To-Be', route: '/design/to-be' },
    { id: 'daily-run', label: 'Daily Run', route: '/design/daily-run' }
  ];

  constructor(private router: Router) {}

  getStepClass(index: number): string {
    const currentRoute = this.router.url;
    const currentStepIndex = this.steps.findIndex(s => currentRoute.includes(s.id));
    
    if (index === currentStepIndex) {
      return 'bg-rd-accent text-rd-on-accent';
    } else if (index < currentStepIndex) {
      return 'bg-rd-success text-rd-on-accent';
    } else {
      return 'bg-gray-200 text-gray-600';
    }
  }
}
