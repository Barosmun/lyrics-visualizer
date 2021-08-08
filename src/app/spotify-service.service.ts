import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getCurrentSong(accessToken: string): Observable<any> {
    var headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);
		var searchUrl = `https://api.spotify.com/v1/me/player/currently-playing?market=US`;
		return this.http.get(searchUrl, { headers: headers });
	}
}
