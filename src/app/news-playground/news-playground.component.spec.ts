import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPlaygroundComponent } from './news-playground.component';

describe('NewsPlaygroundComponent', () => {
  let component: NewsPlaygroundComponent;
  let fixture: ComponentFixture<NewsPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsPlaygroundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
