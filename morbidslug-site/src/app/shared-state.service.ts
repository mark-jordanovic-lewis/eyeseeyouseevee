import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedStateService {
  public contentSelection: BehaviorSubject<string> = new BehaviorSubject<string>('blog');
}
