import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  constructor() { }

  dayObject = {
		'1': 'Mo',
		'2': 'Tu',
		'3': 'We',
		'4': 'Th',
		'5': 'Fr',
		'6': 'Sa',
		'7': 'Su',
	};

	dayObjectStringToNumber = {
		'Mo': '1',
		'Tu': '2',
		'We': '3',
		'Th': '4',
		'Fr': '5',
		'Sa': '6',
		'Su': '7'
	};

	daysOfWeek = [
		{'tooltip': 'Monday', 'text': 'M', 'value': 1, isCheckedDD: false, isSelected: false},
		{'tooltip': 'Tuesday', 'text': 'T', 'value': 2, isCheckedDD: false, isSelected: false},
		{'tooltip': 'Wednesday', 'text': 'W', 'value': 3, isCheckedDD: false, isSelected: false},
		{'tooltip': 'Thursday', 'text': 'Th', 'value': 4, isCheckedDD: false, isSelected: false},
		{'tooltip': 'Friday', 'text': 'F', 'value': 5, isCheckedDD: false, isSelected: false},
		{'tooltip': 'Saturday', 'text': 'Sa', 'value': 6, isCheckedDD: false, isSelected: false},
		{'tooltip': 'Sunday', 'text': 'S', 'value': 7, isCheckedDD: false, isSelected: false}
	];
}
