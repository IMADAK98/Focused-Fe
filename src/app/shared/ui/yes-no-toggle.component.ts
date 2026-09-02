import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-yes-no-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex gap-2">
      <button
        [class]="getButtonClass(true)"
        (click)="onChange(true)">
        Yes
      </button>
      <button
        [class]="getButtonClass(false)"
        (click)="onChange(false)">
        No
      </button>
    </div>
  `
})
export class YesNoToggleComponent {
  @Input() value: boolean | null = null;
  @Output() valueChange = new EventEmitter<boolean>();

  getButtonClass(isYes: boolean): string {
    const base = 'px-4 py-2 text-sm font-semibold rounded-md transition-colors border';
    const isActive = this.value === isYes;
    
    if (isActive) {
      return isYes
        ? `${base} bg-rd-success text-white border-rd-success`
        : `${base} bg-rd-danger text-white border-rd-danger`;
    } else {
      return `${base} bg-rd-surface text-rd-text-secondary border-rd-border hover:border-rd-accent`;
    }
  }

  onChange(value: boolean) {
    this.valueChange.emit(value);
  }
}
