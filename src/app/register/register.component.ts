import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {AddressDto, Role, UserDto} from '../model/user-models';
import {Router} from '@angular/router';


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
              private router: Router) { }

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
      console.log('error', errorMessage);
    });
}



}
