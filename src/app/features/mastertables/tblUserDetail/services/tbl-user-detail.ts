import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TblUserDetail } from '../models/tblUserDetail.model';
import { TblUserDetailAdd } from '../models/tblUserDetail-Add.model';
import { TblUserDetailUpdate } from '../models/tblUserDetail-Update.model';
import { environment } from '../../../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class TblUserDetailService {

  constructor(private http: HttpClient) { }

  //GET ALL
  getAllTblUserDetails(fldFKUser: number): Observable<TblUserDetail[]> {
    return this.http.get<TblUserDetail[]>(`${environment.apiBaseUrl}/api/TblUserDetail/GetAllTblUserDetails?FldFKUser=${fldFKUser}`);
  };

  //GET ACTIVE
  getActiveTblUserDetails(fldFKUser: number): Observable<TblUserDetail[]> {
    return this.http.get<TblUserDetail[]>(`${environment.apiBaseUrl}/api/TblUserDetail/GetActiveTblUserDetails?FldFKUser=${fldFKUser}`);
  };

  //GET ACTIVELEAN
  getActiveLeanTblUserDetails(fldFKUser: number): Observable<TblUserDetail[]> {
    return this.http.get<TblUserDetail[]>(`${environment.apiBaseUrl}/api/TblUserDetail/GetActiveLeanTblUserDetails?FldFKUser=${fldFKUser}`);
  };

  //POST
  addTblUserDetail(model: TblUserDetailAdd): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/TblUserDetail/CreateTblUserDetail`, model);
  };

  //GET
  getTblUserDetailById(id: number): Observable<TblUserDetail> {
    return this.http.get<TblUserDetail>(`${environment.apiBaseUrl}/api/TblUserDetail/GetTblUserDetailById/${id}`);
  };

  //UPDATE
  updateTblUserDetail(tblUserDetailupdate: TblUserDetailUpdate): Observable<TblUserDetail> {
    return this.http.patch<TblUserDetail>(`${environment.apiBaseUrl}/api/TblUserDetail/updateTblUserDetail`, tblUserDetailupdate);
  };

  //DELETE
  deleteTblUserDetail(tblUserDetaildelete: TblUserDetailUpdate): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/TblUserDetail/DeleteTblUserDetail`,
      {
        body: tblUserDetaildelete,
        observe: 'response'
      });
  };


}
