import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../../environments/environment.development';
import { TblPropertyMasterAdd } from '../models/tblPropertyMaster-Add.model';
import { TblPropertyMasterUpdate } from '../models/tblPropertyMaster-Update.model';
import { TblPropertyMaster } from '../models/tblPropertyMaster.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})

export class TblPropertyMasterService {

  constructor(private http: HttpClient) { }

  private nextSlNoSubject = new BehaviorSubject<number>(1);

  nextSlNo$ = this.nextSlNoSubject.asObservable();

  setNextSlNo(value: number): void {
    this.nextSlNoSubject.next(value);
  }

  getNextSlNo(): number {
    return this.nextSlNoSubject.value;
  }

  incrementNextSlNo(): void {
    this.nextSlNoSubject.next(this.nextSlNoSubject.value + 1);
  }

  //GET ALL
  getAllTblPropertyMasters(): Observable<TblPropertyMaster[]> {
    return this.http.get<TblPropertyMaster[]>(`${environment.apiBaseUrl}/api/TblPropertyMaster/GetAllTblPropertyMasters`);
  };

  //GET ACTIVE
  getActiveTblPropertyMasters(): Observable<TblPropertyMaster[]> {
    return this.http.get<TblPropertyMaster[]>(`${environment.apiBaseUrl}/api/TblPropertyMaster/GetActiveTblPropertyMasters`);
  };

  //GET ACTIVELEAN
  getActiveLeanTblPropertyMasters(): Observable<TblPropertyMaster[]> {
    return this.http.get<TblPropertyMaster[]>(`${environment.apiBaseUrl}/api/TblPropertyMaster/GetActiveLeanTblPropertyMasters`);
  };

  //POST
  addTblPropertyMaster(model: TblPropertyMasterAdd): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/TblPropertyMaster/CreateTblPropertyMaster`, model);
  };

  //GET
  getTblPropertyMasterById(id: number): Observable<TblPropertyMaster> {
    return this.http.get<TblPropertyMaster>(`${environment.apiBaseUrl}/api/TblPropertyMaster/GetTblPropertyMasterById/${id}`);
  };

  //UPDATE
  updateTblPropertyMaster(tblPropertyMasterupdate: TblPropertyMasterUpdate): Observable<TblPropertyMaster> {
    return this.http.patch<TblPropertyMaster>(`${environment.apiBaseUrl}/api/TblPropertyMaster/updateTblPropertyMaster`, tblPropertyMasterupdate);
  };

  //DELETE
  deleteTblPropertyMaster(tblPropertyMasterdelete: TblPropertyMasterUpdate): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/TblPropertyMaster/DeleteTblPropertyMaster`,
      {
        body: tblPropertyMasterdelete,
        observe: 'response'
      });
  };


}
