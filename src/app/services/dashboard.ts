import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veiculo, VinInfos } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class DashboardS {
  http = inject(HttpClient)

  getVeiculos(): Observable<Veiculo[]>{
    return this.http.get<Veiculo[]>("https://api-projeto-final-2-0.onrender.com/vehicles")

  }

  getVinInfos(vin: string){
    return this.http.post<VinInfos>("https://api-projeto-final-2-0.onrender.com/vehicleData", {vin})
  }
}
