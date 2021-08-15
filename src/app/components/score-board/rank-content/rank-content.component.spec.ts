import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankContentComponent } from './rank-content.component';

describe('RankContentComponent', () => {
  let component: RankContentComponent;
  let fixture: ComponentFixture<RankContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
