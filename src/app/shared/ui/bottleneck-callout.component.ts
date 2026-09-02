import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bottleneck } from '../../core/session/types';

@Component({
  selector: 'app-bottleneck-callout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-rd-bottleneck-soft border-l-4 border-rd-bottleneck rounded-lg p-4">
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5 text-rd-bottleneck" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="text-sm font-semibold text-rd-bottleneck mb-1">Bottleneck Detected</h3>
          @if (bottleneck) {
            <p class="text-sm text-rd-text-primary mb-2">{{ bottleneck.content }}</p>
            <p class="text-xs text-rd-text-secondary">{{ bottleneck.reason }}</p>
          }
        </div>
      </div>
    </div>
  `
})
export class BottleneckCalloutComponent {
  @Input() bottleneck: Bottleneck | null = null;
}
