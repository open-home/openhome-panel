import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective {

  @Input()
  lightLabel: string;

  @Input()
  lightPower: string;

  @Output()
  onLongPressComplete: EventEmitter<any> = new EventEmitter();

  pressDuration: number = 400;
  interval: any;

  constructor() { }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onMouseDown(event) {

    const init = Date.now();

    this.interval = setInterval(() => {

      // Long press time check.
      if ((Date.now() - init) > this.pressDuration) {

        const payload = { label: this.lightLabel, power: this.lightPower };
        this.onLongPressComplete.emit(payload);

        this.endPress();
      }
    }, 100);
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('touchend', ['$event'])
  onMouseUp(event) {
    this.endPress();
  }

  endPress() {
    clearInterval(this.interval);
  }
}
