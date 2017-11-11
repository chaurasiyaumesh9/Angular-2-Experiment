import {
    Injectable
} from '@angular/core';
import {
    Http,
    Response
} from '@angular/http';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/filter";




@Injectable()
export class QuestionService {
    private _url: string = "/assets/config.json";
    constructor(private _http: Http) {}

    

    getAllQuestions() {
        return this._http.get(this._url).map((response: Response) => {
            let _response = response.json();
            //console.log('_response : ',_response.configuration.programs[0]['questions']);
            return _response.questions;
            //response.json();
            //return [];
        });
    }

    getVisibleQuestion() {
        return [];
    }

    

    getQuestionsByProgramId( _pid: string ){
        if (!_pid) {return null;};
         return this._http.get(this._url).map((response: Response) => {
            let _response = response.json();
            //console.log('_response : ',_response.configuration.programs[0]['questions']);
            return _response.questions.filter(function(question){
                return question.program && question.program.indexOf(_pid) >= 0  ;
            });
        });
    }

    getQuestionsMultipleProgramIds( _ids: Array<string> ){
        if (!_ids || _ids.length == 0) {return null;};
         return this._http.get(this._url).map((response: Response) => {
            let _response = response.json();
            //console.log('_response : ',_response.configuration.programs[0]['questions']);
            return _response.questions.filter(function(question){
                //return question.program && question.program.indexOf(_pid) >= 0  ;
                if ( question.program && question.program.length > 0 ) {
                    for( let i=0;i<question.program.length; i++){
                        let programid = question.program[i];
                        if (_ids.indexOf(programid) >=0 ) {return true;};
                        
                    }
                };
            });
        });
    }

    getQuestionByScope( _scope: string ){
        if (!_scope) {return null;};
        return this._http.get(this._url).map((response: Response) => {
            let _response = response.json();
            //console.log('_response : ',_response.configuration.programs[0]['questions']);
            return _response.questions.filter(function(question){
                return question.scope && question.scope == _scope;
            });
        });
    }

    getProgram( _questionid: string, optionid: string){
        if (!_questionid || !optionid ) {return null;};
        return this._http.get(this._url).map((response: Response) => {
            let _response = response.json();
            //console.log('_response : ',_response.configuration.programs[0]['questions']);
            let question = _response.questions.filter(function(q){
                return q.q_id == _questionid;
            });

            if (question.length == 0 ) { return null; };

            let option = question[0].q_options.filter(function(opt){
                return opt.opt_value == optionid;
            });
            if (option.length == 0 ) { return null; };
            //console.log('option.program : ',option[0].program);
            return option[0].program;
        });
    }
}