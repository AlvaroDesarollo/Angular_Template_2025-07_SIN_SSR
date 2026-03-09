import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() page = 1;
  @Input() totalPages = 1;
  @Input() hasNextPage = false;
  @Input() hasPrevPage = false;

  @Output() pageChange = new EventEmitter<number>();

  get visiblePages(): number[] {
    if (this.totalPages <= 1) return [1];

    const start = Math.max(1, this.page - 2);
    const end = Math.min(this.totalPages, start + 4);
    const normalizedStart = Math.max(1, end - 4);

    return Array.from(
      { length: end - normalizedStart + 1 },
      (_, index) => normalizedStart + index,
    );
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.page) return;
    this.pageChange.emit(page);
  }

  previous() {
    if (!this.hasPrevPage) return;
    this.goToPage(this.page - 1);
  }

  next() {
    if (!this.hasNextPage) return;
    this.goToPage(this.page + 1);
  }
}
