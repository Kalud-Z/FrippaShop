import { trigger, style, transition, animate } from '@angular/animations';


export const routeSlideStateTrigger = trigger('routeSlideState', [
    // transition(':enter' , [
    //   style({
    //     transform : 'translateY(-100%)',
    //     opacity : 0
    //   }),
    //   animate(3000)
    // ]),

    // transition(':leave' , animate(3000, style({
    //     transform : 'translateY(100%)',
    //     opacity : 0
    // })))


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




