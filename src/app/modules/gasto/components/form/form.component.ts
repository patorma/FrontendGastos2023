import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GastoInterface } from '@core/models/gasto.interface';
import { TipoGastoInterface } from '@core/models/tipo-gasto.interface';
import { GastoService } from '@modules/gasto/services/gasto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public gasto: GastoInterface = new GastoInterface();
  public titulo: string = "Crear gasto";
  public errores: string[] =[]
  tipos: TipoGastoInterface[] =[]

  constructor(private gastoService: GastoService,private router: Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarGasto()
  }
  cargarGasto(): void {
     /*Recibe como argumento los parametros en subscribe */
      /*en subscribe se ejecuta mostrar gatos de gastos */
      this.activatedRoute.params.subscribe((params) =>{
        let id =params['id']
        if(id){
          this.gastoService
            .getGastoById(id)
            .subscribe((gasto) => (this.gasto =gasto))
        }
      });
      this.gastoService
        .getTipo()
        .subscribe((tipos) =>(this.tipos = tipos))
  }

  create(): void{
    if(this.gasto.price){
      console.log(this.gasto)

      this.gastoService.create(this.gasto).subscribe(
        (gasto) =>{
          this.router.navigate(['/gastos'])
          Swal.fire(  //response.mensaje}
            'Nuevo Gasto',
            `El gasto de tipo ${gasto.tipoGasto.tipo} ha sido creado con éxito!`,
             'success')
        },
      (err:any) =>{
               // error es el atributo del objeto error que contiene el json
        // y pásamos los errores en el parametro errors
        // como errors (ver backend) es any se convierte a un arreglo de string
        // lo anterior es opcional es para que el codigo sea más estricto
        // con as se lo asignamos a un arreglo de string
        this.errores = err.error.errors as string[]
        console.error("Codigo del error desde el backend: " + err.status);
        console.error(err.error.errors);
        Swal.fire(
          'Error',
          'Ocurrio un error al ingreso del gasto',
          'error'
        )
      }
      )
    }else{
      Swal.fire(
        'error',
        ` Debe ingresar datos y solo valores númericos en valor`,
        'warning'
      )
    }
  }

  update():void {
    console.log(this.gasto);
    this.gastoService.update(this.gasto).subscribe(
      (response) =>{
        this.router.navigate(['/gastos']);
        Swal.fire(
          'Gasto actualizado',
          `${response.mensaje}: era del tipo ${response.gasto.tipoGasto.tipo}`,
          'success'
        )
      },
      (err) =>{
        // error es el atributo del objeto error que contiene el json
       // y pásamos los errores en el parametro errors
       // como errors (ver backend) es any  se convierte a un arreglo de string
       // lo anterior es opcional es para que el codigo sea más estricto
       this.errores = err.error.errors as string[];
       console.error("Codigo del error desde el backend: " + err.status);
       console.error(err.error.errors);
     }
    )
  }


      // el primer objeto corresponde a cada una de los tipos del ng
  // el segundo objeto es el objeto asignado al gasto y ahi hay que comparar
  compararTipo(o1: TipoGastoInterface,o2: TipoGastoInterface): boolean{
    // se compara el objeto 1 y el objeto 2
    // si es undefined se deja marcado el seleccionar con un mensaje
    if (o1  ===  undefined &&  o2  ===  undefined ){
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
    ? false
    : o1.id === o2.id;
  }
}
