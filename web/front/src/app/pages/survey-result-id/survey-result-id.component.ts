import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-survey-result-id',
  templateUrl: './survey-result-id.component.html',
  styleUrls: ['./survey-result-id.component.css']
})
export class SurveyResultIdComponent implements OnInit {

  id: string = "";
  surveyDetail = [];
  surveyAnswer: FormGroup;

  results = {
    success:"",
    error:""
  }

  constructor(private router:Router, public route: ActivatedRoute, private fb: FormBuilder) { 
    this.id = this.route.snapshot.paramMap.get('id'); //get id parameter
   
  }

  ngOnInit() {
   
    this.getSurveyDetail();
    this.surveyAnswer = this.fb.group({
      survey: ['name survey',Validators.required],
      question: ['question survey',Validators.required],
      choices:this.fb.array([new FormGroup({
        text: new FormControl('Yes')
      })]),
    })

    this.id;
    //console.log(this.id)
  }

  ngOnChanges(){
    
    this.surveyAnswer.controls['choices'].valueChanges.subscribe(value => {
      console.log(value);
    });

    this.surveyAnswer.value;
  }

  getSurveyDetail() {
    this.id;
    console.log(this.id)

    const apiUrl = 'http://localhost:3000/api';
  
      axios({
          method: 'get',
          url: `${apiUrl}/survey/list/`+ this.id,
          data: this.surveyDetail
      }).then((response) => {
        this.surveyDetail = response.data;
        console.log(this.surveyDetail)
      });
  }
  
  answer() {
    this.surveyAnswer.get('name').value;
    
    console.log('surveyAnswer',  this.surveyAnswer.get('name').value)

    const apiUrl = 'http://localhost:3000/api'

    axios({
        method: 'post',
        url: `${apiUrl}/survey/answer`,
        data: this.surveyAnswer.value
    }).then((response)=> {
        if(response.status==201){
          this.results.success="Survey's answer successfully";
          //console.log('success create survey');
        }   
        else{
           this.results.error="Looks like server is not working";
        } 
        console.log(response);
    }).catch((error)=>{
        if(error.response /*| (error.response.status==422)*/) {
            this.results.error=error.response.data.message;
        } else{
            this.results.error="Looks like server is not working";
            //console.log('Looks like server is not working')
          console.log(error.response);
        }
    });
  } 

  onSubmit(form:FormGroup){

  }

}
