import {QuestionBase} from './QuestionBase';
export class TextboxQuestion extends QuestionBase<string>{
    type:string;
    q_type = 'text';
    constructor(){
        super();
    }
}