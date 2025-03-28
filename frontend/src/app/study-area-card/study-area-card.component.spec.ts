import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAreaCardComponent } from './study-area-card.component';

describe('StudyAreaCardComponent', () => {
  let component: StudyAreaCardComponent;
  let fixture: ComponentFixture<StudyAreaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyAreaCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyAreaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
