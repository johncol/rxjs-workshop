import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { activity1, activity2, activity3, activity4, lesson } from './demo1.activities';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
})
export class Demo1Component implements OnDestroy, OnInit {
  // Store the info about the activities
  public readonly lesson = lesson;
  public readonly activity1 = activity1;
  public readonly activity2 = activity2;
  public readonly activity3 = activity3;
  public readonly activity4 = activity4;

  // Get a reference to the elements using their #tag
  @ViewChild('button1') button1ref: ElementRef;
  @ViewChild('button2') button2ref: ElementRef;

  // Store a reference to the actual nativeElement
  private button1: HTMLElement;
  private button2: HTMLElement;

  // Store the result of the activities
  public result1: any;
  public result2: any;
  public result3: any;

  // Observable of Events from button2
  public button2$: Observable<Event>;

  // Reference to the Subscription of the button2 Observable
  public activity2sub: Subscription;

  // Reference to the Subscription of the button2 Observable
  public activity3sub: Subscription;

  constructor() {
  }

  /**
   * The ngOnInit method runs on Component initialization.
   */
  ngOnInit() {
    // Assign the nativeElements.
    this.button1 = this.button1ref.nativeElement;
    this.button2 = this.button2ref.nativeElement;

    // Run the activities
    this.solution1();
    this.solution2();
    this.solution3();
  }

  /**
   * Solution for Activity 1
   */
  solution1() {
    this.button1.addEventListener('click', event => {
      this.result1 = {
        x: event.clientX,
        y: event.clientY
      };
    });
  }

  /**
   * Solution for Activity 2
   */
  solution2() {
    this.button2$ = fromEvent(this.button2, 'click');
    this.button2$.subscribe({
      next: (event: MouseEvent) => {
        // this.activity2sub.unsubscribe();
        this.result2 = {
          x: event.clientX,
          y: event.clientY
        };
      }
    });
  }

  /**
   * Solution for Activity 3
   */
  solution3() {
    this.activity3sub = fromEvent(document, 'click').subscribe({
      next: (event: MouseEvent) => {
        this.result3 = {
          x: event.clientX,
          y: event.clientY
        };
      }
    });
  }

  /**
   * Excercise 1
   *
   * The ngOnDestroy method runs on Component tear down.
   *
   * It can be used to unsubscribe the observable to prevent memory leaks.
   */
  ngOnDestroy() {
    if (this.activity2sub) {
      this.activity2sub.unsubscribe();
    }
    if (this.activity3sub) {
      this.activity3sub.unsubscribe();
    }
  }

}
