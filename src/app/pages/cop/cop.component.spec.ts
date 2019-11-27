import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopComponent } from './cop.component';

describe('CopComponent', () => {
  let component: CopComponent;
  let fixture: ComponentFixture<CopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
