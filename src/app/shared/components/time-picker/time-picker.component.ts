import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {

  timeInterval = [];
  dropdownStartTime;
  startTime;
  constructor() { }

  ngOnInit(): void {
    this.getTimeInterval()
  }

  getTimeInterval() {
    let hours;
		let minutes;
		let ampm;
		let inMin;
		let _24Hour;
		// 1425 = (24 hours * 60 min) - 15 min          // 24 hours time
		// [Sri] Changed to 3:00 AM till 26:59 PM
		for (let i = 180; i <= 1619; i += 15) {
			hours = Math.floor(i / 60);
			inMin = i;
			minutes = i % 60;
			if (minutes < 10) {
				minutes = '0' + minutes; // adding leading zero
			}
			_24Hour = ((hours < 10) ? '0' + hours : hours) + ':' + minutes;
			ampm = hours % 24 < 12 ? 'AM' : 'PM';
			hours = hours % 12;

			// _24Hour = Math.floor(i / 60) + ':' + minutes;
			if (hours === 0) {
				hours = 12;
			}
			this.timeInterval.push({'time': hours + ':' + minutes, 'ampm': ampm, 'inMin': inMin, '_24Hour': _24Hour});
		}
		this.timeInterval.push({'time': '2:59', 'ampm': 'AM', 'inMin': 1619, '_24Hour': '26:59'});
  }

  onSelectTime(type) {
    if (type === 'select') {
      this.startTime = this.dropdownStartTime;
    }
  }
}
