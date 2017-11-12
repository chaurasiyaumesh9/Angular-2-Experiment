import {QuestionBase} from './QuestionBase';
export class TextareaQuestion extends QuestionBase<string>{
    type:string;
    q_type = 'textarea';
    constructor(){
        super();
    }
}