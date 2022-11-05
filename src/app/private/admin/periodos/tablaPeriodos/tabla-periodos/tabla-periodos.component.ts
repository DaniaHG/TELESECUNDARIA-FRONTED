import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PeriodosService } from 'src/app/services/periodos.service';
import { Periodos } from 'src/app/interfaces/periodos';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-tabla-periodos',
  templateUrl: './tabla-periodos.component.html',
  styleUrls: ['./tabla-periodos.component.css']
})
export class TablaPeriodosComponent implements OnInit {

  ListarPeriodos!: Periodos[];

  cicloElegido!: string;

    ciclo: any[] = [
      '2022-1', '2022-2', '2022-3', '2022-4'
    ];

  constructor(private periodosService: PeriodosService, private router: Router, private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      ciclo: ['', Validators.required]
    })

  }
  form: FormGroup;



  ngOnInit(): void {
    this.listarPeriodos();
  }

  grabar_localstorage() {
    console.log(this.form.value.ciclo)
    let ciclo = this.form.value.ciclo
    this.cicloElegido = ciclo;
    localStorage.setItem("ciclo", ciclo);
    this.listarPeriodosCiclo();
    //this.router.navigate(["/mostrarPeriodos"]);
  }


  listarPeriodos() {
    this.periodosService.getPeriodos().subscribe(
      res => {
        this.ListarPeriodos = <any>res;
      },
      err => console.log(err)
    );
  }

  listarPeriodosCiclo() {
    this.periodosService.getCicloPeriodos(this.cicloElegido).subscribe(
      res => {
        this.ListarPeriodos = <any>res;
      },
      err => console.log(err)
    );
  }


  cicloCambio(ciclo: string) {
    this.cicloElegido = ciclo
    this.listarPeriodosCiclo();
  }

  eliminar(id: string) {
    this.periodosService.deletePeriodos(id).subscribe(
      res => {
        console.log('Eliminado');
        this.router.navigate(['/mostrarPeriodos']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eliminado con exito',
          showConfirmButton: false,
          timer: 1500
        })

      },
      err => console.log(err));
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops algo salio mal',
        showConfirmButton: false,
        timer: 1500
      })
    setTimeout(location.reload.bind(location), 500);
  }

  modificar(id: string) {
    this.router.navigate(['modificarPeriodos', id])
  }

  agregar() {
    this.router.navigate(["agregarPeriodos"])

  }
  actualizar() {
    setTimeout(location.reload.bind(location), 100);
  }


}
