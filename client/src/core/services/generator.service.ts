import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  baseURL: string = `${environment.api}/media/transcribe`;

  constructor(private http: HttpClient) { }

  generate(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.baseURL, formData);
  }

  // generateSubtitles(file: File): Promise<any> {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   return fetch(this.baseURL, {
  //     method: 'POST',
  //     body: formData
  //   }).then(response => response.json());
  // }
}
