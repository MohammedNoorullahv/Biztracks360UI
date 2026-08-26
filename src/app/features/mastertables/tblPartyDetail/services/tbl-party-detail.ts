import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TblPartyDetail } from '../models/tblPartyDetail.model';
import { TblPartyDetailAdd } from '../models/tblPartyDetail-Add.model';
import { TblPartyDetailUpdate } from '../models/tblPartyDetail-Update.model';
import { environment } from '../../../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})

export class TblPartyDetailService {

  constructor(private http: HttpClient) { }

  //GET ALL
  getAllTblPartyDetails(): Observable<TblPartyDetail[]> {
    return this.http.get<TblPartyDetail[]>(`${environment.apiBaseUrl}/api/TblPartyDetail/GetAllTblPartyDetails`);
  };

  //GET ACTIVE
  getActiveTblPartyDetails(): Observable<TblPartyDetail[]> {
    return this.http.get<TblPartyDetail[]>(`${environment.apiBaseUrl}/api/TblPartyDetail/GetActiveTblPartyDetails`);
  };

  //GET ACTIVELEAN
  getActiveLeanTblPartyDetails(): Observable<TblPartyDetail[]> {
    return this.http.get<TblPartyDetail[]>(`${environment.apiBaseUrl}/api/TblPartyDetail/GetActiveLeanTblPartyDetails`);
  };

  //POST
  addTblPartyDetail(model: TblPartyDetailAdd): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/TblPartyDetail/CreateTblPartyDetail`, model);
  };

  //GET
  getTblPartyDetailById(id: number): Observable<TblPartyDetail> {
    return this.http.get<TblPartyDetail>(`${environment.apiBaseUrl}/api/TblPartyDetail/GetTblPartyDetailById/${id}`);
  };

  //UPDATE
  updateTblPartyDetail(tblPartyDetailupdate: TblPartyDetailUpdate): Observable<TblPartyDetail> {
    return this.http.patch<TblPartyDetail>(`${environment.apiBaseUrl}/api/TblPartyDetail/updateTblPartyDetail`, tblPartyDetailupdate);
  };

  //DELETE
  deleteTblPartyDetail(tblPartyDetaildelete: TblPartyDetailUpdate): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/TblPartyDetail/DeleteTblPartyDetail`,
      {
        body: tblPartyDetaildelete,
        observe: 'response'
      });
  };
}
