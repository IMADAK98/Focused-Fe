import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DesignSessionStore } from '../../core/session/design-session.store';
import { FooterCTAComponent } from '../../shared/ui/footer-cta.component';
import { StageCardComponent } from '../../shared/ui/stage-card.component';
import { BottleneckCalloutComponent } from '../../shared/ui/bottleneck-callout.component';

@Component({
  selector: 'app-as-is-page',
  standalone: true,
  imports: [CommonModule, FooterCTAComponent, StageCardComponent, BottleneckCalloutComponent],
  template: `
    <div class="flex flex-col min-h-[calc(100vh-180px)]">
      <div class="flex-1 px-6 py-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-rd-text-primary mb-2">Your Current Loop</h2>
          <p class="text-rd-text-secondary mb-8">Map out how things work today</p>

          <div class="space-y-4">
            @for (stage of asIsLoop(); track $index) {
              <app-stage-card
                [type]="stage.type"
                [content]="stage.content"
                [editable]="true"
                (contentChange)="updateStage($index, $event)" />
            }
          </div>

          @if (bottleneck()) {
            <div class="mt-6">
              <app-bottleneck-callout [bottleneck]="bottleneck()" />
            </div>
          }
        </div>
      </div>

      <app-footer-cta
        (back)="onBack()"
        (next)="onNext()" />
    </div>
  `
})
export class AsIsPage {
  private store = inject(DesignSessionStore);
  private router = inject(Router);

  asIsLoop = this.store.asIsLoop;
  bottleneck = this.store.bottleneck;

  updateStage(index: number, content: string) {
    this.store.updateAsIsStage(index, content);
  }

  onBack() {
    this.router.navigate(['/design/intake']);
  }

  onNext() {
    this.router.navigate(['/design/calibration']);
  }
}
