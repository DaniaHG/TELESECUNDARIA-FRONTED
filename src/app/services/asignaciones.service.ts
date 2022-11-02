import { Materias } from 'src/app/interfaces/materias';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsignacionesService {

  URL = environment.URL_BASE + 'materias_tareas';
   /*URL = 'https://api-rest-colegio.herokuapp.com/cursos'*/;
  constructor(private http: HttpClient) { }

  getMaterias(): Observable<Materias[]> {
    return this.http.get<Materias[]>(this.URL);
  }

  getIdMaterias(id: string): Observable<Materias[]> {
    return this.http.get<Materias[]>(this.URL + '/' + id);
  }
}
