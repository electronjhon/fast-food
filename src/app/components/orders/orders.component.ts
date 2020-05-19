import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../shared/order.service'


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(public orderService: OrdersService) { }

  products = [
    {
      name: "Churrasco",
      price: 22000
    },
    {
      name: "Carne asada",
      price: 18000
    },
    {
      name: "Pechuga a la plancha",
      price: 18000
    },
    {
      name: "Hamburguesa",
      price: 12000
    },
    {
      name: "Pizza",
      price: 4500
    },
    {
      name: "Papa a la francesa",
      price: 3000
    },
    {
      name: "Malteada",
      price: 7000
    },
    {
      name: "Gaseosa",
      price: 2500
    },
    {
      name: "Postre",
      price: 4500
    },
  ]

  appName:string = 'Fast Food!'
  totalOrder = 0;
  tempOrder = [];

  ngOnInit(): void {
  }

  onAddProduct(product){
    console.log(product)
    this.totalOrder = (this.totalOrder + product.price);
    this.tempOrder.push(product.name);
  }

  removeItemTempOrder = (order) => {
    let index = this.tempOrder.indexOf(order);
    if (index > -1) this.tempOrder.splice(index, 1);
  }

  onSubmit(){
    this.orderService.myForm.value.order = this.tempOrder;
    let data = this.orderService.myForm.value;
    data.totalOrder = this.totalOrder;
    // Llamar al service
    this.orderService.createOrder(data);
    this.tempOrder= [];
    this.totalOrder= 0;
    this.orderService.myForm.reset();    
  }
}
