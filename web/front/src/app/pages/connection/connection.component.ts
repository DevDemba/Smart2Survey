import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, TokenPayload } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';


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


  constructor(private _auth: AuthService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { 
  /*   // redirect to home if already logged in
    if (this._auth.currentUserValue) { 
      this.router.navigate(['/']);
    }
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'; */

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
    })
  }

   // convenience getter for easy access to form fields
   //get f() { return this.myForm.controls; }
  
  login1() {
/*     this._auth.login(this.myForm.value).subscribe(
      
      res => console.log(res),
      err => console.log(err)); */

    this._auth.login(this.myForm.value)
        .subscribe(
            res => console.log(res),
            err => console.log(err));
       
  }

  login() {

    this._auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Email', form.value.email);    
    console.log('Password', form.value.password);
  }

}
