import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlobPlaygroundComponent } from './blob-playground.component';

describe('BlobPlaygroundComponent', () => {
  let component: BlobPlaygroundComponent;
  let fixture: ComponentFixture<BlobPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlobPlaygroundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlobPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
