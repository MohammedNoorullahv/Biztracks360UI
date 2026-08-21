import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TblProperty } from '../models/tblProperty.model';
import { TblPropertyService } from '../services/tbl-property';


@Component({
  selector: 'app-tbl-property-list',
  imports: [
    AsyncPipe,
    CommonModule,
    RouterLink
  ],
  templateUrl: './tbl-property-list.html',
  styleUrl: './tbl-property-list.css',
})

export class TblPropertyListComponent implements OnInit {
tblProperty$?: Observable<TblProperty[]>;
actionType: string = '';
submitAction: 'Load All' | 'Active Only' = 'Load All'; // default to Load All

constructor(private tblPropertyService: TblPropertyService) {
}
ngOnInit(): void {
	console.log('TblPropertyListComponent initialized');
	this.actionType = 'Load All';
	this.tblProperty$ = this.tblPropertyService.getAllTblPropertys();
}
OnFormSubmit(action: string): void {
	if (action === 'Load All')
	{
		this.actionType = "Load All";
		this.tblProperty$ = this.tblPropertyService.getAllTblPropertys();
	}
	else
	{
		this.actionType = "Active Only";
		this.tblProperty$ = this.tblPropertyService.getActiveTblPropertys();
	}
}
}
