import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Activity, ActivityAdapter } from '../models/activity.model';
import { ActivityForm, ActivityFormAdapter } from '../models/activityForm.model';


@Injectable({
  providedIn: 'root'
})
export class AcitivityService {

  private readonly serviceUrl = 'activity'
  private _isRegistered: boolean = false
  private _formId: number | null | undefined
  
  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private actAdapter: ActivityAdapter,
    private formAdapter: ActivityFormAdapter
  ) { }

  getActivities(): Observable<Activity[]> {
    
    return this.http.get<Activity[]>(this.serviceUrl + '/typeList', this.options)
      .pipe(
        map((data: any[]) => {
          return data.map(e=> this.actAdapter.adapt(e))
        }),
        catchError(this.handleError<Activity[]>("getActivities", []))
        
      )
  }

  signup(form: ActivityForm): Observable<ActivityForm> {
    return this.http.post<ActivityForm>(this.serviceUrl, form, this.options)
      .pipe(
        map((data: any) => {
          this._formId = this.formAdapter.adapt(data).formId
          return this.formAdapter.adapt(data)
        }),
    )
  }

  setRegistered(isRegistered: boolean = false): void{
    this._isRegistered = isRegistered;
  }

  isRegistered(): boolean {
    return this._isRegistered;
  } 

  getFormId(): number | null | undefined{
    return this._formId
  }

  getAll(): Observable<ActivityForm[]> {

    const url = `${this.serviceUrl}/list`
    return this.http.get<ActivityForm[]>(url, this.options)
      .pipe(
        map((data: any[]) => data.map(form=> this.formAdapter.adapt(form))),
        catchError(this.handleError<ActivityForm[]>("getAll", []))
    )
  }

  deleteParticipant(formId: number): Observable<number> {

    return this.http.delete<number>(this.serviceUrl, { ...this.options, params: { formId: formId } })
      .pipe(
        map((data: any) => data),
        catchError(this.handleError<number>("deleteParticipant",0))

    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error.message, error.error); 
      return of(result as T);
    };
  }

}
