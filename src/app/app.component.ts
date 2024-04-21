import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { TranslateService } from '@ngx-translate/core';
import $ from "jquery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(/*public translate: TranslateService*/) { }

  /*translateCopy: any = this.translate;*/

  searchValue: any = "";

  users: any[] =
    [
      { name: "Gadon", country: "Egypt", telephone: "01016824489" },
      { name: "Stylish", country: "Egypt", telephone: "01020386220" },
      { name: "Monzer", country: "Egypt", telephone: "01095611137" }
    ];

  usersSearch: any[] = [];

  isKeyUP: any = 0;

  productsCounter: any[] = [];

  products: any[] = [];

  stored_products: any = [];

  specified_user: any = {};

  searchForUser() {

    this.usersSearch = [];

    if (this.searchValue.length == 0) {
      this.isKeyUP = 1;
      return;
    }

    for (var i = 0; i < this.users.length; i++) {

      if (this.users[i].name.toLowerCase().includes(this.searchValue.toLowerCase()) || this.users[i].telephone.toLowerCase().includes(this.searchValue.toLowerCase())) {
        this.usersSearch.push(this.users[i]);
      }
    }

    this.isKeyUP = 1;

  }

  addNewProduct() {
    this.productsCounter.push(1);
  }

  addProducts() {

    localStorage.setItem("products", JSON.stringify(this.products));

    this.stored_products = JSON.parse(String(localStorage.getItem("products")));

    this.productsCounter = [];

    this.products = [];
  }

  chooseUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
    this.searchValue = "";
    this.usersSearch = [];
  }

  addDeal() {
    if (localStorage.getItem("user") != null && localStorage.getItem("products") != null) {
      var storedProducts = JSON.parse(String(localStorage.getItem("products")));
      var products = "";
      for (var i = 0; i < storedProducts.length; i++) {
        if (i < storedProducts.length - 1) {
          products += storedProducts[i] + ", ";
        }
        else {
          products += storedProducts[i];
        }
      }
      alert("user name: " + JSON.parse(String(localStorage.getItem("user"))).name + "\n products: " + products);

      localStorage.removeItem("user");
      localStorage.removeItem("products");
    }

    else {
      alert("you must select a user and add atleast one product");
    }

  }


  ngOnInit(): void {

    if (localStorage.getItem("products") == null) {
      this.stored_products = [];
    }

    else {
      this.stored_products = JSON.parse(String(localStorage.getItem("products")));
    }

    if (localStorage.getItem("user") == null) {
      this.specified_user = {};
    }
    else {
      this.specified_user = JSON.parse(String(localStorage.getItem("user")));
    }

    //throw new Error('Method not implemented.');
  }
  title = 'sortech-exam';
}
