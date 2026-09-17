import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {TblSaleInvoice } from '../models/tblSaleInvoice.model';
import {TblSaleInvoiceAdd } from '../models/tblSaleInvoice-Add.model';
import {TblSaleInvoiceUpdate } from '../models/tblSaleInvoice-Update.model';
import { environment } from '../../../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})

export class TblSaleInvoiceService {
constructor(private http: HttpClient) { }

//GET ALL
getAllTblSaleInvoices(fldFromDate: string, fldToDate: string): Observable<TblSaleInvoice[]> {
	const params = new HttpParams()
		.set('FldFromDate', fldFromDate)
		.set('FldToDate', fldToDate);

	return this.http.get<TblSaleInvoice[]>(
		`${environment.apiBaseUrl}/api/TblSaleInvoice/GetAllTblSaleInvoices`, 
		{ params }
	);
}

//GET ALL LEAN
getAllLeanTblSaleInvoices(fldFromDate: string, fldToDate: string): Observable<TblSaleInvoice[]> {
	const params = new HttpParams()
		.set('FldFromDate', fldFromDate)
		.set('FldToDate', fldToDate);

	return this.http.get<TblSaleInvoice[]>(
		`${environment.apiBaseUrl}/api/TblSaleInvoice/GetAllLeanTblSaleInvoices`, 
		{ params }
	);
}

//GET PENDING
getPendingTblSaleInvoices(fldStatus: string): Observable<TblSaleInvoice[]> {
	const params = new HttpParams()
		.set('FldStatus', fldStatus);

	return this.http.get<TblSaleInvoice[]>(
		`${environment.apiBaseUrl}/api/TblSaleInvoice/GetPendingTblSaleInvoices`, 
		{ params }
	);
}

//GET PENDING LEAN
getPendingLeanTblSaleInvoices(fldStatus: string): Observable<TblSaleInvoice[]> {
	const params = new HttpParams()
		.set('FldStatus', fldStatus);

	return this.http.get<TblSaleInvoice[]>(
		`${environment.apiBaseUrl}/api/TblSaleInvoice/GetPendingLeanTblSaleInvoices`, 
		{ params }
	);
}

//POST
addTblSaleInvoice(model: TblSaleInvoiceAdd): Observable<void>{
	return this.http.post<void>(`${ environment.apiBaseUrl}/api/TblSaleInvoice/CreateTblSaleInvoice`, model);
};

//GET
getTblSaleInvoiceById(id: number): Observable<TblSaleInvoice>{
	return this.http.get<TblSaleInvoice>(`${ environment.apiBaseUrl}/api/TblSaleInvoice/GetTblSaleInvoiceById/${id}`);
};

//GET LAST PO
  getLastTblSaleInvoice(fldFKUnit: number): Observable<TblSaleInvoice>{
	return this.http.get<TblSaleInvoice>(`${environment.apiBaseUrl}/api/TblSaleInvoice/GetLastblSaleInvoiceById/${fldFKUnit}`);
  };

//UPDATE
updateTblSaleInvoice(tblSaleInvoiceupdate: TblSaleInvoiceUpdate): Observable<TblSaleInvoice>{
	return this.http.patch<TblSaleInvoice>(`${ environment.apiBaseUrl}/api/TblSaleInvoice/updateTblSaleInvoice` ,tblSaleInvoiceupdate);
};

//DELETE
deleteTblSaleInvoice(tblSaleInvoicedelete: TblSaleInvoiceUpdate): Observable<HttpResponse<any>>{
	return this.http.delete<any>(`${ environment.apiBaseUrl}/api/TblSaleInvoice/DeleteTblSaleInvoice` ,
		{
			body: tblSaleInvoicedelete,
			observe: 'response'
		});
};
}