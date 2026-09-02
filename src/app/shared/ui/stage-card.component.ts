import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { BottleneckCalloutComponent } from './bottleneck-callout.component';
import { LoopStage, StageType, Bottleneck } from '../../core/session/types';

@Component({
  selector: 'app-stage-card',
  standalone: true,
  imports: [CdkDragHandle, BottleneckCalloutComponent],
  templateUrl: './stage-card.component.html',
  styleUrl: './stage-card.component.css'
})
export class StageCardComponent {
  @Input({ required: true }) stage!: LoopStage;
  @Input() editable = false;
  @Input() draggable = false;
  @Input() showAccent = false;
  @Input() bottleneck: Bottleneck | null = null;
  @Output() stageChange = new EventEmitter<Partial<Pick<LoopStage, 'title' | 'body'>>>();

  editing = signal(false);

  get isBottleneck(): boolean {
    return !!this.bottleneck && this.bottleneck.stageId === this.stage.id;
  }

  get type(): StageType {
    return this.stage.type;
  }

  get label(): string {
    return this.type.charAt(0).toUpperCase() + this.type.slice(1);
  }

  toggleEdit() {
    this.editing.update(value => !value);
  }

  onTitle(event: Event) {
    const target = event.target as HTMLInputElement;
    this.stageChange.emit({ title: target.value });
  }

  onBody(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.stageChange.emit({ body: target.value });
  }
}
