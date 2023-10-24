import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessagesService } from './messages.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ // @Injectable() decorator marks the class as one that participates in the dependency injection system.
  // To make sure that the HeroService can provide this service, register it with the injector. 
  // The injector is the object that chooses and injects the provider where the application requires it
  // By default, ng generate service registers a provider with the root injector for your service by including provider metadata, that's providedIn: 'root'
  // When you provide the service at the root level, Angular creates a single, shared instance of HeroService and injects into any class that asks for it. 
  // Registering the provider in the @Injectable metadata also allows Angular to optimize an application by removing the service if it isn't used.
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessagesService, private httpClient: HttpClient) { }

  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  // Observable is an RxJS operator that allows you to subscribe to an observable
  // Observables observe and then send the data when it is ready
  getHeroes(): Observable<Hero[]> { 
    //const heroes = of(HEROES);
    const heroes = this.httpClient.get<Hero[]>('http://127.0.0.1:5000/heroes');
    this.messageService.add('HeroService: fetched the heroes from flask api');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    // const hero = HEROES.find(h => h.id === id)!;
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(hero);
    const hero = this.httpClient.get<Hero>(`http://127.0.0.1:5000/detail/`+id.toString());
    this.messageService.add(`HeroService: fetched hero from flask api with id=${id}`);
    return hero;
  }

  updateHero(hero: Hero): Observable<any> {
    console.log('updating http client service calling')    
    return this.httpClient.post<any>(`http://127.0.0.1:5000/update`, hero);
  }
}
