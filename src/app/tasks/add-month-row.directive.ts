import { Directive, Renderer2, ElementRef } from '@angular/core';
import { crudService } from './crud.service';
import { DataStorageService } from './data-storage.service';

@Directive({
  selector: '[appAddMonthRow]'
})

// ############################################################################################################################################
export class AddMonthRowDirective { //#########################################################################################################

  constructor(private renderer: Renderer2 ,
              private el : ElementRef,
              private dataStorageService: DataStorageService
              ) { }

    
  ngOnInit() {
    this.dataStorageService.addDirectiveSubject.subscribe(data => {
      if(data === true) {
    

        const parent     = this.el.nativeElement;
        const allRows    = parent.childNodes;


        const targetRow = allRows[1];

        console.log



        const newRow = this.renderer.createElement('tr');
        const text = this.renderer.createText('gggggggggggggggggggggggggggggggggggggggggggkkk!');

      
        this.renderer.appendChild(newRow, text);
        // this.renderer.appendChild(this.el.nativeElement, newRow);
        
  
        this.renderer.insertBefore(parent , newRow, targetRow);

      
      
      }
    })

    
    
    

  } //ngOnInit




}  //###########################################################################################################################################
// #############################################################################################################################################



/* const parent = this.el.nativeElement.parentNode;
    const currentRow = this.el.nativeElement;
    const currentRowChildren = currentRow.childNodes;
    const currentRowMonth = currentRowChildren[6].textContent;

    
    const nextRow = this.renderer.nextSibling(currentRow);;
    const nextRowChildren = nextRow.childNodes;
    const nextRowMonth = nextRowChildren[6].textContent;

    console.log('this is nextRowChildren : ' , nextRowChildren);
    console.log('this is nextRow month : ' , nextRowMonth);
 */

     /*  
    const newRow = this.renderer.createElement('tr');
    const text = this.renderer.createText('gggggggggggggggggggggggggggggggggggggggggggggggggkkkkkkkkkkkkkkkkkkkkk!');

      
    this.renderer.appendChild(newRow, text);
    // this.renderer.appendChild(this.el.nativeElement, newRow);
  
      //  this.renderer.insertBefore(parent, div, currentr);
      console.log('this is currentrow moth : ' , currentRowMonth)
      console.log('this is nexttrow moth : ' , nextRowMonth)

    if(currentRowMonth !== nextRowMonth) {
      this.renderer.insertBefore(parent , newRow, nextRow);
    } */

