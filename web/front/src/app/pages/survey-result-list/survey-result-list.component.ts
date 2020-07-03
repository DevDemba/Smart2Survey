import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-result-list',
  templateUrl: './survey-result-list.component.html',
  styleUrls: ['./survey-result-list.component.css']
})
export class SurveyResultListComponent implements OnInit {

  surveyList = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.getSurveyList();
  }

  getSurveyList(){

  const apiUrl = 'http://localhost:3000/api';

    axios({
        method: 'get',
        url: `${apiUrl}/survey/list`,
        data: this.surveyList
    }).then((response) => {
      this.surveyList = response.data;
      console.log(response)
    });
  }


}
