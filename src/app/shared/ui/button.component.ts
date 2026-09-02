import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [class]="buttonClass"
      (click)="handleClick($event)">
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<Event>();

  get buttonClass(): string {
    const base = 'px-4 py-2 text-sm font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    
    switch (this.variant) {
      case 'primary':
        return `${base} bg-rd-accent text-rd-on-accent hover:opacity-90`;
      case 'secondary':
        return `${base} bg-transparent border border-rd-border text-rd-text-primary hover:bg-gray-50`;
      case 'ghost':
        return `${base} bg-transparent text-rd-text-secondary hover:bg-gray-50`;
      default:
        return base;
    }
  }

  handleClick(event: Event) {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
