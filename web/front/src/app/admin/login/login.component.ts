import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  returnUrl: string;

  constructor(private _auth: AuthService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
    })
  }


  login() {
    this._auth.login(this.myForm.value).subscribe(() => {
      this.router.navigateByUrl('/admin/login');
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
