import { Movie } from './../../interfaces/cartelera-response';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @Input() movies: Movie[];

  public mySwipe: Swiper;

  constructor() {}
  ngAfterViewInit(): void {
    this.mySwipe = new Swiper('.swiper-container', {
      // Optional parameters
      // direction: 'vertical',
      loop: true,

      // // If we need pagination
      // pagination: {
      //   el: '.swiper-pagination',
      // },

      // // Navigation arrows
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },

      // // And if we need scrollbar
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      // },
    });
  }

  ngOnInit(): void {}
  onSlidePrev() {
    this.mySwipe.slidePrev();
  }

  onSlideNext() {
    this.mySwipe.slideNext();
  }
}
