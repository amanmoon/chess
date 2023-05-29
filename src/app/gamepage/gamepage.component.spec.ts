import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamepageComponent } from './gamepage.component';

describe('GamepageComponent', () => {
  let component: GamepageComponent;
  let fixture: ComponentFixture<GamepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamepageComponent]
    });
    fixture = TestBed.createComponent(GamepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
