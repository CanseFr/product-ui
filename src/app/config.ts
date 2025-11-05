import {HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment.development';

export const httpOptions = {
  headers: new HttpHeaders(
    {'Content-Type': 'application/json; charchars=utf-8'},
  ),
}

const productPath = "/product"
const productApiPath = "/api"

export const apiProduct = environment.baseUrl + productPath + productApiPath

