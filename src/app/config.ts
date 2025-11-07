import {HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment.development';

export const httpOptions = {
  headers: new HttpHeaders(
    {'Content-Type': 'application/json; charchars=utf-8'},
  ),
}

export const apiProduct = environment.baseUrl + "/api" + "/product"
export const apiCategory = environment.baseUrl + "/api" + "/cat"

