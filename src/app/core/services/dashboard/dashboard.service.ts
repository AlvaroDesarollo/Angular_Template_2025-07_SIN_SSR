import { Injectable } from '@angular/core';
import { ROUTES } from '@core/constants';
import { DashboardSummary } from '@core/models';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private readonly api: ApiService) {}

  async getSummary(): Promise<DashboardSummary> {
    try {
      return await this.api.get<DashboardSummary>(ROUTES.DASHBOARD_SUMMARY);
    } catch {
      // Safe fallback for starter projects before backend is ready.
      return {
        title: 'Dashboard',
        subtitle: 'Base inicial para tu nuevo proyecto',
        kpis: [
          { id: 'users', label: 'Usuarios', value: '0', trend: 'stable' },
          { id: 'sales', label: 'Ventas', value: '$0', trend: 'stable' },
          { id: 'orders', label: 'Pedidos', value: '0', trend: 'stable' },
        ],
      };
    }
  }
}
