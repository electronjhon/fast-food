import { Component, OnInit, ViewChild } from '@angular/core';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'; 
import {OrdersService} from '../../../shared/order.service'
  import { from } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  constructor (private orderService: OrdersService) {}

  displayedColumns: string[] = ['orderNumber', 'customerName', 'order', 'completed', 'total', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    // Llamar el método gettAllOrders
    this.getAllOrders();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;    
  }

  getAllOrders() {
    this.orderService.getOrders().subscribe(res => {
      this.dataSource.data = res;
    })
  }

  onDelete(id: string){
    this.orderService.deleteOrder(id);
  }

  onChangeStatus(order: any) {
    order.completed = true;
    this.orderService.updateOrder(order)
  }
}
