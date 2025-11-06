import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesUpdate } from './categories-update';

describe('CategoriesUpdate', () => {
  let component: CategoriesUpdate;
  let fixture: ComponentFixture<CategoriesUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
