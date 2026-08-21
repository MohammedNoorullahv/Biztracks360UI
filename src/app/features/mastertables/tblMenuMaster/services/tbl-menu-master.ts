import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TblMenuMasterAdd } from '../models/tblMenuMaster-Add.model';
import { TblMenuMasterUpdate } from '../models/tblMenuMaster-Update.model';
import { TblMenuMaster } from '../models/tblMenuMaster.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class TblMenuMasterService {
  constructor(private http: HttpClient) { }

  //GET ALL
  getAllTblMenuMasters(): Observable<TblMenuMaster[]> {
    return this.http.get<TblMenuMaster[]>(`${environment.apiBaseUrl}/api/TblMenuMaster/GetAllTblMenuMasters`);
  };

  //GET ACTIVE
  getActiveTblMenuMasters(): Observable<TblMenuMaster[]> {
    return this.http.get<TblMenuMaster[]>(`${environment.apiBaseUrl}/api/TblMenuMaster/GetActiveTblMenuMasters`);
  };

  //GET ACTIVELEAN
  getActiveLeanTblMenuMasters(): Observable<TblMenuMaster[]> {
    return this.http.get<TblMenuMaster[]>(`${environment.apiBaseUrl}/api/TblMenuMaster/GetActiveLeanTblMenuMasters`);
  };

  //POST
  addTblMenuMaster(model: TblMenuMasterAdd): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/TblMenuMaster/CreateTblMenuMaster`, model);
  };

  //GET
  getTblMenuMasterById(id: number): Observable<TblMenuMaster> {
    return this.http.get<TblMenuMaster>(`${environment.apiBaseUrl}/api/TblMenuMaster/GetTblMenuMasterById/${id}`);
  };

  //UPDATE
  updateTblMenuMaster(tblMenuMasterupdate: TblMenuMasterUpdate): Observable<TblMenuMaster> {
    return this.http.patch<TblMenuMaster>(`${environment.apiBaseUrl}/api/TblMenuMaster/updateTblMenuMaster`, tblMenuMasterupdate);
  };

  //DELETE
  deleteTblMenuMaster(tblMenuMasterdelete: TblMenuMasterUpdate): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/TblMenuMaster/DeleteTblMenuMaster`,
      {
        body: tblMenuMasterdelete,
        observe: 'response'
      });
  };

}
