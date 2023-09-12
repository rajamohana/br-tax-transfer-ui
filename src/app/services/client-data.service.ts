import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class ClientDataService {
  constructor(private http: HttpClient, private configService:ConfigService) {}

  getCustomerCodes() {
    return this.http.get(`${this.configService.globalApi}/api/listAllCustomerCodes`);
  }
  getlistAllTaxOpenTasks(clientCode: string) {
    return this.http.get(`${this.configService.globalApi}/api/viewAllTaxOpenTasks/${clientCode}`);
  }
  getlistAllTaxClosedTasks(status: string, clientCode: string) {
    return this.http.get(`${this.configService.globalApi}/api/viewAllTaxClosedTasks/${status}/${clientCode}`);
  }
  getTaxClaimedTaskRelease(requestBody: any) {
    return this.http.post(`${this.configService.globalApi}/api/taxClaimedTaskRelease`, requestBody);
  }
}
