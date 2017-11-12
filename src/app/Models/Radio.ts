import {QuestionBase} from './QuestionBase';
export class TextboxQuestion extends QuestionBase<string>{
    options = [];
    q_type = 'radio';
    constructor(){
        super();
    }
}