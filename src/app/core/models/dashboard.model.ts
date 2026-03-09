export interface DashboardKpi {
  id: string;
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface DashboardSummary {
  title: string;
  subtitle: string;
  kpis: DashboardKpi[];
}
