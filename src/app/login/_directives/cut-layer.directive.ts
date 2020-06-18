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

    if(targetElement.className.includes('layer-3')) {
      this.renderer.setStyle(targetElement, 'clip-path', `polygon( ${desiredWidth}px 0, 0 0, 0 ${desiredWidth}px)`);
    }

    if(targetElement.className.includes('layer-1')) {
      const  layer1LeftWidth      = (height - desiredWidth);
      const  layer1BottomWidth    = (width - desiredWidth);
      this.renderer.setStyle(targetElement, 'clip-path', `polygon(100% ${layer1LeftWidth}px, ${layer1BottomWidth}px 100%, 100% 100%)`);
    }

  }







} // class ############################################################################################################
