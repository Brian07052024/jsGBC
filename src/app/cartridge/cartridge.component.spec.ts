import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartridgeComponent } from './cartridge.component';

describe('CartridgeComponent', () => {
  let component: CartridgeComponent;
  let fixture: ComponentFixture<CartridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartridgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
