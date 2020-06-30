import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import {TokenPayload, AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  myForm: FormGroup;
  returnUrl: string;
  credentials: TokenPayload = {
    email: '',
    password: ''
  };


  constructor(private _auth: AuthService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
    })
  }

   // convenience getter for easy access to form fields
   //get f() { return this.myForm.controls; }
  

  login() {
    this._auth.login(this.myForm.value).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

  onSubmit(form: FormGroup) {
  /*   console.log('Valid?', form.valid); // true or false
    console.log('Email', form.value.email);    
    console.log('Password', form.value.password); */
  }

}
