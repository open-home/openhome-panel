import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiSwitchComponent } from './pi-switch.component';

describe('PiSwitchComponent', () => {
  let component: PiSwitchComponent;
  let fixture: ComponentFixture<PiSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
