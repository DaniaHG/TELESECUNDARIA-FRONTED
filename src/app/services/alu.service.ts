import { Alumnos } from './../interfaces/alumnos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AluService {
  URL = environment.URL_BASE + 'alumnos';
  /*URL = 'https://api-rest-colegio.herokuapp.com/cursos'*/;
  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<Alumnos[]> {
    return this.http.get<Alumnos[]>(this.URL);
  }

  getIdAlumnos(id: string): Observable<Alumnos[]> {
    return this.http.get<Alumnos[]>(this.URL + '/' + id);
  }

  postAlumnos(materias: Alumnos) {
    return this.http.post(this.URL, materias).subscribe(
      res => console.log(res)
    )
  }

  deleteAlumnos(id: string) {
    return this.http.delete(this.URL + '/' + id)
  }

  putAlumnos(id: string, materias: Alumnos) {
    return this.http.put(this.URL + '/' + id, materias).subscribe(
      res => console.log(res)
    )
  }
}
