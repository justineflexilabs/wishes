import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { WishItem } from 'src/shared/models/wishItem';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishService {
  constructor(private http: HttpClient) {}

  private getStandardOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getWishes() {
    let options = this.getStandardOptions();
    options.params = new HttpParams({
      fromObject: {
        format: 'json',
      },
    });

    return this.http
      .get('assets/wishess.json', options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('Network Error:', error.error);
    } else {
      console.log('Service Error:', error.error);
    }

    return throwError(() => new Error('Cannot make request!'));
  }

  private addWish(wish: WishItem) {
    let options = this.getStandardOptions();
    options.headers = options.headers.set('Authorization', 'value');

    this.http.post('assets/wish.json', wish, options);
  }
}
