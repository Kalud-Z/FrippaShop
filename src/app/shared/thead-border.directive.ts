import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTheadBorder]'
})
export class TheadBorderDirective implements OnInit { //##########################################################################################################

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    // const targetElement = this.el.nativeElement; 
    // const desiredHeight = targetElement.clientHeight;

    // let heightFix : number;

    // console.log(targetElement.className.includes('balanceTableTh'))

    // if(targetElement.className.includes('balanceTableTh')) {
    //   heightFix = 2;
    // }

    // // task table : 20

    // const div  = this.renderer.createElement('div');
    // this.renderer.setAttribute(div, 'style', `height: ${desiredHeight + heightFix}px`);
    // this.renderer.addClass(div, 'rightBorder');
    
    // this.renderer.appendChild(targetElement, div);
  }




} //class #######################################################################################################################################
