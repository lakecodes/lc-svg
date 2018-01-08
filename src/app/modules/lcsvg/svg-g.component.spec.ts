import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LcSvgGroupComponent } from './svg-g.component';

describe('SvgGComponent', () => {
  let component: LcSvgGroupComponent;
  let fixture: ComponentFixture<LcSvgGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LcSvgGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LcSvgGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
