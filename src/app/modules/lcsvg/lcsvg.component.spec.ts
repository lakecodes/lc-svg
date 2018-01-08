import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LcSvgComponent } from './lcsvg.component';

describe('LcsvgComponent', () => {
  let component: LcSvgComponent;
  let fixture: ComponentFixture<LcSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LcSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LcSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
