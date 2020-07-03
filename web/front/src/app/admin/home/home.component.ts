import { Component, OnInit, OnChanges } from '@angular/core';
import axios from 'axios';
import { FormArray,FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

/*   survey = {
    name:"My Quick Survey",
    questionnaires:[{
      question:"Ready for a quick survey?",
      multi:true,
      choices:[
        {text:"Yes"},
        {text:"No"}
      ]
    }]  
  } */

  survey: FormGroup;
  questionnaires : FormArray;

  results = {
    success:"",
    error:""
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.survey = this.fb.group({
      name:['My Quick Survey', Validators.required],
      questionnaires: this.fb.array([new FormGroup({
        question: new FormControl(['Ready for a quick survey?']),
        multi: new FormControl('true'),
        choices: this.fb.array([new FormGroup({
          text: new FormControl('Yes'),
          text1: new FormControl('No')
         })
        ])
      })])
    });

    this.questionnaires = this.survey.get('questionnaires') as FormArray;

    console.log(this.survey, 'hello')
  }

  ngOnChanges(){
      //this.survey.value;
      this.survey.controls['questionnaires'].valueChanges.subscribe(value => {
        console.log(value);
      });
  }

  create() {
    
    this.survey.value;
    console.log(this.survey.value); //return;

    const apiUrl = 'http://localhost:3000/api'

    axios({
        method: 'post',
        url: `${apiUrl}/survey/create`,
        data: this.survey.value 
    }).then((response)=> {
        if(response.status==201){
          this.results.success="Survey created successfully";
          //console.log('success create survey');
        }   
        else{
           this.results.error="Looks like server is not working";
           console.log('error create survey');
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
  
  addchoice(i) { console.log(i, 'id added')

    this.survey[i].choices.push({text:"New Choice"})
   
  }

  removechoice(index) {
    console.log(index, 'id deleted')
    this.questionnaires.removeAt(index);
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      question: ['Next question?', [Validators.required]],
      multi: [true, [Validators.required]],
      choices: this.fb.array([new FormGroup({
        text: new FormControl('Yes'),
        text1: new FormControl('No')
       })])
    });
    
  }

  addquestion() {
    
    this.questionnaires.push(this.createQuestion());
      console.log('survey',this.survey.controls);
      console.log('test', this.questionnaires)
  }

  onSubmit(form: FormGroup) {

  }

}
