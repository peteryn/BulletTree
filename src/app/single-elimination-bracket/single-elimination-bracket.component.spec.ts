import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEliminationBracketComponent } from './single-elimination-bracket.component';

describe('SingleEliminationBracketComponent', () => {
  let component: SingleEliminationBracketComponent;
  let fixture: ComponentFixture<SingleEliminationBracketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleEliminationBracketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleEliminationBracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
