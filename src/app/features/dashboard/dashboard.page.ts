import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardSummary } from '@core/models';
import { DashboardService } from '@core/services';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage implements OnInit {
  summary: DashboardSummary | null = null;

  constructor(private readonly dashboardService: DashboardService) {}

  async ngOnInit(): Promise<void> {
    console.log('DashboardPage initialized');
    this.summary = await this.dashboardService.getSummary();
  }
}
