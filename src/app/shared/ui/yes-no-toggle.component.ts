import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-yes-no-toggle',
  standalone: true,
  templateUrl: './yes-no-toggle.component.html',
  styleUrl: './yes-no-toggle.component.css'
})
export class YesNoToggleComponent {
  @Input() value: boolean | null = null;
  @Input() prompt = false;
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<boolean>();

  onChange(value: boolean) {
    if (this.disabled) {
      return;
    }
    this.valueChange.emit(value);
  }

  yesClass(): string {
    if (this.prompt && this.value === null) {
      return 'yn-btn yn-btn--prompt';
    }
    return this.value === true ? 'yn-btn yn-btn--yes' : 'yn-btn yn-btn--idle';
  }

  noClass(): string {
    if (this.prompt && this.value === null) {
      return 'yn-btn yn-btn--prompt';
    }
    return this.value === false ? 'yn-btn yn-btn--no' : 'yn-btn yn-btn--idle';
  }
}
