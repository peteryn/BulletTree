import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwissRoundComponent } from './swiss-round.component';

describe('SwissRoundComponent', () => {
  let component: SwissRoundComponent;
  let fixture: ComponentFixture<SwissRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwissRoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwissRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
