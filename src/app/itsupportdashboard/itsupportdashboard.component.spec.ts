import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItsupportdashboardComponent } from './itsupportdashboard.component';

describe('ItsupportdashboardComponent', () => {
  let component: ItsupportdashboardComponent;
  let fixture: ComponentFixture<ItsupportdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItsupportdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItsupportdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
