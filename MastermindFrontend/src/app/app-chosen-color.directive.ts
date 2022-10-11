import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appAppChosenColor]'
})
export class AppChosenColorDirective implements OnInit{

  @Input() appAppChosenColor = '';

  private ele: HTMLElement = null!;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.ele = this.elementRef.nativeElement as HTMLElement;
    this.ele.style.backgroundColor = this.appAppChosenColor;
  }

}
