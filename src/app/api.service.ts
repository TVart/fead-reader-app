import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {environment} from "../environments/environment";

export class Feed {
  id: number;
  title: string;
  description: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url = environment.base_url

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) {}

  getFeeds(source:string): Observable<Feed[]> {
    return this.httpClient.get<Feed[]>(this.base_url+'?source='+source)
      .pipe(
        tap(users => console.log('feeds retrieved')),
        catchError(this.handleError<Feed[]>('Get feeds', []))
      );
  }

  getFeed(source, id): Observable<Feed> {
    return this.httpClient.get<Feed>(this.base_url + '/' + id + '?source='+source)
      .pipe(
        tap(_ => console.log(`feed fetched: ${id}`)),
        catchError(this.handleError<Feed>(`Get feed id=${id}`))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
