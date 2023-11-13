import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GastoInterface } from '@core/models/gasto.interface';
import { TipoGastoInterface } from '@core/models/tipo-gasto.interface';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  private urlEndPoint: string = 'http://localhost:8080/api/gastos';
  private urlEndpointOne: string ='http://localhost:8080/api/gasto'

  constructor(private http: HttpClient,
     private router: Router) { }

  getTipo(): Observable<TipoGastoInterface[]>{
    return this.http.get<TipoGastoInterface[]>(`${this.urlEndPoint}/tipoGastos`).pipe(

      catchError(e =>{
        return throwError(() =>e)
      })//aqui quede
    )
  }

  getTotalGastos(): Observable<any>{
    return this.http
          .get<any>(`${this.urlEndPoint}/valor`)
          .pipe((result) =>result)
  }

  getCantidad(): Observable<number>{
      return this.http
        .get<number>(`${this.urlEndPoint}/cantidad`)
        .pipe((result) => result);
  }

  getFiltro(mes:number,year: number): Observable<any>{
    if(isNaN(mes) || isNaN(year)){
      Swal.fire('Error','Ingresar datos','warning')
    }


    return this.http
      .get<number>(`${this.urlEndPoint}/filtrarValor/${mes}/${year}`)
      .pipe(
        (result) =>result,
        catchError((e)=>{
             // el estado 400 viene de la validacion, un bad request
             if (e.status === 400) {
              return throwError(() =>e);
            }
            if(e.error.mensaje){
              console.error(e.error.mensaje);
              }
            return throwError(() =>e);
        })
      )
  }

  getGastos(page: number): Observable<any> {
    /*se hace un cast porque devuelve un observable de gasto*/
    return this.http.get(`${this.urlEndPoint}/page/${page}`).pipe(

      // se transforma a gastos
      map((response: any) => {
        // se usa el metodo map del arreglo gastos
        // se modifica los valores internos o cada item del array
        (response.content as GastoInterface[]).map(({description,tipoGasto}) => {
          //pasa a mayuscula el nombre del gasto
          description = description.toUpperCase();
         tipoGasto.tipo = tipoGasto.tipo.toUpperCase();
          console.log(description )
          console.log(tipoGasto.tipo )
          // se retorna el gasto modificado
          return [description,tipoGasto];
        });
        return response;
      })
    );
  }

  create(gasto: GastoInterface):Observable<GastoInterface>{
    return this.http
      .post(this.urlEndpointOne,gasto)
      .pipe(
        map((response: any) => response.gasto as GastoInterface),
        catchError((e) =>{
             // el estado 400 viene de la validacion, un bad request
             if (e.status === 400) {

              return throwError(() =>e);
            }
            if(e.error.mensaje){
              console.error(e.error.mensaje);
              }
              return throwError(() =>e);
        })
      )
  }

  getGastoById(id: number): Observable<GastoInterface>{
     return this.http
       .get<GastoInterface>(`${this.urlEndpointOne}/${id}`)
       .pipe(
        catchError((e) =>{
          if(e.status != 401 && e.error.mensaje){
             /*capturamos el error y redirigimos a gastos*/
             this.router.navigate(['/gastos'])
             console.error(e.error.mensaje);
          }
          return throwError(()=>e);
        })
       )
  }

  update(gasto: GastoInterface): Observable<any>{
    return this.http
      .put<any>(`${this.urlEndpointOne}/${gasto.id}`,gasto)
      .pipe(
        catchError((e)=>{
          if (e.status === 400) {
            return throwError(() =>e);
          }
          if(e.error.mensaje){
            console.error(e.error.mensaje);
            }
            return throwError(()=>e);
        })
      )
  }

  delete(id: number): Observable<GastoInterface>{
    return this.http
      .delete<GastoInterface>(`${this.urlEndpointOne}/${id}`)
      .pipe(
        catchError((e)=>{
          if(e.error.mensaje){
            console.error(e.error.mensaje);
            }
          return throwError(()=>e);
        })
      )
  }

}
