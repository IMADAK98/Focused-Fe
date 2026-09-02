import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<Event>();

  get buttonClass(): string {
    switch (this.variant) {
      case 'primary':
        return 'rd-btn rd-btn--primary';
      case 'secondary':
        return 'rd-btn rd-btn--secondary';
      case 'ghost':
        return 'rd-btn rd-btn--ghost';
      default:
        return 'rd-btn';
    }
  }

  handleClick(event: Event) {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
