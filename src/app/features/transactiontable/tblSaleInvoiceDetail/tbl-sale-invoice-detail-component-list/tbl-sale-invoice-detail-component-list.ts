import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TblSaleInvoiceDetail } from '../models/tblSaleInvoiceDetail.model';
//import { TblSaleInvoiceDetailService } from '../services/tbl-sale-invoice-detail';


@Component({
  selector: 'app-tbl-sale-invoice-detail-component-list',
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './tbl-sale-invoice-detail-component-list.html',
  styleUrl: './tbl-sale-invoice-detail-component-list.css',
})
export class TblSaleInvoiceDetailComponentList {

}
