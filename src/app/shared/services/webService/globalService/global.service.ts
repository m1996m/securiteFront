import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private apiUrl = 'https://restcountries.com/v3.1/all';
  constructor(private http: HttpClient) {}

  generateUniqueSlug(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = '';
    const charactersLength = characters.length;
    const uniqueChars: Set<string> = new Set();

    while (result.length < 60) {
      const randomCharacter = characters.charAt(Math.floor(Math.random() * charactersLength));
      if (!uniqueChars.has(randomCharacter)) {
        uniqueChars.add(randomCharacter);
        result += randomCharacter;
      }
    }
    // Hash the result using SHA-256
    //const hashedResult = CryptoJS.SHA256(result).toString();

    return result;
  }

  generateNumeroUnique(): string {
    const characters = "0123456789";
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 11; i++) {
      const randomCharacter = characters.charAt(Math.floor(Math.random() * charactersLength));
      result += randomCharacter;
    }
    return result;
  }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
