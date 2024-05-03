import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlobUploadComponent } from './blob-upload.component';

describe('BlobUploadComponent', () => {
  let component: BlobUploadComponent;
  let fixture: ComponentFixture<BlobUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlobUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlobUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
