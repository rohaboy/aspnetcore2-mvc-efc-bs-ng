import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from "rxjs/operators";
//import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Product } from './product'; 

import { Order, OrderItem } from "./order";  //For Fewer Item one can import as this
//import * as OrderNS from "./order"; //For all Items from library one can specify * (All)

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {}

    public order: Order = new Order();

    public products: Product[] = [];

    loadProducts():Observable<boolean> {
       return this.http.get("/api/products")
            .pipe(
                map((data: any[])=> {
                    this.products = data;
                    return true;
                }));
    }

    public AddToOrder(product: Product) {
        
        let item: OrderItem = this.order.items.find(i => i.productId == product.id); // new OrderNS.OrderItem();

        if (item) {
            item.quantity++;
        }
        else {
            item = new OrderItem();
            item.productId = product.id;
            item.productArtist = product.artist;
            item.productArtId = product.artId;
            item.productCategory = product.category;
            item.productSize = product.size;
            item.productTitle = product.title;
            item.unitPrice = product.price;
            item.quantity = 1;
            this.order.items.push(item);
        }
    }
}