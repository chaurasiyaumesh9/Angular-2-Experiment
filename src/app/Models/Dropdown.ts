import {QuestionBase} from './QuestionBase';
export class DropDownQuestion extends QuestionBase<string>{
    options = [];
    q_type = 'dropdown';
    constructor(){
        super();
    }
}