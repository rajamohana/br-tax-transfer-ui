import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})

export class ClientDataService {


  constructor(private http: HttpClient) { }
  
  getCustomerCodes() {
    return this.http.get('/api/listAllCustomerCodes');
  }
  getlistAllTaxOpenTasks(clientCode: string){
    return this.http.get('/api/viewAllTaxOpenTasks/'+ clientCode);
  }
  getlistAllTaxClosedTasks(status: string, clientCode: string){
    return this.http.get('/api/viewAllTaxClosedTasks/' + status + '/' + clientCode);
  }
  getTaxClaimedTaskRelease(requestBody: any) {
    return this.http.post('/api/taxClaimedTaskRelease', requestBody);
  }

  
}
