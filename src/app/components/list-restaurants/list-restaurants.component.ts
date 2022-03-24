import { Component, OnInit } from '@angular/core';
import { Toast, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { Restaurant } from 'src/app/models/restaurant';
import { User } from 'src/app/models/user';
import { RestaurantService } from 'src/app/service/restaurant.service';

@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.css']
})

export class ListRestaurantsComponent implements OnInit {
  listRestaurants: Restaurant[] = [];

  constructor(private _restaurantService: RestaurantService,
        private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this._restaurantService.getAllRestaurants().subscribe(data => {
      console.log(data);
      this.listRestaurants = data;
    }, error => {
      console.log(error);
    })
  }

  deleteRestaurant(name: string) {
    this._restaurantService.deleteRestaurant(name).subscribe(data => {
      this.toastr.error('The restaurant has been successfully deleted!', 'Restaurant deleted');
      this.getAllRestaurants();
    }, error => {
      console.log(error);
    })
  }
}
