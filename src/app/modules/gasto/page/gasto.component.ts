import { Component, OnInit } from '@angular/core';
import { GastoInterface } from '@core/models/gasto.interface';
import { GastoService } from '../services/gasto.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.css']
})
export class GastoComponent implements OnInit {

  title : string = 'Gastos'
  gastos: GastoInterface[] =[];
  paginador: any;
  valor: GastoInterface;
  cantidad: any;

  constructor(private gastoService: GastoService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

       // paramMap se encarga de observar entonces se subscribe
    // esto se encarga de subscribirse a un observador
    this.activatedRoute.paramMap.subscribe((params:any)=>{
      // el operador suma convierte el string en number
      let page: number = +params.get('page')

      if (!page) {
        page = 0;
      }
          // gastos es un observador va hacer observado por observadores, aca se subscribe ,
      // y en el metodo subscribe el observador seria asignar el atributo gastos el valor
      // que se recibe del gastoservice, que seria el listado de gastos con los cambios
      this.gastoService
        .getGastos(page)
        .subscribe((response) =>{
          this.gastos = response.content as GastoInterface[]
          this.paginador = response
        })
    }),
    this.gastoService.getTotalGastos().subscribe((result)=>{
      this.valor = result
    }),
    this.gastoService.getCantidad().subscribe((result) =>{
      this.cantidad = result
    })
  }

  public delete(gasto: GastoInterface): void{
    const swalWithBootstrapButtons =Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Está seguro?',
        text: `¿Seguro que desea eliminar el gasto ${gasto.tipoGasto.tipo}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) =>{
        if (result.value) {
          this.gastoService.delete(gasto.id).subscribe((response) =>{
            this.gastos = this.gastos.filter((ga) => ga!== gasto);
            this.router.navigate(['/gastos'])
            swalWithBootstrapButtons.fire(
              'Gasto eliminado!',
              `Gasto de tipo ${gasto.tipoGasto.tipo} eliminado con éxito.`,
              'success'
            )
          })
        }
      })
  }

}
