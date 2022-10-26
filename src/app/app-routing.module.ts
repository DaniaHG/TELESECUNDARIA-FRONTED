import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgregarUsuariosComponent } from './private/admin/usuarios/agregarUsuarios/agregar-usuarios/agregar-usuarios.component';
import { TablaUsuariosComponent } from './private/admin/usuarios/tablaUsuarios/tabla-usuarios/tabla-usuarios.component';
import { AgregarMateriaAlumnoComponent } from './private/admin/materia_alumno/agregarMateriaAlumno/agregar-materia-alumno/agregar-materia-alumno.component';
import { TablaMateriaAlumnoComponent } from './private/admin/materia_alumno/tablaMateriaAlumno/tabla-materia-alumno/tabla-materia-alumno.component';
import { AgregarMateriaDocenteComponent } from './private/admin/materia_docente/agregarMateriaDocente/agregar-materia-docente/agregar-materia-docente.component';
import { TablaMateriaDocenteComponent } from './private/admin/materia_docente/tablaMateriaDocente/tabla-materia-docente/tabla-materia-docente.component';
import { AlumnosComponent } from './private/admin/alumnos/alumnos.component';
import { LisalumnoComponent } from './private/admin/alumnos/lisalumno/lisalumno.component';
import { AgregarPeriodosComponent } from './private/admin/periodos/agregarPeriodos/agregar-periodos/agregar-periodos.component';
import { TablaPeriodosComponent } from './private/admin/periodos/tablaPeriodos/tabla-periodos/tabla-periodos.component';
import { AgregarMateriasComponent } from './private/admin/materias/agregarMaterias/agregar-materias/agregar-materias.component';
import { TablaMateriasComponent } from './private/admin/materias/tablaMaterias/tabla-materias/tabla-materias.component';
import { AgregarDocentesComponent } from './private/admin/docentes/agregarDocentes/agregar-docentes/agregar-docentes.component';
import { TablaDocentesComponent } from './private/admin/docentes/tablaDocentes/tabla-docentes/tabla-docentes.component';

import { TablaReporteTareasComponent } from './private/docente/reportes/reporte_tareas/tablaReporteTareas/tabla-reporte-tareas/tabla-reporte-tareas.component';
import { TablaTareasComponent } from './private/docente/tareas/tabalaTareas/tabla-tareas/tabla-tareas.component';
import { AgregarTareasComponent } from './private/docente/tareas/agregarTareas/agregar-tareas/agregar-tareas.component';
import { AgregarEntregaTareasComponent } from './private/docente/entrega_tareas/agregarEntregaTareas/agregar-entrega-tareas/agregar-entrega-tareas.component';
import { TablaEntregaTareasComponent } from './private/docente/entrega_tareas/tablaEntregaTareas/tabla-entrega-tareas/tabla-entrega-tareas.component';


import { LoginFormularioComponent } from './public/login-formulario/login-formulario.component';
import { AuthGuard } from './auth.guard';
import { RoleIDAdminGuard } from './roleid.admin.guard';
import { RoleIDDocenteGuard } from './roleid.docente.guard';

const routes: Routes = [

  { path: '', component: LoginFormularioComponent },
  { path: 'login', component: LoginFormularioComponent },


  //ADMINISTRADOR
  //docentes
  { path: 'mostrarDocentes', component: TablaDocentesComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  { path: 'agregarDocentes', component: AgregarDocentesComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  { path: 'modificarDocentes/:id', component: AgregarDocentesComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  //materias
  { path: 'mostrarMaterias', component: TablaMateriasComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  { path: 'agregarMaterias', component: AgregarMateriasComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  { path: 'modificarMaterias/:id', component: AgregarMateriasComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  //periodos
  { path: 'mostrarPeriodos', component: TablaPeriodosComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  { path: 'agregarPeriodos', component: AgregarPeriodosComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  { path: 'modificarPeriodos/:id', component: AgregarPeriodosComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  //alumnos
  { path: 'AgregarAlumnos', component: LisalumnoComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  { path: 'mostrarAlumnos', component: AlumnosComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  { path: 'modificarAlumnos/:id', component: LisalumnoComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  //materias docentes
  { path: 'mostrarMateriasDocente', component: TablaMateriaDocenteComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  { path: 'agregarMateriasDocente', component: AgregarMateriaDocenteComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  { path: 'modificarMateriasDocente/:id', component: AgregarMateriaDocenteComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  //materias alumnos
  { path: 'mostrarMateriasAlumno', component: TablaMateriaAlumnoComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  { path: 'agregarMateriasAlumno', component: AgregarMateriaAlumnoComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  { path: 'modificarMateriasAlumno/:id', component: AgregarMateriaAlumnoComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  //usuarios
  { path: 'mostrarUsuarios', component: TablaUsuariosComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  { path: 'agregarUsuarios', component: AgregarUsuariosComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },
  { path: 'modificarUsuarios/:id', component: AgregarUsuariosComponent, canActivate: [RoleIDAdminGuard, AuthGuard] },

  //DOCENTE
  //reporte tareas
  { path: 'mostrarReporteTareas', component: TablaReporteTareasComponent, canActivate: [RoleIDDocenteGuard, AuthGuard] },
  //tareas
  { path: 'mostrarTareas', component: TablaTareasComponent, canActivate: [RoleIDDocenteGuard, AuthGuard] },
  { path: 'agregarTareas', component: AgregarTareasComponent, canActivate: [RoleIDDocenteGuard, AuthGuard] },
  { path: 'modificarTareas/:id', component: AgregarTareasComponent, canActivate: [RoleIDDocenteGuard, AuthGuard] },
  //EntregaTareas
  { path: 'mostrarEntregaTareas', component: TablaEntregaTareasComponent, canActivate: [RoleIDDocenteGuard, AuthGuard] },
  { path: 'agregarEntregaTareas', component: AgregarEntregaTareasComponent, canActivate: [RoleIDDocenteGuard, AuthGuard] },
  { path: 'modificarEntregaTareas/:id', component: AgregarEntregaTareasComponent, canActivate: [RoleIDDocenteGuard, AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
