import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chip',
  standalone: true,
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.css'
})
export class ChipComponent {
  @Input() text = '';
  @Input() selected = false;
  @Output() toggle = new EventEmitter<void>();

  get chipClass(): string {
    return this.selected ? 'rd-chip rd-chip--selected' : 'rd-chip';
  }
}
