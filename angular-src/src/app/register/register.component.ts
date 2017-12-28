import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  constructor(private validateService: ValidateService,
              private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }
  // tslint:disable-next-line:one-line
  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };
    // tslint:disable-next-line:one-line
    if (!this.validateService.validateRegister(user)){
        this._flashMessagesService.show('Please fill all the details!', { cssClass: 'alert-danger', timeout: 2000 });
      return false;
    }

    // Validate Email
    // tslint:disable-next-line:one-line
    if (!this.validateService.validateEmail(user.email)){
      this._flashMessagesService.show('Please fill in valid email!', { cssClass: 'alert-danger', timeout: 2000 });
      return false;
    }
  }
}
