import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechmodelItemComponent } from './techmodel-item.component';

describe('TechmodelItemComponent', () => {
  let component: TechmodelItemComponent;
  let fixture: ComponentFixture<TechmodelItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechmodelItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechmodelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
