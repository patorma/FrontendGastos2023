import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GastoComponent } from './page/gasto.component';
import { PageComponent } from './components/page1/page.component';
import { FormComponent } from './components/form/form.component';
import { FiltraComponent } from './components/filtra/filtra.component';

const routes: Routes = [
  {
    path: '',
    component: GastoComponent
  },
  {
    path:'',
    component:PageComponent
  },
  {
    path:'newGasto',
    component:FormComponent
  },
  {
    path:'newGasto/:id',
    component: FormComponent
  },
  {
    path: 'fechaGasto',
    component: FiltraComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GastoRoutingModule { }
