import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescriptAngularClientGeneratedComponent } from './typescript-angular-client-generated.component';

describe('TypescriptAngularClientGeneratedComponent', () => {
  let component: TypescriptAngularClientGeneratedComponent;
  let fixture: ComponentFixture<TypescriptAngularClientGeneratedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypescriptAngularClientGeneratedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypescriptAngularClientGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
