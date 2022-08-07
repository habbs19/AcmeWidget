import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityformComponent } from './activityform.component';

describe('ActivityformComponent', () => {
  let component: ActivityformComponent;
  let fixture: ComponentFixture<ActivityformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should update the value of the input field', () => {
    const input = fixture.nativeElement.querySelector('input');
    //const event = createNewEvent('input');
  
    input.value = 'Red';
    input.dispatchEvent(event);
  
    //expect(fixture.componentInstance.favoriteColorControl.value).toEqual('Red');
  });

});


