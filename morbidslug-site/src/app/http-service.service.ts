import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { State } from './state';
import { StateStoreService } from './state-store.service';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private stateUrl: string = 'api/state';

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  getState(): Observable<State> {
    this.log('StateService: ')
    return this
              .http
              .get<State>(this.stateUrl)
              .pipe(
                tap(_ => this.log('fetched states')),
                catchError(this.handleError<State>('getState'))
              );
  }

  getStateNo404<Data>(id: number): Observable<State> {
    return this
              .http
              .get<State>(this.stateUrl)
              .pipe(
                map(states => states[0]), // returns a {0|1} element array
                tap(h => { this.log('Could not get state.'); }),
                catchError(this.handleError<State>(`getState`))
              );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string): void {
    this.messageService.add(`StateService: ${message}`);
  }
}
