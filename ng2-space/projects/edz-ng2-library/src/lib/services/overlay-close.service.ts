import { ESCAPE } from '@angular/cdk/keycodes'
import { Injectable, OnDestroy } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { filter } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class OverlayCloseService implements OnDestroy {
  private destroy$ = new Subject()

  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      if (window?.document?.body.querySelectorAll) {
        document.body.querySelectorAll(('.cdk-overlay-container>.cdk-overlay-connected-position-bounding-box')).forEach(item => {
          // @ts-ignore
          item.dispatchEvent(new KeyboardEvent('keydown', { keyCode: ESCAPE, key: 'Escape', bubbles: true }))
        })
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next()
  }
}
