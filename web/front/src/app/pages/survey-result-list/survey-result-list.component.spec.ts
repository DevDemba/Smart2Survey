import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResultListComponent } from './survey-result-list.component';

describe('SurveyResultListComponent', () => {
  let component: SurveyResultListComponent;
  let fixture: ComponentFixture<SurveyResultListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyResultListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
