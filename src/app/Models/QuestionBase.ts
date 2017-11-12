export class QuestionBase<T>{
    value: T;
    q_id:string;
    q_text:string;
    required:boolean;
    rank:number;
    q_type:string;
}