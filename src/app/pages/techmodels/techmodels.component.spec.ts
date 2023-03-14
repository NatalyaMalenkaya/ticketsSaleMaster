import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechmodelsComponent } from './techmodels.component';

describe('TechmodelsComponent', () => {
  let component: TechmodelsComponent;
  let fixture: ComponentFixture<TechmodelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechmodelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechmodelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
