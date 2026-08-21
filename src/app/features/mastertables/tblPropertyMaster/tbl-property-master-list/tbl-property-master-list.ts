import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TblPropertyMaster } from '../models/tblPropertyMaster.model';
import { TblPropertyMasterService } from '../services/tbl-property-master';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';


@Component({
  // selector: 'app-tbl-property-master-list',
  // imports: [],
  // templateUrl: './tbl-property-master-list.html',
  // styleUrl: './tbl-property-master-list.css',
  selector: 'app-tbl-property-master-list',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    RouterLink
  ],
  templateUrl: './tbl-property-master-list.html',
  styleUrl: './tbl-property-master-list.css'
})


export class TblPropertyMasterListComponent implements OnInit {
  tblPropertyMaster$?: Observable<TblPropertyMaster[]>;
  actionType: string = '';
  submitAction: 'Load All' | 'Active Only' = 'Load All'; // default to Load All

  constructor(private tblPropertyMasterService: TblPropertyMasterService) {
  }
  
  ngOnInit(): void {
    this.actionType = 'Load All';
    this.tblPropertyMaster$ = this.tblPropertyMasterService.getAllTblPropertyMasters();

    // Calculate next Sl No
    this.tblPropertyMaster$.subscribe(data => {

      if (!data || data.length === 0) {

        // No records
        this.tblPropertyMasterService.setNextSlNo(1);

        console.log('No records. Next Sl No = 1');

      } else {

        // Get MAX(FldSlNo) + 1
        const maxSlNo = Math.max(
          ...data.map(x => Number(x.fldSlNo) || 0)
        );

        const nextSlNo = maxSlNo + 1;

        this.tblPropertyMasterService.setNextSlNo(nextSlNo);

        console.log('MAX Sl No =', maxSlNo);
        console.log('Next Sl No =', nextSlNo);
      }

    });
  }

  OnFormSubmit(action: string): void {
    if (action === 'Load All') {
      this.actionType = "Load All";
      this.tblPropertyMaster$ = this.tblPropertyMasterService.getAllTblPropertyMasters();
    }
    else {
      this.actionType = "Active Only";
      this.tblPropertyMaster$ = this.tblPropertyMasterService.getActiveTblPropertyMasters();
    }
  }
}

// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-tbl-property-master-list',
//   standalone: true,
//   imports: [],
//   templateUrl: './tbl-property-master-list.html',
//   styleUrl: './tbl-property-master-list.css'
// })
// export class TblPropertyMasterListComponent implements OnInit {

//   constructor() {
//     console.log('PROPERTY MASTER COMPONENT CREATED');
//   }

//   ngOnInit(): void {
//     console.log('PROPERTY MASTER ngOnInit FIRED');
//   }
// }