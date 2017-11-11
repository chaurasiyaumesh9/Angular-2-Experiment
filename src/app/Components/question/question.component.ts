import { Component, OnInit } from '@angular/core';

import { QuestionService } from '../../Services/question.service';



@Component({
  selector: 'app-question',
  templateUrl: 'app/Components/question/question.component.html',
  styleUrls: ['app/Components/question/question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor( private _questionService: QuestionService ) { }
  questions = [];
  globalQuestions = [];
  visibleQuestions = [];
  savedReponses = {};
  showContinue = false;
  

  private _prevSelected: any;

    collapsed = false;
    toggleCollapse(evt){

      this.collapsed = !this.collapsed;
    }

    saveResponses( question ){
      if (!question) {return null;};
     
      this.savedReponses[question.q_id] = question.response;
    }

    ifAlreadyResponded( questionid ){
        for (let qid in this.savedReponses) {
          if (this.savedReponses.hasOwnProperty(questionid)) {
            return true;
          }
        }
        return false;
    }

    toggleContinue(){
      var size = Object.keys(this.savedReponses).length;

      if (size>0) {this.showContinue = true}else{this.showContinue = false;};
    }

    submitAndSaveResponse(){
      console.log('submitAndSaveResponse : ',this.savedReponses);
    }

    saveIt(newValue, qid){
      this.savedReponses[qid] = newValue;
      console.log('this.savedReponses : ',this.savedReponses);
    }
    clearValidationMessages(){

    }

    loadDependentQuestions(evt) {
      let target = evt.target;
      
      let question_id,answer_id;
      if (target.nodeName.toLowerCase() == "input") {
          question_id = target.id.split('_')[1];
          answer_id = target.id.split('_')[2];;
      }else if( target.nodeName.toLowerCase() == "select" ){
          question_id = target.id.split('_')[1];
          answer_id = target.value;;
      }

      let response = {
        "q_id": question_id,
        "response": answer_id
      };
      //console.log('response : ',response);
      this.saveResponses( response );
      //console.log('question_id : ',question_id,',answer_id : ',answer_id);

      if (question_id && answer_id) {
        this._questionService.getProgram(question_id,answer_id).subscribe(programs => {
          //console.log('programs : ',programs);
          if( programs && programs.length > 0 ){
            this._questionService.getQuestionsByProgramId(programs[0]).subscribe(questions => {
            //  console.log('questions :',questions);

              for( let k=0;k<questions.length;k++){
                if (question_id !== questions[k]['q_id']) {
                  if (questions[k].q_type.toLowerCase() == "dropdown") {
                    this.savedReponses[questions[k]['q_id']] = "-1";
                  };
                  
                };
              }
              this.questions = this.globalQuestions.concat(questions);

              this.questions = this.questions.sort(function(a, b) {
                  return parseInt(a.rank) - parseInt(b.rank);
              });
            });
          }
        });
      };
      this.toggleContinue();
      console.log('this.savedReponses : ',this.savedReponses);
    }


  ngOnInit() {

     this._questionService.getAllQuestions()
     .subscribe(resQuestionData => {
      //this.questions = resQuestionData
      for(let i=0;i<resQuestionData.length;i++){
        let question = resQuestionData[i];
        if (question.q_type.toLowerCase() == "dropdown") {
          this.savedReponses[question['q_id']] = "-1";
        }
        if (question.q_type.toLowerCase() == "textarea" || question.q_type.toLowerCase() == "text") {
          this.savedReponses[question['q_id']] = "";
        }

        
      }
     });

    this._questionService.getQuestionByScope('global')
    .subscribe(resQuestionData => {
      this.globalQuestions = resQuestionData;
      this.questions = this.globalQuestions;
    });
    


  }

}
