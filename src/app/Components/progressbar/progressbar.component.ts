import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: 'app/Components/progressbar/progressbar.component.html',
  styleUrls: ['app/Components/progressbar/progressbar.component.css']
})
export class ProgressbarComponent implements OnInit {
	
	ActiveStep: number;
	TotalSteps: number;
  Percent: number;
	fakeArray = [];
  
  constructor() { 
  	this.ActiveStep = 2; //considering starts from 0
  	this.TotalSteps = 4;
    this.Percent = (100/this.TotalSteps) * this.ActiveStep;

  	this.fakeArray = new Array(4);
  }

  ngOnInit() {


  }

}
