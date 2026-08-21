import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TblStateMaster } from '../models/tblStateMaster.model';
import { TblStateMasterService } from '../services/tbl-state-master';


@Component({
  selector: 'app-tbl-state-master-list',
  imports: [
    AsyncPipe, CommonModule, RouterLink
  ],
  templateUrl: './tbl-state-master-list.html',
  styleUrl: './tbl-state-master-list.css',
})

export class TblStateMasterListComponent implements OnInit {
tblStateMaster$?: Observable<TblStateMaster[]>;
actionType: string = '';
submitAction: 'Load All' | 'Active Only' = 'Load All'; // default to Load All

constructor(private tblStateMasterService: TblStateMasterService) {
}
ngOnInit(): void {
	this.actionType = 'Load All';
	this.tblStateMaster$ = this.tblStateMasterService.getAllTblStateMasters();
}
OnFormSubmit(action: string): void {
	if (action === 'Load All')
	{
		this.actionType = "Load All";
		this.tblStateMaster$ = this.tblStateMasterService.getAllTblStateMasters();
	}
	else
	{
		this.actionType = "Active Only";
		this.tblStateMaster$ = this.tblStateMasterService.getActiveTblStateMasters();
	}
}
}

