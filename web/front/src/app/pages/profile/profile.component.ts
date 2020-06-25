import { Component, OnInit } from '@angular/core';
import { AuthService, UserDetails } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  details: UserDetails;

  constructor(private _auth:AuthService) { }

  ngOnInit() {
    this._auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  
  }

}
