import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'app-footer-cta',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './footer-cta.component.html',
  styleUrl: './footer-cta.component.css'
})
export class FooterCTAComponent {
  @Input() showBack = true;
  @Input() showNext = true;
  @Input() nextLabel = 'Next';
  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
