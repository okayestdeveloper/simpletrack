import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StrkNavbarComponent } from './strk-navbar.component';

describe('AppNavbarComponent', () => {
  let component: StrkNavbarComponent;
  let fixture: ComponentFixture<StrkNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrkNavbarComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrkNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
