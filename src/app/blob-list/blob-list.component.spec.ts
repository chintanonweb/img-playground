import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlobListComponent } from './blob-list.component';

describe('BlobListComponent', () => {
  let component: BlobListComponent;
  let fixture: ComponentFixture<BlobListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlobListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
