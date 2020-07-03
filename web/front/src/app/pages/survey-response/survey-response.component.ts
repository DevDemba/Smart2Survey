import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html',
  styleUrls: ['./survey-response.component.css']
})
export class SurveyResponseComponent implements OnInit {

  id: string = "";
  question: string = "";
  resultServey = [];

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id'); //get id parameter
    this.getResult();
  }
  

  getResult() {
    const apiUrl = 'http://localhost:3000/api';
  
    axios({
        method: 'get',
        url: `${apiUrl}/survey/results`,
        data: this.resultServey
    }).then((response) => {
      this.resultServey = response.data;
      console.log(this.resultServey)
    });
  }

}
