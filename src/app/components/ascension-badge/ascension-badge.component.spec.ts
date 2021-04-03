import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AscensionBadgeComponent } from './ascension-badge.component';

describe('AscensionBadgeComponent', () => {
  let component: AscensionBadgeComponent;
  let fixture: ComponentFixture<AscensionBadgeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AscensionBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AscensionBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
