import { Component, OnInit, Pipe } from '@angular/core';

import { QuestionService } from '../../Services/question.service';

import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-question',
  templateUrl: 'app/Components/question/question.component.html',
  styleUrls: ['app/Components/question/question.component.css']
})
export class QuestionComponent implements OnInit {
  public myForm: FormGroup; // our form model

  constructor( private _questionService: QuestionService, private _fb: FormBuilder ) { }
  questions = [];
  globalQuestions = [];
  savedResponse = {};


  private _prevSelected: any;

    collapsed = false;
    toggleCollapse(evt){

      this.collapsed = !this.collapsed;
    }

    toGroup(){
        let group:any = {};
        this.questions.forEach((question) => {
          if ( question['q_id'] in this.savedResponse ) {
            if (question.required) {
              group[question.q_id] = new FormControl(this.savedResponse[question['q_id']], Validators.required);
            }else{
              group[question.q_id] = new FormControl(this.savedResponse[question['q_id']]);
            }
          }else{
            if(question.required){
                group[question.q_id] = new FormControl('', Validators.required);
            }
            else{
                group[question.q_id] = new FormControl('');
            }
          }
        });
        return new FormGroup(group);;
    }

    getQuestionByProperty(propertyObj){
      for( let i=0; i<this.questions.length; i++){
        if ( propertyObj.key in this.questions[i]) {
          if (this.questions[i][propertyObj.key] == propertyObj.value) {
            return this.questions[i];
          };
        };
      }
       return null;
    }
    getAnswerByproperty(questionObj, propertyObj){
      for(let i=0;i<questionObj['q_options'].length; i++){
        if ( questionObj['q_options'][i][propertyObj.key] == propertyObj.value) {
          return questionObj['q_options'][i];
        };
      }
      return null;
    }
   
    createForm(){
      this.myForm = this.toGroup();
      this.onFormChanges();
    }

    onFormChanges(): void {
      this.myForm.valueChanges.subscribe(data => {
        this.reloadForm();
      });
    };

    reloadForm() : void{
      this.savedResponse = this.myForm.value;
      //console.log('this.myForm.value : ',this.myForm.value); 
      let programs = [];
      for( let k in this.myForm.value ){
        let responseid = this.myForm.value[k];
        let questionid = k;
        if (responseid && Number(responseid) >=0 ) {
          let question = this.getQuestionByProperty({
            'key':'q_id',
            'value':questionid
          });
         let option = this.getAnswerByproperty(question,{
            'key':'opt_value',
            "value": responseid
          });
          if (option) {
            if ( 'program' in option) {
              if (option.program instanceof Array) {
                programs = programs.concat(option.program);
              };
            };
          };          
        };
      }
      if (programs.length > 0) {
        this._questionService.getQuestionsMultipleProgramIds(programs).subscribe(questions => {
            this.questions = this.globalQuestions.concat(questions);

            this.questions = this.questions.sort(function(a, b) {
                return parseInt(a.rank) - parseInt(b.rank);
            });
            this.createForm();
            //console.log('this.savedResponse : ',this.savedResponse);
        });
      };
      console.log('this.myForm.value : ',this.myForm.value);
    }


    save( formData ) {
        // call API to save customer
        console.log(formData);
    }

    

  ngOnInit() {
    this._questionService.getQuestionByScope('global')
    .subscribe(resQuestionData => {
      this.globalQuestions = resQuestionData;
      this.questions = this.globalQuestions;

      this.createForm();
      
    });
  }

}
