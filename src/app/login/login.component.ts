import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import {AutorisationService} from '../autorisation.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  userName = '';

  @Output() messageEvent = new  EventEmitter<string>();

  constructor(private authService: AutorisationService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.doAut(this.email, this.password).subscribe((data) => {
      localStorage.setItem('ROLE', data.authorities[0].authority);
      this.router.navigate(['/products']);
      this.userName = data.userName;
      this.sendUserName();
      console.log(data);
    }, errorMessage => {
      this.toastr.error('The credentials you entered ar not corect.');
      console.log(errorMessage);
    });
  }

  sendUserName(): void{
    this.messageEvent.emit(this.userName);
  }


}
