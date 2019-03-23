import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Order } from "./order"; //For Fewer Item one can import as this
//import * as OrderNS from "./order"; //For all Items from library one can specify * (All)
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        this.order = new Order();
        this.products = [];
    }
    DataService.prototype.loadProducts = function () {
        var _this = this;
        return this.http.get("/api/products")
            .pipe(map(function (data) {
            _this.products = data;
            return true;
        }));
    };
    DataService.prototype.AddToOrder = function (product) {
        var item = this.order.items.find(function (i) { return i.productId == product.id; }); // new OrderNS.OrderItem();
        if (item) {
            item.quantity++;
        }
        else {
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
    };
    DataService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], DataService);
    return DataService;
}());
export { DataService };
//# sourceMappingURL=dataService.js.map