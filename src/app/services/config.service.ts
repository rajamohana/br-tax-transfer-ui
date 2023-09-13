import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor() {}

  globalApi: string = 'http://localhost:8080';
}
