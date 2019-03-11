import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { State } from './state';

@Injectable({
  providedIn: 'root'
})
// USE graphql for the api call app routing
export class StateStoreService implements InMemoryDbService {
  createDb() {
    const state: State = { id: 0, content: "Some Blank Content", urls: []};
    console.log("StateStoreService instantiated");
    return {state};
  }

  genId(): number {
    // API call to get max id here? possibly zero is the best temp id.
    return 0;
  }
}
