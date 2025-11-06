import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByCategory } from './search-by-category';

describe('SearchByCategory', () => {
  let component: SearchByCategory;
  let fixture: ComponentFixture<SearchByCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchByCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
