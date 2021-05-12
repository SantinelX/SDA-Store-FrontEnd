import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {AddressDto, Role, UserDto} from '../model/user-models';
import {Router} from '@angular/router';
import {ToastrModule, ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  roles: Role[] = [];
  notificationOption: string[] = ['MAIL', 'EMAIL'];
  address: AddressDto = {} as AddressDto;
  user: UserDto = {
    address: this.address
  } as UserDto;

  constructor(private userService: UserService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userService.getRoles().subscribe((data: Role[]) => {
      this.roles = data;
    }, errorMessage => {
    console.log(errorMessage);
    });
  }

register(): void {
    this.userService.register(this.user).subscribe((data: UserDto) => {
      this.router.navigate(['/login']);
      console.log('Success', data);
    }, errorMessage => {
      this.toastr.error('User already exists');
      console.log('error', errorMessage);
    });
}



}
