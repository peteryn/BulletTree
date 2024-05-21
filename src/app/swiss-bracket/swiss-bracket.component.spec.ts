import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwissBracketComponent } from './swiss-bracket.component';

describe('SwissBracketComponent', () => {
  let component: SwissBracketComponent;
  let fixture: ComponentFixture<SwissBracketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwissBracketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwissBracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
