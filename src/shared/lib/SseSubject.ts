import { Subject } from 'rxjs';

export class SseSubject extends Subject<string> {
  next(value?: any) {
    let modifiedValue = value;
    if (typeof value === 'object') {
      modifiedValue = JSON.stringify(value);
    } else {
      modifiedValue = modifiedValue.toString();
    }

    super.next(modifiedValue);
  }
}
