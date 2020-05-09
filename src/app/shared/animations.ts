import { trigger, style, transition, animate, query, group } from '@angular/animations';


export const routeSlideStateTrigger = trigger('routeSlideState', [
    transition(':enter' , [
        style({
            opacity : 0
        }),
        animate('.5s .5s')
      ]),
  
      transition(':leave' , animate('.5s', style({
          opacity : 0
      })))
])




export const createNewTrigger = trigger('createNewState', [
    transition(':enter' , [
            query('.form' , [
                style({
                    transform : 'scale(0.85)'
                    // opacity : 0
                }),
                animate(300 , style({
                    transform : 'scale(1.05)'
                })),
                animate(100)
            ]), //query
      ]), //transition
  
    //   #############################################################################

    transition(':leave', animate('.25s', style({
        opacity : 0
    })))//transition

]);//createNewTrigger




export const popupWindowTrigger = trigger('popupWindowState', [
    transition(':enter' , [
            query('.popup__body' , [
                style({
                    transform : 'translateX(-10px)'
                }),
                animate(100 , style({
                    transform : 'translateX(8px)'
                })),
                animate(100 , style({
                    transform : 'translateX(-6px)'
                })),
                animate(100)
            ]), //query
      ]), //transition
  
    //   #############################################################################



]);//createNewTrigger




