import { Observable } from 'rxjs';
import { MateriaAlumno } from './../interfaces/materia-alumno';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriaAlumnoService {

  URL = environment.URL_BASE + 'materia_alumno';
   /*URL = 'https://api-rest-colegio.herokuapp.com/cursos'*/;
  constructor(private http: HttpClient) { }

  getMateriaAlumno(): Observable<MateriaAlumno[]> {
    return this.http.get<MateriaAlumno[]>(this.URL);
  }

  getIdMateriaAlumno(id: string): Observable<MateriaAlumno[]> {
    return this.http.get<MateriaAlumno[]>(this.URL + '/' + id);
  }

  postMateriaAlumno(materiaAlumno: MateriaAlumno) {
    return this.http.post(this.URL, materiaAlumno).subscribe(
      res => console.log(res)
    )
  }

  deleteMateriaAlumno(id: string) {
    return this.http.delete(this.URL + '/' + id)
  }

  putMateriaAlumno(id: string, materiaAlumno: MateriaAlumno) {
    return this.http.put(this.URL + '/' + id, materiaAlumno).subscribe(
      res => console.log(res)
    )
  }
}

