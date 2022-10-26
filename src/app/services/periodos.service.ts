import { Periodos } from '../interfaces/periodos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodosService {

  URL = environment.URL_BASE + 'periodos';
   /*URL = 'https://api-rest-colegio.herokuapp.com/cursos'*/;
  constructor(private http: HttpClient) { }

  getPeriodos(): Observable<Periodos[]> {
    return this.http.get<Periodos[]>(this.URL);
  }

  getIdPeriodos(id: string): Observable<Periodos[]> {
    return this.http.get<Periodos[]>(this.URL + '/' + id);
  }

  getCicloPeriodos(ciclo: string): Observable<Periodos[]> {
    return this.http.get<Periodos[]>(this.URL + '/ciclo/' + ciclo);
  }


  postPeriodos(periodos: Periodos) {
    return this.http.post(this.URL, periodos).subscribe(
      res => console.log(res)
    )
  }

  deletePeriodos(id: string) {
    return this.http.delete(this.URL + '/' + id)
  }

  putPeriodos(id: string, periodos: Periodos) {
    return this.http.put(this.URL + '/' + id, periodos).subscribe(
      res => console.log(res)
    )
  }
}
