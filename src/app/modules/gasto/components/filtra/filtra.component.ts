import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GastoService } from '@modules/gasto/services/gasto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filtra',
  templateUrl: './filtra.component.html',
  styleUrls: ['./filtra.component.css']
})
export class FiltraComponent implements OnInit {

  mes: number = 0;
  //year:number =0;
  datos:string[] =[]
  errores: string[] =[];
  valor2: any;
  selectedYear: number =0;
  anos:number[] =[];

  constructor(private gastoService: GastoService,private router: Router) {


  }

  ngOnInit(): void {

    this.datos =['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];


    this.filtro()


  }

  filtro(): void{
    try{
      const year = new Date().getFullYear();
      for (let year2 = 1990; year2 <= year; year2++){
        this.anos.push(year2)
        }

        if(this.selectedYear && this.mes){

          this.gastoService.getFiltro(this.mes,this.selectedYear).subscribe(
             (result) =>{
              this.router.navigate(['/gastos']);
              this.valor2 = result
              console.log('aca va el valor total')
              console.log(this.valor2)

              Swal.fire(
                'Búsqueda exitosa',
                ` El total del mes ingresado del año ${this.selectedYear} es:  ${this.valor2}`,
                'success'
              );
            },
            (err) =>{
                // error es el atributo del objeto error que contiene el json
           // y pásamos los errores en el parametro errors
           // como errors (ver backend) es any  se convierte a un arreglo de string
           // lo anterior es opcional es para que el codigo sea más estricto
           this.errores = err.error.errors as string[];
           console.error("Codigo del error desde el backend: " + err.status);
           console.error(err.error.errors);

           Swal.fire(
            'Ocurrio un error al insertar los datos',
            'no existe gasto para ese mes y año ingresado',
            'error'
           )
            },

          )
        }else{
          Swal.fire(
            'Ocurrio un error',
          ` Debe ingresar valores`,
          'warning'
          );
          console.log('error')
          if(this.selectedYear === 0 ){
            console.log('algo paso copn 0 No se puede ingersar un año cero')
            Swal.fire(
              'Año 0 o menor a 1900',
            ` El año no puede ser 0 y no se puede ingresar años menores a 1900`,
            'warning'
            );

          }
        }
    }catch (error2) {
      console.error('Error en la función de filtro:', error2);
      // Maneja el error apropiadamente, pero no afectes la variable 'anos'.
    }


  }

}
