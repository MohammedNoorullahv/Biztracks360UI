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
import { TblCompanyMasterListComponent } from './features/mastertables/tblCompanyMaster/tbl-company-master-list/tbl-company-master-list';
import { TblCompanyMasterAddComponent } from './features/mastertables/tblCompanyMaster/tbl-company-master-add/tbl-company-master-add';
import { TblCompanyMasterUpdateComponent } from './features/mastertables/tblCompanyMaster/tbl-company-master-update/tbl-company-master-update';
import { TblPartyMasterListComponent } from './features/mastertables/tblPartyMaster/tbl-party-master-list/tbl-party-master-list';
import { TblPartyMasterAddComponent } from './features/mastertables/tblPartyMaster/tbl-party-master-add/tbl-party-master-add';
import { TblPartyMasterUpdateComponent } from './features/mastertables/tblPartyMaster/tbl-party-master-update/tbl-party-master-update';
import { TblRoleListComponent } from './features/mastertables/tblRole/tbl-role-list/tbl-role-list';
import { TblRoleAddComponent } from './features/mastertables/tblRole/tbl-role-add/tbl-role-add';
import { TblUnitMasterListComponent } from './features/mastertables/tblUnitMaster/tbl-unit-master-list/tbl-unit-master-list';
import { TblRoleUpdateComponent } from './features/mastertables/tblRole/tbl-role-update/tbl-role-update';
import { TblUserHeaderListComponent } from './features/mastertables/tblUserHeader/tbl-user-header-list/tbl-user-header-list';
import { TblUserHeaderAddComponent } from './features/mastertables/tblUserHeader/tbl-user-header-add/tbl-user-header-add';
import { TblUserHeaderUpdateComponent } from './features/mastertables/tblUserHeader/tbl-user-header-update/tbl-user-header-update';
import { TblUserDetailListComponent } from './features/mastertables/tblUserDetail/tbl-user-detail-list/tbl-user-detail-list';
import { TblUserDetailAddComponent } from './features/mastertables/tblUserDetail/tbl-user-detail-add/tbl-user-detail-add';
import { TblUserDetailUpdateComponent } from './features/mastertables/tblUserDetail/tbl-user-detail-update/tbl-user-detail-update';
import { TblItemMasterListComponent } from './features/mastertables/tblItemMaster/tbl-item-master-list/tbl-item-master-list';
import { TblItemMasterAddComponent } from './features/mastertables/tblItemMaster/tbl-item-master-add/tbl-item-master-add';
import { TblItemMasterUpdateComponent } from './features/mastertables/tblItemMaster/tbl-item-master-update/tbl-item-master-update';

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
      },
      {
        path: 'mastertables/tblCompanyMaster',
        component: TblCompanyMasterListComponent,
      },
      {
        path: 'mastertables/tblCompanyMaster/add',
        component: TblCompanyMasterAddComponent,
      },
      {
        path: 'mastertables/tblCompanyMaster/Edit/:id',
        component: TblCompanyMasterUpdateComponent,
      },
      {
        path: 'mastertables/tblPartyMaster',
        component: TblPartyMasterListComponent,
      },
      {
        path: 'mastertables/tblPartyMaster/add',
        component: TblPartyMasterAddComponent,
      },
      {
        path: 'mastertables/tblPartyMaster/Edit/:id',
        component: TblPartyMasterUpdateComponent,
      },
      {
        path: 'mastertables/tblRole',
        component: TblRoleListComponent,
      },
      {
        path: 'mastertables/tblRole/add',
        component: TblRoleAddComponent,
      },
      {
        path: 'mastertables/tblUnitMaster',
        component: TblUnitMasterListComponent,
      },
      {
        path: 'mastertables/tblRole/Edit/:id',
        component: TblRoleUpdateComponent,
      },
      {
        path: 'mastertables/tblUserHeader',
        component: TblUserHeaderListComponent,
      },
      {
        path: 'mastertables/tblUserHeader/add',
        component: TblUserHeaderAddComponent,
      },
      {
        path: 'mastertables/tblUserHeader/Edit/:id',
        component: TblUserHeaderUpdateComponent,
      },
      {
        path: 'mastertables/tblUserDetail/:fldFKUser',
        component: TblUserDetailListComponent,
      },
      {
        path: 'mastertables/tblUserDetail/:fldFKUser/add',
        component: TblUserDetailAddComponent,
      },
      {
        path: 'mastertables/tblUserDetail/:fldFKUser/Edit/:id',
        component: TblUserDetailUpdateComponent,
      },
      {
        path: 'mastertables/tblItemMaster',
        component: TblItemMasterListComponent,
      },
      {
        path: 'mastertables/tblItemMaster/add',
        component: TblItemMasterAddComponent,
      },
      {
        path: 'mastertables/tblItemMaster/Edit/:id',
        component: TblItemMasterUpdateComponent,
      }




















      // Add other menu routes here later
    ]
  }
];
