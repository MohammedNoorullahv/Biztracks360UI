import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment.development';

import { TblStateMaster } from '../models/tblStateMaster.model';
import { TblStateMasterAdd } from '../models/tblStateMaster-Add.model';
import { TblStateMasterUpdate } from '../models/tblStateMaster-Update.model';
import { environment } from '../../../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class TblStateMasterService {

  constructor(private http: HttpClient) { }

  //GET ALL
  getAllTblStateMasters(): Observable<TblStateMaster[]> {
    return this.http.get<TblStateMaster[]>(`${environment.apiBaseUrl}/api/TblStateMaster/GetAllTblStateMasters`);
  };

  //GET ACTIVE
  getActiveTblStateMasters(): Observable<TblStateMaster[]> {
    return this.http.get<TblStateMaster[]>(`${environment.apiBaseUrl}/api/TblStateMaster/GetActiveTblStateMasters`);
  };

  //GET ACTIVELEAN
  getActiveLeanTblStateMasters(): Observable<TblStateMaster[]> {
    return this.http.get<TblStateMaster[]>(`${environment.apiBaseUrl}/api/TblStateMaster/GetActiveLeanTblStateMasters`);
  };

  //POST
  addTblStateMaster(model: TblStateMasterAdd): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/TblStateMaster/CreateTblStateMaster`, model);
  };

  //GET
  getTblStateMasterById(id: number): Observable<TblStateMaster> {
    return this.http.get<TblStateMaster>(`${environment.apiBaseUrl}/api/TblStateMaster/GetTblStateMasterById/${id}`);
  };

  //UPDATE
  updateTblStateMaster(tblStateMasterupdate: TblStateMasterUpdate): Observable<TblStateMaster> {
    return this.http.patch<TblStateMaster>(`${environment.apiBaseUrl}/api/TblStateMaster/updateTblStateMaster`, tblStateMasterupdate);
  };

  //DELETE
  deleteTblStateMaster(tblStateMasterdelete: TblStateMasterUpdate): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/TblStateMaster/DeleteTblStateMaster`,
      {
        body: tblStateMasterdelete,
        observe: 'response'
      });
  };

}
