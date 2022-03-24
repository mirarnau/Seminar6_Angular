import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url + '/restaurants');
  }

  deleteRestaurant(name: string): Observable<string> {
    return this.http.delete(this.url + '/restaurants/' + name, {responseType: 'text'})
  }

  addRestaurant(user: Restaurant): Observable<string> {
    return this.http.post(this.url + '/restaurants', user, {responseType: 'text'}) ;
  }

  getRestaurantByName(name: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.url + '/restaurants/' + name);
  }

  editRestaurant(name: string, restaurant: Restaurant): Observable<string> {
    return this.http.put(this.url + '/restaurants/' + name, restaurant, {responseType: 'text'});
  }
}
