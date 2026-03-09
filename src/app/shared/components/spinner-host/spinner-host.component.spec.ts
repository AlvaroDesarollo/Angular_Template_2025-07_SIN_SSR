import { ComponentFixture} from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { SpinnerHostComponent } from './spinner-host.component';

describe('SpinnerHostComponent', () => {
  let component: SpinnerHostComponent;
  let fixture: ComponentFixture<SpinnerHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


