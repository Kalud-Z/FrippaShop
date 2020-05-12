import { Directive, Renderer2, ElementRef, OnInit, HostListener } from '@angular/core';
// import { Inject} from "@angular/core";
// import { Document } from '@angular/common';

@Directive({
  selector: '[appScrollTopBottom]'
})
export class ScrollTopBottomDirective implements OnInit { //################################################################################################################

  constructor(private renderer: Renderer2,
              private el: ElementRef,
              ) {}


  @HostListener('document:click', ['$event']) onClick(event) {
    // console.log('xxfssfss')
    // console.log(event.target)
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (clickedInside) {
      // console.log('we just clicked')
      const targetElement = this.el.nativeElement; 

      const parentElement = this.renderer.parentNode(targetElement);
      // const windowHeight = parentElement.clientHeight;

      targetElement.scrollTop = 33;

    //  window.scrollTo({
    //       // top  : windowHeight,
    //       top  : 500,
    //       left : 0,
    //       behavior : 'smooth'
    //   })

    }



  }


  ngOnInit() {
    // const targetElement = this.el.nativeElement; 
    // // const desiredHeight = targetElement.clientHeight;

    // const parentElement = this.renderer.parentNode(targetElement);
    // const windowHeight = parentElement.clientHeight;

    // console.log(parentElement);
    // console.log(windowHeight);

    //  window.scrollTo({
    //     top  : windowHeight,
    //     left : 0,
    //     behavior : 'smooth'
    // })

   
    


    // this.renderer.setAttribute(div, 'style', `height: ${desiredHeight + heightFix}px`);
    // this.renderer.addClass(div, 'rightBorder');
    
  }




} //class ###############################################################################################################################################







/* 

var buttonDown = document.querySelector('.btnDown')
var buttonTop = document.querySelector('.btnTop')

buttonDown.addEventListener('click', function() {
    console.log('we are here')
    var div = document.getElementById("div");
    var endOfPage = div.clientHeight;

    window.scrollTo({
        top  : endOfPage,
        left : 0,
        behavior : 'smooth'
    })
})

buttonTop.addEventListener('click', function() {
    console.log('we are here')
    var div = document.getElementById("div");
    var endOfPage = div.clientHeight;

    window.scrollTo({
        top  : 0,
        left : 0,
        behavior : 'smooth'
    })
})

*/


