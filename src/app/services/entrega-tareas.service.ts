import { Observable } from 'rxjs';
import { EntregaTareas } from './../interfaces/entrega_tareas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntregaTareasService {

  URL = environment.URL_BASE + 'entrega_tareas';
  /*URL = 'https://api-rest-colegio.herokuapp.com/cursos'*/;
  constructor(private http: HttpClient) { }

  getEntregaTareas(): Observable<EntregaTareas[]> {
    return this.http.get<EntregaTareas[]>(this.URL);
  }

  getIdEntregaTareas(id: string): Observable<EntregaTareas[]> {
    return this.http.get<EntregaTareas[]>(this.URL + '/' + id);
  }

  postEntregaTareas(entregaTareas: EntregaTareas) {
    return this.http.post(this.URL, entregaTareas).subscribe(
      res => console.log(res)
    )
  }

  deleteEntregaTareas(id: string) {
    return this.http.delete(this.URL + '/' + id)
  }

  putEntregaTareas(id: string, entregaTareas: EntregaTareas) {
    return this.http.put(this.URL + '/' + id, entregaTareas).subscribe(
      res => console.log(res)
    )
  }

}
