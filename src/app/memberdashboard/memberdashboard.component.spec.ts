import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberdashboardComponent } from './memberdashboard.component';

describe('MemberdashboardComponent', () => {
  let component: MemberdashboardComponent;
  let fixture: ComponentFixture<MemberdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
