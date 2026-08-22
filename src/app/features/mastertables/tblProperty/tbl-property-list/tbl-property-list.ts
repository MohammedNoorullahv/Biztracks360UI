import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, RowClickedEvent, GridReadyEvent } from 'ag-grid-community';

import { TblProperty } from '../models/tblProperty.model';
import { TblPropertyService } from '../services/tbl-property';
import { BaseGridComponent } from '../../../../shared/component/base-grid.component';


@Component({
  selector: 'app-tbl-property-list',
  imports: [AsyncPipe, CommonModule, RouterLink, AgGridAngular],
  templateUrl: './tbl-property-list.html',
  styleUrl: './tbl-property-list.css',
})
export class TblPropertyListComponent extends BaseGridComponent implements OnInit {
  tblProperty$?: Observable<TblProperty[]>;
  actionType: string = '';
  submitAction: 'Load All' | 'Active Only' = 'Load All';

  public colDefs: ColDef[] = [
    {
      field: 'fldId',
      headerName: 'Id',
      maxWidth: 100,
      cellClass: 'cell-code',
      cellRenderer: (params: any) => {
        if (params.node.isPinned()) {
          return `<strong>Summary Metrics:</strong>`;
        }
        return params.value;
      }
    },
    {
      headerName: 'Property Master',
      valueGetter: params => params.data?.tblPropertyMasterId?.fldDescription || ''
    },
    {
      field: 'fldSlNo',
      headerName: 'Sl No',
      maxWidth: 100,
      cellRenderer: (params: any) => {
        if (params.node.isPinned()) {
          return `Avg: ${params.value || 0}`;
        }
        return params.value;
      }
    },
    {
      field: 'fldDescription',
      headerName: 'Description',
      cellClass: 'cell-primary'
    },
    {
      field: 'fldShortName',
      headerName: 'Short Name'
    },
    {
      field: 'fldSetAsDefault',
      headerName: 'Set As Default',
      maxWidth: 150,
      cellRenderer: (params: any) => {
        if (params.node.isPinned()) return '';
        return `<span class="badge-pill ${params.value ? 'badge-success' : 'badge-muted'}">${params.value ? 'Yes' : 'No'}</span>`;
      }
    },
    {
      headerName: 'Actions',
      maxWidth: 120,
      filter: false,
      sortable: false,
      cellRenderer: (params: any) => {
        if (params.node.isPinned()) return '';
        const id = params.data?.fldId;
        return `
          <div class="row-actions">
            <a class="icon-btn edit" title="Edit" data-action="edit" data-id="${id}"><i class="bi bi-pencil-square"></i></a>
            <a class="icon-btn delete" title="Delete" data-action="delete" data-id="${id}"><i class="bi bi-trash3"></i></a>
          </div>
        `;
      }
    }
  ];




  constructor(private tblPropertyService: TblPropertyService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.actionType = 'Load All';
    this.fetchData();
  }

  private fetchData(): void {
    if (this.actionType === 'Load All') {
      this.tblProperty$ = this.tblPropertyService.getAllTblPropertys();
    } else {
      this.tblProperty$ = this.tblPropertyService.getActiveTblPropertys();
    }

    this.tblProperty$.subscribe(data => {
      if (data) {
        setTimeout(() => {
          // FIX: Added 'this.' prefix to inherited methods
          this.updateRecordCount();
          this.calculatePropertyStats();
        }, 100);
      }
    });
  }

  override onGridReady(params: GridReadyEvent): void {
    super.onGridReady(params);
    this.calculatePropertyStats();
  }

  override onGlobalSearch(event: Event): void {
    super.onGlobalSearch(event);
    this.calculatePropertyStats();
  }

  override onFilterChanged(): void {
    super.onFilterChanged();
    this.calculatePropertyStats();
  }

  private calculatePropertyStats(): void {
    if (!this.gridApi) return;

    let slNoSum = 0;
    let validRowsCount = 0;

    this.gridApi.forEachNodeAfterFilter((rowNode) => {
      // Safely target the correct database key name
      if (rowNode.data && rowNode.data.fldSlNo != null) {
        const value = Number(rowNode.data.fldSlNo);
        if (!isNaN(value)) {
          slNoSum += value;
          validRowsCount++;
        }
      }
    });

    const averageSlNo = validRowsCount > 0 ? (slNoSum / validRowsCount).toFixed(1) : '0';

    this.gridApi.setGridOption('pinnedBottomRowData', [
      {
        fldId: '', // Keeps cellRenderer free to inject the label cleanly
        fldSlNo: averageSlNo
      }
    ]);
  }

  onRowClicked(event: RowClickedEvent): void {
    const target = event.event?.target as HTMLElement;
    const anchor = target.closest('a');
    if (!anchor || anchor.closest('.ag-row-pinned')) return;

    const action = anchor.getAttribute('data-action');
    const id = anchor.getAttribute('data-id');

    if (id && (action === 'edit' || action === 'delete')) {
      const queryAction = action === 'edit' ? 'Edit' : 'Delete';
      this.router.navigate([`/mastertables/tblProperty/Edit`, id], {
        queryParams: { action: queryAction }
      });
    }
  }
}
