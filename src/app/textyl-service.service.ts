import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextylService {

  constructor(private http: HttpClient) { }

  getLyrics(url: string): Observable<any> {
		return this.http.get(url);
	}
}
