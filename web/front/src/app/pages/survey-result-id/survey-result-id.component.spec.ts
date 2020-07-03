import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResultIdComponent } from './survey-result-id.component';

describe('SurveyResultIdComponent', () => {
  let component: SurveyResultIdComponent;
  let fixture: ComponentFixture<SurveyResultIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyResultIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyResultIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
