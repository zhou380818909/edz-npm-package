import { Component } from '@angular/core';

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
    showPhone() {
        setTimeout(() => {
            this.text = '13211112222'
        }, 1000)
    }
    onCollapse(v){
        // alert(v)
    }
}
