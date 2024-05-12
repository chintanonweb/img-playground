import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPlaygroundComponent } from './img-playground.component';

describe('ImgPlaygroundComponent', () => {
  let component: ImgPlaygroundComponent;
  let fixture: ComponentFixture<ImgPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgPlaygroundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
