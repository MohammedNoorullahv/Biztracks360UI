import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {TblCounterInvoice } from '../models/tblCounterInvoice.model';
import {TblCounterInvoiceAdd } from '../models/tblCounterInvoice-Add.model';
import {TblCounterInvoiceUpdate } from '../models/tblCounterInvoice-Update.model';
import { environment } from '../../../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})

export class TblCounterInvoiceService {
constructor(private http: HttpClient) { }

//GET ALL
getAllTblCounterInvoices(fldFromDate: string, fldToDate: string): Observable<TblCounterInvoice[]>{
	const params = new HttpParams().set('FldFromDate', fldFromDate).set('FldToDate', fldToDate);
	return this.http.get<TblCounterInvoice[]>(`${environment.apiBaseUrl}/api/TblCounterInvoice/GetAllTblCounterInvoices`, { params });
};

//GET ACTIVE
getActiveTblCounterInvoices(): Observable<TblCounterInvoice[]>{
	return this.http.get<TblCounterInvoice[]>(`${environment.apiBaseUrl}/api/TblCounterInvoice/GetActiveTblCounterInvoices`);
};

//GET ACTIVELEAN
getActiveLeanTblCounterInvoices(): Observable<TblCounterInvoice[]>{
	return this.http.get<TblCounterInvoice[]>(`${environment.apiBaseUrl}/api/TblCounterInvoice/GetActiveLeanTblCounterInvoices`);
};

  //GET LAST PO
  getLastTblCounterInvoice(fldFKUnit: number): Observable<TblCounterInvoice>{
	return this.http.get<TblCounterInvoice>(`${environment.apiBaseUrl}/api/TblCounterInvoice/GetLastTblCounterInvoice/${fldFKUnit}`);
  };

//POST
addTblCounterInvoice(model: TblCounterInvoiceAdd): Observable<TblCounterInvoice>{
	return this.http.post<TblCounterInvoice>(`${environment.apiBaseUrl}/api/TblCounterInvoice/CreateTblCounterInvoice`, model);
};

//GET
getTblCounterInvoiceById(id: number): Observable<TblCounterInvoice>{
	return this.http.get<TblCounterInvoice>(`${ environment.apiBaseUrl}/api/TblCounterInvoice/GetTblCounterInvoiceById/${id}`);
};

//UPDATE
updateTblCounterInvoice(tblCounterInvoiceupdate: TblCounterInvoiceUpdate): Observable<TblCounterInvoice>{
	return this.http.patch<TblCounterInvoice>(`${ environment.apiBaseUrl}/api/TblCounterInvoice/updateTblCounterInvoice` ,tblCounterInvoiceupdate);
};

//DELETE
deleteTblCounterInvoice(tblCounterInvoicedelete: TblCounterInvoiceUpdate): Observable<HttpResponse<any>>{
	return this.http.delete<any>(`${ environment.apiBaseUrl}/api/TblCounterInvoice/DeleteTblCounterInvoice` ,
		{
			body: tblCounterInvoicedelete,
			observe: 'response'
		});
};

}
