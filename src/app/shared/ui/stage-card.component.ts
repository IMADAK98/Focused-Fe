import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StageType } from '../../core/session/types';

@Component({
  selector: 'app-stage-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div [class]="cardClass">
      <div class="flex items-start gap-3">
        <div [class]="iconClass">
          <span class="text-sm font-semibold">{{ stageLabel }}</span>
        </div>
        <div class="flex-1">
          @if (editable) {
            <textarea
              [value]="content"
              (input)="onContentChange($event)"
              class="w-full px-3 py-2 border border-rd-border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rd-accent"
              rows="3"
              [placeholder]="placeholder">
            </textarea>
          } @else {
            <p class="text-sm text-rd-text-primary">{{ content }}</p>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    textarea {
      font-family: inherit;
    }
  `]
})
export class StageCardComponent {
  @Input() type: StageType = 'cue';
  @Input() content = '';
  @Input() editable = false;
  @Input() placeholder = '';
  @Output() contentChange = new EventEmitter<string>();

  get cardClass(): string {
    const base = 'bg-rd-surface border rounded-lg p-4 shadow-sm';
    const borderColors: Record<StageType, string> = {
      'cue': 'border-l-4 border-l-rd-stage-cue',
      'environment': 'border-l-4 border-l-rd-stage-environment',
      'friction': 'border-l-4 border-l-rd-stage-friction'
    };
    return `${base} ${borderColors[this.type]}`;
  }

  get iconClass(): string {
    const base = 'px-3 py-1 rounded-full text-xs font-semibold';
    const colors: Record<StageType, string> = {
      'cue': 'bg-indigo-100 text-indigo-700',
      'environment': 'bg-sky-100 text-sky-700',
      'friction': 'bg-rose-100 text-rose-700'
    };
    return `${base} ${colors[this.type]}`;
  }

  get stageLabel(): string {
    return this.type.charAt(0).toUpperCase() + this.type.slice(1);
  }

  onContentChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.contentChange.emit(target.value);
  }
}
