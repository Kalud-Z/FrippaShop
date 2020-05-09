import { trigger, style, transition, animate } from '@angular/animations';


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
    // transition(':enter' , [
    //     style({
    //         transform : 'scale(0.5)'
    //     }),
    //     animate('1.5s')
    //   ]),
  
    //   transition(':leave' , animate('.5s', style({
    //       opacity : 0
    //   })))


      transition(':enter' , [
        style({
            opacity : 0
        }),
        animate('.5s')
      ]),
  
      transition(':leave' , animate('.5s', style({
          opacity : 0
      })))

])




