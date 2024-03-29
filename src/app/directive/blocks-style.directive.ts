import {
  AfterViewInit,
  Directive,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnInit,
  SimpleChanges
        } from '@angular/core';
import { Router } from '@angular/router';
import { ITechnic } from '../models/technics';


@Directive({
  selector: '[appBlocksStyle]',
  host: {
    '(document:keyup)': 'initKeyUp($event)'
  },
  exportAs: 'blocksStyle'
})
export class BlocksStyleDirective implements OnInit, AfterViewInit, OnChanges {
  @Input() selector: string;
  @Input() initFirst: boolean = false;
  @Output() renderComplete = new EventEmitter();
  private items: HTMLElement[];
  private index: number = 0;
  public activeElementIndex: number;
  private technics: ITechnic[]

  constructor(private el: ElementRef, private router: Router) { }

  ngOnInit():void {

  }
  ngAfterViewInit() {
    this.activeElementIndex = 0
   if(this.selector){
       this.items = this.el.nativeElement.querySelectorAll(this.selector);

     if(this.initFirst){
       if(this.items[0]){
             (this.items[0] as HTMLElement).setAttribute('style', 'border: 2px solid green');
       }
     }
   } else {
     console.error('Не передан селектор')
   }
    setTimeout(() =>{
      this.renderComplete.emit(true);
    })
  }
  ngOnChanges(data: SimpleChanges){
    //(this.items[1] as HTMLElement).setAttribute('style', 'border: 2px solid red');
  }
  initKeyUp(ev:KeyboardEvent): void {
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft'){
      (this.items[this.index] as HTMLElement).removeAttribute('style');
    }
    if (ev.key === 'ArrowRight'){
      this.index++;
      if(this.index >= this.items.length)
        this.index = 0;
     // this.initStyle(this.index)

    } else if (ev.key === 'ArrowLeft'){
      this.index--;
      if(this.index < 0)
        this.index = (this.items.length > 0) ? this.items.length - 1 : 0;
     // this.initStyle(this.index)

    }
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
      this.initStyle(this.index);
      const element = (this.items[this.index] as HTMLElement);
      element.scrollIntoView({behavior: "smooth", block: "center", inline: "start"})
    }
    this.activeElementIndex = this.index;
    if (ev.key === 'Enter'|| ev.key === ' ') {
      const item = this.technics[this.activeElementIndex]
      this.router.navigate([`/tickets/ticket/${item._id}`])
    }
  }

  initStyle(index: number) {
     if(this.items[index]) {
       (this.items[index] as HTMLElement).setAttribute('style','border: 2px solid green')
     }
  }
  updateItems(): void {
    this.items = this.el.nativeElement.querySelectorAll(this.selector);
  }
  initTechnics(technics:ITechnic[]): void {
    this.technics = technics;
 }

}

