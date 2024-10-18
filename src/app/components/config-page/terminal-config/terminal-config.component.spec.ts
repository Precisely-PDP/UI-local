import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalConfigComponent } from './terminal-config.component';

describe('TerminalConfigComponent', () => {
  let component: TerminalConfigComponent;
  let fixture: ComponentFixture<TerminalConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminalConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TerminalConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
