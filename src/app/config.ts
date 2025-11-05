import {HttpHeaders} from '@angular/common/http';

export const httpOptions = {
  headers: new HttpHeaders(
    {'Content-Type': 'application/json; charchars=utf-8'},
  ),
}

const baseUrl = "http://localhost:8080"

const productPath = "/product"
const productApiPath = "/api"

export const apiProduct = baseUrl + productPath + productApiPath

