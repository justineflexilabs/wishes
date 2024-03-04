import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppModule } from 'src/app/app.module';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private subject = new Subject();

  emit(eventName: string, payload: any) {
    //pass payload to listen
    this.subject.next({ eventName, payload });
  }

  listen(eventName: string, callback: (event: any) => void) {
    //Will receive from emit call
    this.subject.asObservable().subscribe((nextObject: any) => {
      if (eventName === nextObject.eventName) {
        callback(nextObject.payload);
      }
    });
  }
}
