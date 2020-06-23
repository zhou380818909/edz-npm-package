import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'edz-group-datepicker',
    templateUrl: './group-datepicker.component.html',
    styleUrls: ['./group-datepicker.component.scss']
})
export class GroupDatepickerComponent implements OnInit {

    _dateRange = null
    radioValue = '1'
    disabled = true

    @Output()
    dateRangeChange = new EventEmitter();

    @Input()
    type = '1'

    @Output()
    onChange = new EventEmitter();

    @Input()
    get dateRange() {
        return this._dateRange;
    }
    set dateRange(params) {
        this._dateRange = params;
        this.dateRangeChange.emit(this._dateRange);
    }
    constructor() { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.type === '1') {
                this.onRadioChange('1')
            } else {
                this.onSecondRadioChange('1')
            }
        }, 100);
    }

    onDateChange(value) {
        this.radioValue = '4';
        this.dateRangeChange.emit(this._dateRange);
        this.onChange.emit(this._dateRange)
    }

    onRadioChange(value) {
        let date = new Date()
        switch (value) {
            case '1':
                this._dateRange = [date, date]
                break
            case '2':
                let _day = date.getDay() || 7
                this._dateRange = [new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - _day), date]
                break
            case '3':
                this._dateRange = [new Date(date.getFullYear(), date.getMonth(), 1), date]
                break

            case '4':
                this._dateRange = []
                break;
            case '5':
                this._dateRange = []
                break;
        }
        this.disabled = value!=='5'
        this.dateRangeChange.emit(this._dateRange);
        this.onChange.emit(this._dateRange)
    }

    onSecondRadioChange(value) {
        let date = new Date()
        switch (value) {
            case '1':
                this._dateRange = [new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - 7), date]
                break
            case '2':
                let _day = new Date().getDay() || 7
                this._dateRange = [new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - 14), date]
                break
            case '3':
                this._dateRange = [new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - 30), date]
                break
            case '4':
                this._dateRange = []
                break;
            case '5':
                this._dateRange = []
                break;
        }

        this.disabled = value!=='5'
        this.dateRangeChange.emit(this._dateRange);
        this.onChange.emit(this._dateRange)
    }

}
