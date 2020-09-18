import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRed]'
})
export class RedDirective {
  //  Injetando referência para o elemento
  constructor(private el: ElementRef) {
    el.nativeElement.style.color= '#0fffc6'
   }

}
