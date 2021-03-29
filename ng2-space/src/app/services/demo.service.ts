import { Injectable } from '@angular/core'
import { HttpService } from 'dev'

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  constructor(private http: HttpService) { }

  demo() {
    return this.http.get('/api/adminUser/isAdmin')
  }
}
