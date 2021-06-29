import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';
import {AppConfig} from '../config/app-config';
import {Router} from '@angular/router';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() numberOfProductsInCart = 0;
  @Output() searchChangeEvent: EventEmitter<string> = new EventEmitter<string>();
  role = localStorage.getItem('ROLE');
  userName = 'Gigi';


  constructor(private shoppingCartService: ShoppingCartService, private router: Router, public oktaAuth: OktaAuthService) { }


   ngOnInit(): void {
    if (localStorage.getItem(AppConfig.AUTHORISATION_HEADER)) {
      this.shoppingCartService.getProductsFromcart().subscribe((data) => {
        this.numberOfProductsInCart = data.productsInCart.length;
      });
    }
  }

  searchProduct(event: any): void {
    const formvalue = event.target.value;
    this.searchChangeEvent.emit(formvalue);
  }

  goToShoppingCart(): void {
    this.router. navigate(['/shopping-cart']);
  }

  logOut(): void{
    localStorage.clear();
    this.ngOnInit();
    this.router.navigate(['/login']) ;
  }

  reciveUserName($event: any): void{
    this.userName = $event.target.value;
  }
}
