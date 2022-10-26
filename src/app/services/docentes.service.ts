import { Docentes } from './../interfaces/docentes';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocentesService {

  URL = environment.URL_BASE + 'docentes';
   /*URL = 'https://api-rest-colegio.herokuapp.com/cursos'*/;
  constructor(private http: HttpClient) { }

  getDocentes(): Observable<Docentes[]> {
    return this.http.get<Docentes[]>(this.URL);
  }

  getIdDocentes(id: string): Observable<Docentes[]> {
    return this.http.get<Docentes[]>(this.URL + '/' + id);
  }

  postDocentes(docentes: Docentes) {
    return this.http.post(this.URL, docentes).subscribe(
      res => console.log(res)
    )
  }

  deleteDocentes(id: string) {
    return this.http.delete(this.URL + '/' + id)
  }

  putDocentes(id: string, docentes: Docentes) {
    return this.http.put(this.URL + '/' + id, docentes).subscribe(
      res => console.log(res)
    )
  }
}
