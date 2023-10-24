import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
//import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit
 {
  value = 1.23;
  selectedHero?: Hero; // ? makes it optional i.e., it can be undefined

  hero: Hero = {
    id: 1,
    name: 'Ahmad Waqas'
  }

  //heroes = HEROES;
  heroes: Hero[] = []; // Now interacting with the service

  constructor (private heroService: HeroService, private messagesService: MessagesService) { // Injecting the HeroService into the constructor

  }
  ngOnInit(): void {
    this.getHeroes(); // Best place of calling such service/function is here instead of constructor
  }

  onSelected(hero: Hero): void {
    console.log('Hero selected: ', hero);
    this.selectedHero = hero;

    this.messagesService.add(`HeroService: Selected hero id=${hero.id} and name=${hero.name}`);
  }

  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  //   // Above approach won't work in a real application that uses asynchronous calls. It works now because your service synchronously returns mock heroes.
  //   // If getHeroes() can't return immediately with hero data, it shouldn't be synchronous, because that would block the browser as it waits to return data.
  //   // So, HeroService.getHeroes() must have an asynchronous signature of some kind.
  // }

  // Following is an asynchronous approach

  getHeroes(): void {
    // The new version waits for the Observable to emit the array of heroes, which could happen now or several minutes from now. 
    // The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
    // This asynchronous approach works when the HeroService requests heroes from the server.
    this.heroService.getHeroes()
    .subscribe(x => {
      console.log(x);
      this.heroes = x      
    }
    );
  }
}
