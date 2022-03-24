export class Restaurant {
    _id?: number;
    owner: string;
    restaurantName: string;
    email: string;
    address: string;
    description: string;

    constructor(owner: string, restaurantName: string, email: string, address: string, description:string) {
        this.owner = owner;
        this.restaurantName = restaurantName;
        this.email = email;
        this.address = address;
        this.description = description;
    }   
}