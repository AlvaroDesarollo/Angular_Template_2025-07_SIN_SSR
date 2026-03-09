import { Component, computed, inject } from '@angular/core';
import { SpinnerService } from '@core/services';
import { SpinnerComponent, LoadingComponent } from '@shared/index';

@Component({
  selector: 'app-spinner-host',
  imports: [SpinnerComponent, LoadingComponent],
  templateUrl: './spinner-host.component.html',
  styleUrl: './spinner-host.component.scss',
})
export class SpinnerHostComponent {
  private spinner = inject(SpinnerService);
  isActive = computed(() => this.spinner.active());

  // Loading con mensaje
  isLoadingActive = computed(() => this.spinner.loadingActive());
  loadingMessage = computed(() => this.spinner.loadingMessage());
  fullScreen = computed(() => this.spinner.loadingFullScreen());
}

