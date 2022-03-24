import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from 'src/app/models/restaurant';

import { User } from 'src/app/models/user';
import { RestaurantService } from 'src/app/service/restaurant.service';

@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.css']
})
export class CreateRestaurantComponent implements OnInit {
  restaurantForm: FormGroup;
  title = "Create Restaurant";
  name: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private toastr: ToastrService,
              private _restaurantService: RestaurantService,
              private aRouter: ActivatedRoute) { 
      this.restaurantForm = this.fb.group({
        owner: ['', Validators.required],
        restaurantName: ['', Validators.required],
        email: ['', Validators.required],
        address: ['', Validators.required],
        description: ['', Validators.required]
      });

      this.name = this.aRouter.snapshot.paramMap.get('restaurantName');
      console.log(this.name);
  }

  ngOnInit(): void {
    
  }

  addRestaurant() {
    const restaurant: Restaurant = {
      owner: this.restaurantForm.get('owner')?.value,
      restaurantName: this.restaurantForm.get('restaurantName')?.value,
      email: this.restaurantForm.get('email')?.value,
      address: this.restaurantForm.get('address')?.value,
      description: this.restaurantForm.get('description')?.value,
    }

    if(this.name !== null){
      // Edit restaurant
      this._restaurantService.editRestaurant(this.name, restaurant).subscribe(data => {
        this.toastr.info('The restaurant has been successfully updated!', 'Restaurant updated');
        this.router.navigate(['/restaurants']);
      }, error => {
        console.log(error);
        this.restaurantForm.reset();
      })
    }
    else {
      // Add restaurant
      console.log(restaurant);
      this._restaurantService.addRestaurant(restaurant).subscribe(data => {
        this.toastr.success('The restaurant has been successfully created!', 'Restaurant created');
        this.router.navigate(['/restaurants']);
      }, error => {
        console.log(error);
        this.restaurantForm.reset();
      })
    }
  }

  editRestaurant() {
    if(this.name !== null) {
      this.title = 'Edit restaurant';
      this._restaurantService.getRestaurantByName(this.name).subscribe(data => {
        this.restaurantForm.setValue({
          owner: data.owner,
          restaurantName: data.restaurantName,
          email: data.email,
          address: data.address,
          description: data.description
        })
      })
    }
  }

}
