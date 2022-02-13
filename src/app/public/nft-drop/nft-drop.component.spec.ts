import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftDropComponent } from './nft-drop.component';

describe('NftDropComponent', () => {
  let component: NftDropComponent;
  let fixture: ComponentFixture<NftDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftDropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
