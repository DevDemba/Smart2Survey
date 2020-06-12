import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { TokenPayload, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  myForm: FormGroup;

  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };
  

  constructor(private router: Router, private UserService: UserService , private _auth: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
    /*   password2: ['',Validators.required, [Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]], */
    })
  }

  /* register() {
    this.UserService.register(this.myForm.value).subscribe(
      
      res => console.log(res),
      err => console.log(err));

    this.router.navigate(['/connection']);  
  } */

  register() {
    this._auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('firstName', form.value.firstName);
    console.log('lastName', form.value.lastName);
    console.log('Email', form.value.email);    
    console.log('Password', form.value.password);
  }


}
