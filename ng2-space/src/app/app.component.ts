import { Component } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng2-space'
  routerSubject: Subscription

  constructor(private router: Router) {
    this.routerSubject = router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const loading = document.getElementById('index-loading') as HTMLDivElement
      if (loading) {
        loading.classList.add('hide')
        const style = document.getElementById('index-load-style')
        setTimeout(() => {
          document.body.removeChild(loading)
          if (style) {
            document.head.removeChild(style)
          }
          this.routerSubject.unsubscribe()
        }, 15000)
      }
    })
  }
}
