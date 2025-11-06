import {HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment.development';

export const httpOptions = {
  headers: new HttpHeaders(
    {'Content-Type': 'application/json; charchars=utf-8'},
  ),
}

export const apiProduct = environment.baseUrl + "/product" + "/api"
export const apiCategory = environment.baseUrl + "/product" + "/api" +"/cat"

