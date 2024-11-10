import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContainerAdminComponent } from './main-container-admin.component';

describe('MainContainerAdminComponent', () => {
  let component: MainContainerAdminComponent;
  let fixture: ComponentFixture<MainContainerAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainContainerAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainContainerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
