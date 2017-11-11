import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { QuestionService } from './question.service';

describe('QuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [QuestionService]
    });
  });

  it('should be created', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();
  }));

  it('Testing GetAllQuestions', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();

    service.getAllQuestions().subscribe((questions) => {
    	expect(questions).toBeTruthy();
      expect(questions.length).toBeGreaterThan(0);
    });
  }));

  it('Testing getVisibleQuestion', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();
    let questions = service.getVisibleQuestion();
    expect(questions).toBeTruthy();
    expect(questions.length).toBeGreaterThan(0);

  }));

  it('Testing getQuestionsByProgramId', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();

    service.getQuestionsByProgramId('P1').subscribe((questions) => {
      expect(questions).toBeTruthy();
      expect(questions.length).toBeGreaterThan(0);
    });
  }));

  it('Testing getQuestionByScope', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();

    service.getQuestionByScope('global').subscribe((questions) => {
      expect(questions).toBeTruthy();
      expect(questions.length).toBeGreaterThan(0);
    });
  }));

  it('Testing getProgram', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();

    service.getProgram("Q2","1").subscribe((programs) => {
      expect(programs).toBeTruthy();
      expect(programs.length).toBeGreaterThan(0);
    });
  }));

  it('Testing getProgram', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();

    service.getProgram("Q2","2").subscribe((programs) => {
      expect(programs).toBeFalsy();
    });
  }));

});

