import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonLoading } from './skeleton-loading';

describe('SkeletonLoading', () => {
  let component: SkeletonLoading;
  let fixture: ComponentFixture<SkeletonLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonLoading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonLoading);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
