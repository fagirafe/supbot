import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupButtonComponent } from './sup-button.component';

describe('SupButtonComponent', () => {
  let component: SupButtonComponent;
  let fixture: ComponentFixture<SupButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
