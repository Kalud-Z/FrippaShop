import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appCutLayer]'
})
export class CutLayerDirective implements OnInit { //###############################################################################

  constructor(private layer : ElementRef , private renderer : Renderer2) { }

  
  ngOnInit() {
    const targetElement  = this.layer.nativeElement;
		const width = targetElement.clientWidth;
		const height = targetElement.clientHeight;
    const desiredWidth = width / 2.5;

    // const gg = width - desiredWidth;
    
   
    console.log('this is the desired width' , desiredWidth)
    console.log('this is the full width of top side' , width)
    console.log('this is the full height of right side' , height)

    // console.log(targetElement.className);
    if(targetElement.className.includes('layer-3')) {
      this.renderer.setStyle(targetElement, 'clip-path', `polygon( ${desiredWidth}px 0, 0 0, 0 ${desiredWidth}px)`);
    }


    if(targetElement.className.includes('layer-1')) {
    // return;
      const  layer1LeftWidth     = (height - desiredWidth);
      const layer1BottomWidth    = (width - desiredWidth);
      // console.log('im in layer 1')
      
      this.renderer.setStyle(targetElement, 'clip-path', `polygon(100% ${layer1LeftWidth}px, ${layer1BottomWidth}px 100%, 100% 100%)`);

    }





    // const width = targetElement.clie
    // const desiredWidth = targetElement.offsetWidth;
    // const parent1 = this.renderer.parentNode(targetElement);
    // const parent2 = this.renderer.parentNode(parent1);
    // const parent3 = this.renderer.parentNode(parent2);
    // this.renderer.setStyle(targetElement, 'clip-path', 'polygon(10rem 0, 0 0, 0 10rem)');
    // this.renderer.setStyle(targetElement, 'clip-path', `polygon( 300 0, 0 0, 0 ${desiredWidth})`);
    // clip-path: polygon(10rem 0, 0 0, 0 10rem);

  }







} // class ############################################################################################################
