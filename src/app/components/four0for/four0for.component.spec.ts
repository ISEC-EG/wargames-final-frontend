import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Four0forComponent } from './four0for.component';

describe('Four0forComponent', () => {
  let component: Four0forComponent;
  let fixture: ComponentFixture<Four0forComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Four0forComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Four0forComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
