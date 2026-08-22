import { Component } from '@angular/core';
import { GridApi, GridReadyEvent, ColDef } from 'ag-grid-community';

@Component({
  template: ''
})
export abstract class BaseGridComponent {
  // CHANGED: Marked as protected so child classes can read/write to it safely
  protected gridApi!: GridApi;
  public totalRecordsCount: number = 0;

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    filter: true,
    floatingFilter: true,
    sortable: true,
    unSortIcon: true,
    suppressHeaderMenuButton: true
  };

  public onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.updateRecordCount();
  }

  public onGlobalSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (this.gridApi) {
      this.gridApi.setGridOption('quickFilterText', target.value);
      this.updateRecordCount();
    }
  }

  public onFilterChanged(): void {
    this.updateRecordCount();
  }

  // CHANGED: Marked as public/protected so child component methods can run it manually
  public updateRecordCount(): void {
    if (this.gridApi) {
      this.totalRecordsCount = this.gridApi.getDisplayedRowCount();
    }
  }

  public exportToCsv(fileName: string = 'Grid_Data_Export'): void {
    if (this.gridApi) {
      this.gridApi.exportDataAsCsv({ fileName });
    }
  }
}
