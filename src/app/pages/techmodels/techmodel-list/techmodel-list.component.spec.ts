import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechmodelListComponent } from './techmodel-list.component';

describe('TechmodelListComponent', () => {
  let component: TechmodelListComponent;
  let fixture: ComponentFixture<TechmodelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechmodelListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechmodelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
