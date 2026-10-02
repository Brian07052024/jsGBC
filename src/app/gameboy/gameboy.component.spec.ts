import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameboyComponent } from './gameboy.component';

describe('GameboyComponent', () => {
  let component: GameboyComponent;
  let fixture: ComponentFixture<GameboyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameboyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameboyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
