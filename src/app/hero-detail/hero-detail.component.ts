import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero? : Hero; // Input indicates that it will take data from another/parent component

  constructor(
    private route: ActivatedRoute, // The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent.
    private heroService: HeroService, // The HeroService gets hero data from the remote server and this component uses it to get the hero-to-display.
    private location: Location // The location is an Angular service for interacting with the browser. This service lets you navigate back to the previous view.
  ) {   

  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // The route.snapshot is a static image of the route information shortly after the component was created.
    // The paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch.
    // Route parameters are always strings
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(x => this.hero = x);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      console.log('posting....'  + this.hero.name)
      this.heroService.updateHero(this.hero).subscribe();
    }    
  }
}
