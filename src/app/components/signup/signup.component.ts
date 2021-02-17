import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm = new FormGroup({
    firstName : new FormControl('', Validators.required),
    lastName : new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    phoneNumber : new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  register() {
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.authService.createUser(
      this.registerForm.value.firstName,
      this.registerForm.value.lastName,
      this.registerForm.value.email,
      this.registerForm.value.phoneNumber,
      this.registerForm.value.password
    );
    // this.registerForm.reset();
  }
}
