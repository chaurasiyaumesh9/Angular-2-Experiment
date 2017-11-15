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
  collapsed = false;
  showContinue = false;
  formLocked = false;

    isFieldValid(field: string) {
      return  this.myForm.get(field).hasError('required') && this.myForm.get(field).touched;
    }

    toggleContinue(){
      let formData = this.myForm.value;

      let len = Object.keys(formData).length;
      let count = 0;
      for( let k in formData){
        if (!formData[k] || formData[k] == "" ) {
          count++;
        };
      }
      if (count == len ) {
        this.showContinue = false;
      }else{
        this.showContinue =  true;
      };
      //console.log('formData : ',len);
    }
    toggleCollapse(evt){
      this.collapsed = !this.collapsed;
    }

    validateAllFormFields(formGroup: FormGroup) {  
      Object.keys(formGroup.controls).forEach(field => {  
        const control = formGroup.get(field);             
        if (control instanceof FormControl) {            
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {       
          this.validateAllFormFields(control);           
        }
      });
    }

    createControls(){
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
      if ('q_options' in questionObj) {
        for(let i=0;i<questionObj['q_options'].length; i++){
          if ( questionObj['q_options'][i][propertyObj.key] == propertyObj.value) {
            return questionObj['q_options'][i];
          };
        }
      };
      
      return null;
    }
   
    createForm(){
      this.myForm = this.createControls();
      this.onFormChanges();
    }

    getProgramByAnswer(qid,ansid){
      if (Number(ansid) >= 0 ) {
        let question = this.getQuestionByProperty({
          'key':'q_id',
          'value':qid
        });
        let option = this.getAnswerByproperty(question,{
          'key':'opt_value',
          "value": ansid
        });
        if (option) {
          if ( 'program' in option) {
            if (option.program instanceof Array) {
              return option.program[0];
            };
          };
        }; 
      };
      
      return null;
    }

    getQuestionIds(){
      return this.questions.map(function(question){
        return question['q_id'];
      });
    }
    questionHandler( qid, ansid ){
      let programid = this.getProgramByAnswer(qid, ansid);
      if (programid) {
        this._questionService.getQuestionsByProgramId(programid).subscribe(questions => {
            this.savedResponse = this.myForm.value;
            this.questions = this.globalQuestions.concat(questions);
            //this.filterResponse();
            this.setQuestionsInOrder();
            this.createForm();
        });
      };
      
    }

    onFormChanges(): void {
      this.myForm.valueChanges.subscribe((value: string) => {
        this.toggleContinue();
      });
      for( let control in this.myForm.controls ){
        this.myForm.controls[control].valueChanges.subscribe((response: string) => {
          this.questionHandler(control,response);
        });
      }
    };

    setQuestionsInOrder(){
      this.questions = this.questions.sort(function(a, b) {
          return parseInt(a.rank) - parseInt(b.rank);
      });
    }

    lockAllFields(){
      this.formLocked = true;
    }

    saveForm( formData ) {
        // call API to save customer
        console.log(formData);

         if (this.myForm.valid) {
          console.log('form submitted');
          this.lockAllFields();
          

        } else {
          this.validateAllFormFields(this.myForm); //{7}
        }
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
