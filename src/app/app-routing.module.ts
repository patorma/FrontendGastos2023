import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'gastos',
    loadChildren: () => import('@modules/gasto/gasto.module').then((m) =>m.GastoModule)
  },
  {
    path:'gastos/page/:page',
    loadChildren: () =>import('@modules/gasto/gasto.module').then((m) =>m.GastoModule)
  },
  {
    path:'gasto',
    loadChildren:() =>import('@modules/gasto/gasto.module').then((m) =>m.GastoModule)
  },
  {
    path:'gasto',
    loadChildren:() =>import('@modules/gasto/gasto.module').then((m) =>m.GastoModule)
  },
  {
    path:'busqueda',
    loadChildren:() =>import('@modules/gasto/gasto.module').then((m) =>m.GastoModule)
  },
  {
    path:'**',//TODO
    redirectTo:'/gastos'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
