import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TblPartyMaster } from '../models/tblPartyMaster.model';
import { TblPartyMasterAdd } from '../models/tblPartyMaster-Add.model';
import { TblPartyMasterUpdate } from '../models/tblPartyMaster-Update.model';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TblPartyMasterService {

  constructor(private http: HttpClient) { }

  //GET ALL
  getAllTblPartyMasters(): Observable<TblPartyMaster[]> {
    return this.http.get<TblPartyMaster[]>(`${environment.apiBaseUrl}/api/TblPartyMaster/GetAllTblPartyMasters`);
  };

  //GET ACTIVE
  getActiveTblPartyMasters(): Observable<TblPartyMaster[]> {
    return this.http.get<TblPartyMaster[]>(`${environment.apiBaseUrl}/api/TblPartyMaster/GetActiveTblPartyMasters`);
  };

  //GET ACTIVELEAN
  getActiveLeanTblPartyMasters(): Observable<TblPartyMaster[]> {
    return this.http.get<TblPartyMaster[]>(`${environment.apiBaseUrl}/api/TblPartyMaster/GetActiveLeanTblPartyMasters`);
  };

  //POST
  addTblPartyMaster(model: TblPartyMasterAdd): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/TblPartyMaster/CreateTblPartyMaster`, model);
  };

  //GET
  getTblPartyMasterById(id: number): Observable<TblPartyMaster> {
    return this.http.get<TblPartyMaster>(`${environment.apiBaseUrl}/api/TblPartyMaster/GetTblPartyMasterById/${id}`);
  };

  //UPDATE
  updateTblPartyMaster(tblPartyMasterupdate: TblPartyMasterUpdate): Observable<TblPartyMaster> {
    return this.http.patch<TblPartyMaster>(`${environment.apiBaseUrl}/api/TblPartyMaster/updateTblPartyMaster`, tblPartyMasterupdate);
  };

  //DELETE
  deleteTblPartyMaster(tblPartyMasterdelete: TblPartyMasterUpdate): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/TblPartyMaster/DeleteTblPartyMaster`,
      {
        body: tblPartyMasterdelete,
        observe: 'response'
      });
  };


}
