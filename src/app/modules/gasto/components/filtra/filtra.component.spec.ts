import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltraComponent } from './filtra.component';

describe('FiltraComponent', () => {
  let component: FiltraComponent;
  let fixture: ComponentFixture<FiltraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
