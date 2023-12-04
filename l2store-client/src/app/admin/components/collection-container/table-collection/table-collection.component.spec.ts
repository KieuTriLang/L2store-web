import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCollectionComponent } from './table-collection.component';

describe('TableCollectionComponent', () => {
  let component: TableCollectionComponent;
  let fixture: ComponentFixture<TableCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
