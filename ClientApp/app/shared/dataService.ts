import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from "rxjs/operators";
//import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Product } from './product'; 

import { Order, OrderItem } from "./order";  //For Fewer Item one can import as this
import { resetCompiledComponents } from '@angular/core/src/render3/jit/module';
//import * as OrderNS from "./order"; //For all Items from library one can specify * (All)

@Injectable()
export class DataService {

    constructor(private http: HttpClient) { }

    private token: string = "";
    private tokenExpiration: Date;


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

    public get loginRequired(): boolean {
        return this.token.length == 0 || this.tokenExpiration > new Date();
    }

    public login(creds): Observable<boolean> {
        return this.http
            .post("/account/createtoken", creds)
            .pipe(
                 map((data:any) => {
                        this.token = data.token;
                        this.tokenExpiration = data.expiration;
                        return true;
            }));
    }

    public checkout() {
        if (!this.order.orderNumber) {
            this.order.orderNumber = this.order.orderDate.getFullYear().toString() + this.order.orderDate.getTime().toString();
        }
        return this.http.post("/api/orders", this.order, {
            headers:new HttpHeaders().set("Authorization","Bearer " + this.token)
        }).pipe(
            map(response => {
                this.order = new Order();
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