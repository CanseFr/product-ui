import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByName } from './search-by-name';

describe('SearchByName', () => {
  let component: SearchByName;
  let fixture: ComponentFixture<SearchByName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchByName]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByName);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
