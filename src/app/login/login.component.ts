import { Component, OnInit } from '@angular/core';
import {AutorisationService} from '../autorisation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(private authService: AutorisationService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.doAut(this.email, this.password).subscribe((data) => {
      this.router.navigate(['/products']);
      console.log(data);
    }, errorMessage => {
      console.log(errorMessage);
    });
  }

}
