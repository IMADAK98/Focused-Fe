import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'app-footer-cta',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="border-t border-rd-border bg-rd-surface px-6 py-4">
      <div class="max-w-4xl mx-auto flex justify-between">
        @if (showBack) {
          <app-button variant="secondary" (clicked)="back.emit()">
            Back
          </app-button>
        } @else {
          <div></div>
        }
        
        @if (showNext) {
          <app-button variant="primary" (clicked)="next.emit()">
            {{ nextLabel }}
          </app-button>
        }
      </div>
    </div>
  `
})
export class FooterCTAComponent {
  @Input() showBack = true;
  @Input() showNext = true;
  @Input() nextLabel = 'Next';
  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
