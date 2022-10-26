import localeEs from '@angular/common/locales/es';
import { InterceptorService } from './services/interceptor.service';
import { AuthGuard } from './auth.guard';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AlumnosComponent } from './private/admin/alumnos/alumnos.component';
import { LisalumnoComponent } from './private/admin/alumnos/lisalumno/lisalumno.component';
import { AgregarDocentesComponent } from './private/admin/docentes/agregarDocentes/agregar-docentes/agregar-docentes.component';
import { TablaDocentesComponent } from './private/admin/docentes/tablaDocentes/tabla-docentes/tabla-docentes.component';
import { AgregarMateriasComponent } from './private/admin/materias/agregarMaterias/agregar-materias/agregar-materias.component';
import { TablaMateriasComponent } from './private/admin/materias/tablaMaterias/tabla-materias/tabla-materias.component';
import { AgregarMateriaAlumnoComponent } from './private/admin/materia_alumno/agregarMateriaAlumno/agregar-materia-alumno/agregar-materia-alumno.component';
import { TablaMateriaAlumnoComponent } from './private/admin/materia_alumno/tablaMateriaAlumno/tabla-materia-alumno/tabla-materia-alumno.component';
import { AgregarMateriaDocenteComponent } from './private/admin/materia_docente/agregarMateriaDocente/agregar-materia-docente/agregar-materia-docente.component';
import { TablaMateriaDocenteComponent } from './private/admin/materia_docente/tablaMateriaDocente/tabla-materia-docente/tabla-materia-docente.component';
import { AgregarPeriodosComponent } from './private/admin/periodos/agregarPeriodos/agregar-periodos/agregar-periodos.component';
import { TablaPeriodosComponent } from './private/admin/periodos/tablaPeriodos/tabla-periodos/tabla-periodos.component';
import { AgregarUsuariosComponent } from './private/admin/usuarios/agregarUsuarios/agregar-usuarios/agregar-usuarios.component';
import { TablaUsuariosComponent } from './private/admin/usuarios/tablaUsuarios/tabla-usuarios/tabla-usuarios.component';
import { AgregarEntregaTareasComponent } from './private/docente/entrega_tareas/agregarEntregaTareas/agregar-entrega-tareas/agregar-entrega-tareas.component';
import { TablaEntregaTareasComponent } from './private/docente/entrega_tareas/tablaEntregaTareas/tabla-entrega-tareas/tabla-entrega-tareas.component';
import { TablaReporteTareasComponent } from './private/docente/reportes/reporte_tareas/tablaReporteTareas/tabla-reporte-tareas/tabla-reporte-tareas.component';
import { AgregarTareasComponent } from './private/docente/tareas/agregarTareas/agregar-tareas/agregar-tareas.component';
import { TablaTareasComponent } from './private/docente/tareas/tabalaTareas/tabla-tareas/tabla-tareas.component';
import { LoginFormularioComponent } from './public/login-formulario/login-formulario.component';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs,'es');

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginFormularioComponent,
    TablaDocentesComponent,
    AgregarDocentesComponent,
    AgregarMateriasComponent,
    TablaMateriasComponent,
    AgregarPeriodosComponent,
    TablaPeriodosComponent,
    AlumnosComponent,
    LisalumnoComponent,
    AgregarMateriaDocenteComponent,
    TablaMateriaDocenteComponent,
    AgregarEntregaTareasComponent,
    TablaEntregaTareasComponent,
    AgregarMateriaAlumnoComponent,
    TablaMateriaAlumnoComponent,
    AgregarUsuariosComponent,
    TablaUsuariosComponent,
    TablaReporteTareasComponent,
    AgregarTareasComponent,
    TablaTareasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi:true
    },
    {
      provide:LOCALE_ID, useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
