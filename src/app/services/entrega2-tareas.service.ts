import { Observable } from 'rxjs';
import { Entrega2Tareas } from './../interfaces/entrega2_tareas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Entrega2TareasService {
  URL = environment.URL_BASE + 'entregatareas';
  /*URL = 'https://api-rest-colegio.herokuapp.com/cursos'*/;
  constructor(private http: HttpClient) { }

  getEntrega2Tareas(): Observable<Entrega2Tareas[]> {
    return this.http.get<Entrega2Tareas[]>(this.URL);
  }

  getIdEntrega2Tareas(id: string): Observable<Entrega2Tareas[]> {
    return this.http.get<Entrega2Tareas[]>(this.URL + '/' + id);
  }
  getMateriaEntrega2Tareas(materia: string): Observable<Entrega2Tareas[]> {
    return this.http.get<Entrega2Tareas[]>(this.URL + '/materia/' + materia);
  }
  postEntrega2Tareas(entregaTareas: Entrega2Tareas) {
    return this.http.post(this.URL, entregaTareas).subscribe(
      res => console.log(res)
    )
  }

  deleteEntrega2Tareas(id: string) {
    return this.http.delete(this.URL + '/' + id)
  }

  putEntrega2Tareas(id: string, entregaTareas: Entrega2Tareas) {
    return this.http.put(this.URL + '/' + id, entregaTareas).subscribe(
      res => console.log(res)
    )
  }

}
