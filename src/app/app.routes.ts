import { Routes } from '@angular/router';
import { Navbar } from './core/components/navbar/navbar';
import { TblPropertyMasterListComponent } from './features/mastertables/tblPropertyMaster/tbl-property-master-list/tbl-property-master-list';
import { TblPropertyMasterAddComponent } from './features/mastertables/tblPropertyMaster/tbl-property-master-add/tbl-property-master-add';
import { TblPropertyMasterUpdateComponent } from './features/mastertables/tblPropertyMaster/tbl-property-master-update/tbl-property-master-update';
import { TblPropertyListComponent } from './features/mastertables/tblProperty/tbl-property-list/tbl-property-list';
import { TblPropertyAddComponent } from './features/mastertables/tblProperty/tbl-property-add/tbl-property-add';
import { TblPropertyUpdateComponent } from './features/mastertables/tblProperty/tbl-property-update/tbl-property-update';
import { TblStateMasterListComponent } from './features/mastertables/tblStateMaster/tbl-state-master-list/tbl-state-master-list';
import { TblStateMasterAddComponent } from './features/mastertables/tblStateMaster/tbl-state-master-add/tbl-state-master-add';
import { TblStateMasterUpdateComponent } from './features/mastertables/tblStateMaster/tbl-state-master-update/tbl-state-master-update';
import { TblMenuMasterListComponent } from './features/mastertables/tblMenuMaster/tbl-menu-master-list/tbl-menu-master-list';
import { TblMenuMasterAddComponent } from './features/mastertables/tblMenuMaster/tbl-menu-master-add/tbl-menu-master-add';
import { TblMenuMasterUpdateComponent } from './features/mastertables/tblMenuMaster/tbl-menu-master-update/tbl-menu-master-update';
import { TblHSNMasterListComponent } from './features/mastertables/tblHSNMaster/tbl-hsnmaster-list/tbl-hsnmaster-list';
import { TblHSNMasterAddComponent } from './features/mastertables/tblHSNMaster/tbl-hsnmaster-add/tbl-hsnmaster-add';
import { TblHSNMasterUpdateComponent } from './features/mastertables/tblHSNMaster/tbl-hsnmaster-update/tbl-hsnmaster-update';
import { TblAreaMasterListComponent } from './features/mastertables/tblAreaMaster/tbl-area-master-list/tbl-area-master-list';
import { TblAreaMasterAddComponent } from './features/mastertables/tblAreaMaster/tbl-area-master-add/tbl-area-master-add';
import { TblAreaMasterUpdateComponent } from './features/mastertables/tblAreaMaster/tbl-area-master-update/tbl-area-master-update';

export const routes: Routes = [
  {
    path: '',
    component: Navbar,
    children: [
      {
        path: 'mastertables/tblPropertyMaster',
        component: TblPropertyMasterListComponent
      },
      {
        path: 'mastertables/tblPropertyMaster/add',
        component: TblPropertyMasterAddComponent,
      },
      {
        path: 'mastertables/tblPropertyMaster/Edit/:id',
        component: TblPropertyMasterUpdateComponent,
      },
      {
        path: 'mastertables/tblProperty',
        component: TblPropertyListComponent,
      },
      {
        path: 'mastertables/tblProperty/add',
        component: TblPropertyAddComponent,
      },
      {
        path: 'mastertables/tblProperty/Edit/:id',
        component: TblPropertyUpdateComponent,
      },
      {
        path: 'mastertables/tblStateMaster',
        component: TblStateMasterListComponent,
      },
      {
        path: 'mastertables/tblStateMaster/add',
        component: TblStateMasterAddComponent,
      },
      {
        path: 'mastertables/tblStateMaster/Edit/:id',
        component: TblStateMasterUpdateComponent,
      },
      {
        path: 'mastertables/tblMenuMaster',
        component: TblMenuMasterListComponent,
      },
      {
        path: 'mastertables/tblMenuMaster/add',
        component: TblMenuMasterAddComponent,
      },
      {
        path: 'mastertables/tblMenuMaster/Edit/:id',
        component: TblMenuMasterUpdateComponent,
      },
      {
        path: 'mastertables/tblHSNMaster',
        component: TblHSNMasterListComponent,
      },
      {
        path: 'mastertables/tblHSNMaster/add',
        component: TblHSNMasterAddComponent,
      },
      {
        path: 'mastertables/tblHSNMaster/Edit/:id',
        component: TblHSNMasterUpdateComponent,
      },
      {
        path: 'mastertables/tblAreaMaster',
        component: TblAreaMasterListComponent,
      },
      {
        path: 'mastertables/tblAreaMaster/add',
        component: TblAreaMasterAddComponent,
      },
      {
        path: 'mastertables/tblAreaMaster/Edit/:id',
        component: TblAreaMasterUpdateComponent,
      }

      // Add other menu routes here later
    ]
  }
];
