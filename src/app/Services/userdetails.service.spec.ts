import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { UserdetailsService } from './userdetails.service';

describe('UserdetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    	imports: [HttpModule],
      providers: [UserdetailsService]
    });
  });

  it('should be created', inject([UserdetailsService], (service: UserdetailsService) => {
    expect(service).toBeTruthy();
  }));

   it('Testing getUserDetails', inject([UserdetailsService], (service: UserdetailsService) => {
    expect(service).toBeTruthy();

    service.getUserDetails().subscribe((details) => {
    	expect(details).toBeTruthy();
      	//expect(questions.length).toBeGreaterThan(0);
    });
  }));

   it('Testing getAppID', inject([UserdetailsService], (service: UserdetailsService) => {
    expect(service).toBeTruthy();

    service.getAppID().subscribe((details) => {
    	expect(details).toBeTruthy();
      	//expect(questions.length).toBeGreaterThan(0);
    });
  }));
});
