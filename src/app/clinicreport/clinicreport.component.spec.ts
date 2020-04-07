import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicreportComponent } from './clinicreport.component';

describe('ClinicreportComponent', () => {
  let component: ClinicreportComponent;
  let fixture: ComponentFixture<ClinicreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
