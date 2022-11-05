import { Injectable } from '@angular/core';
import { Tareas } from './../interfaces/tareas';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TareasService {
  URL = environment.URL_BASE + 'tareas';
  /*URL = 'https://api-rest-colegio.herokuapp.com/cursos'*/;
  constructor(private http: HttpClient) { }

  getTareas(): Observable<Tareas[]> {
    return this.http.get<Tareas[]>(this.URL);
  }

  getIdTareas(id: string): Observable<Tareas[]> {
    return this.http.get<Tareas[]>(this.URL + '/' + id);
  }

  postTareas(tareas: Tareas) {
    return this.http.post(this.URL, tareas).subscribe(
      res => console.log(res)
    )
  }

  deleteTareas(id: string) {
    return this.http.delete(this.URL + '/' + id)
  }

  putTareas(id: string, tareas: Tareas) {
    return this.http.put(this.URL + '/' + id, tareas).subscribe(
      res => console.log(res)
    )
  }
}
