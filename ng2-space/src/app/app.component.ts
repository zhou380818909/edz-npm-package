import { Component } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'ng2-space';
    text = '13211111111'
    options = [ 
        {key:'id',value:'北京'}
    ]
    date=null
    showPhone() {
        setTimeout(() => {
            this.text = '13211112222'
        }, 1000)
    }
    onCollapse(v){
        // alert(v)
    }
    onBtnClick(){
        console.log(this.date)
    }
    dateChange(date){
        console.log(date)
    }
}
