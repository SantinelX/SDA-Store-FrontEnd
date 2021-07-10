import { Component, OnInit } from '@angular/core';
import {AddressDto, Role, UserDto} from '../model/user-models';
import {UserService} from '../user.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent implements OnInit {
  userId = 3;
  roles: Role[] = [];
  notificationOption: string[] = ['MAIL', 'EMAIL'];
  address: AddressDto = {} as AddressDto;
  user: UserDto = {
    addressDto: this.address
  } as UserDto;

  // private userSubscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }


}
