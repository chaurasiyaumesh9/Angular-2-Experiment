import { Component } from '@angular/core';

import { QuestionService } from './Services/question.service';
import { UserdetailsService } from './Services/userdetails.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  providers: [ QuestionService, UserdetailsService ]
})
export class AppComponent {
  title = 'app';
  
}
