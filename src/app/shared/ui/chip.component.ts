import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="chipClass"
      (click)="toggle.emit()">
      {{ text }}
    </button>
  `
})
export class ChipComponent {
  @Input() text = '';
  @Input() selected = false;
  @Output() toggle = new EventEmitter<void>();

  get chipClass(): string {
    const base = 'px-4 py-2 rounded-full text-sm font-medium transition-all border';
    
    if (this.selected) {
      return `${base} bg-rd-accent-soft border-rd-accent text-rd-accent`;
    } else {
      return `${base} bg-rd-surface border-rd-border text-rd-text-secondary hover:border-rd-accent hover:text-rd-accent`;
    }
  }
}
