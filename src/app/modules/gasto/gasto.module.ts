import { NgModule ,LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { GastoRoutingModule } from './gasto-routing.module';
import { GastoComponent } from './page/gasto.component';
import { FormComponent } from './components/form/form.component';
import { PageComponent } from './components/page1/page.component';
import localeEs from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiltraComponent } from './components/filtra/filtra.component';
// maneja fechas


registerLocaleData(localeEs,'es')//importar esto para cambiar el idioma a español
@NgModule({
  declarations: [
    GastoComponent,
    FormComponent,
    PageComponent,
    FiltraComponent
  ],
  imports: [
    CommonModule,
    GastoRoutingModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatFormFieldModule


  ],
providers:[{provide: LOCALE_ID, useValue: 'es'}]

})
export class GastoModule { }
