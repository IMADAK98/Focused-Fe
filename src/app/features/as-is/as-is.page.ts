import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { DesignSessionStore } from '../../core/session/design-session.store';
import { LoopStage } from '../../core/session/types';
import { FooterCTAComponent } from '../../shared/ui/footer-cta.component';
import { StageCardComponent } from '../../shared/ui/stage-card.component';
import { InfoBannerComponent } from '../../shared/ui/info-banner.component';

@Component({
  selector: 'app-as-is-page',
  standalone: true,
  imports: [CdkDropList, CdkDrag, FooterCTAComponent, StageCardComponent, InfoBannerComponent],
  templateUrl: './as-is.page.html',
  styleUrl: './as-is.page.css'
})
export class AsIsPage {
  private store = inject(DesignSessionStore);
  private router = inject(Router);

  asIsLoop = this.store.asIsLoop;
  bottleneck = this.store.bottleneck;
  focusArea = this.store.focusArea;

  updateStage(index: number, patch: Partial<Pick<LoopStage, 'title' | 'body'>>) {
    this.store.updateAsIsStage(index, patch);
  }

  onDrop(event: CdkDragDrop<LoopStage[]>) {
    this.store.reorderAsIsStages(event.previousIndex, event.currentIndex);
  }

  onBack() {
    this.router.navigate(['/design/intake']);
  }

  onNext() {
    this.router.navigate(['/design/calibration']);
  }
}
