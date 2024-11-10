import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaEditComponent } from './tarea-edit.component';

describe('TareaEditComponent', () => {
  let component: TareaEditComponent;
  let fixture: ComponentFixture<TareaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
