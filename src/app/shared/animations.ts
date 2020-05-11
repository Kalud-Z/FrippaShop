import { trigger, style, transition, animate, query, group, stagger, keyframes } from '@angular/animations';


export const routeSlideStateTrigger = trigger('routeSlideState', [
    transition(':enter' , [
        query('.table' , [
            style({
                opacity : 0
            }),
            animate('2.25s 2.25s' , style({
                opacity : 1
            }))
        ])//query
    ]), //transition
  
    transition(':leave' , [
        query('.table' , [
            animate('2.25s' , style({
                opacity : 0
            }))
        ])//query
    ])
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




// export const listStateTrigger = trigger('listState', [
//     transition('* => *', [
//       query(':enter', [
//         style({
//           opacity : 0,
//           transform : 'translateX(-100%)',
//         }),
//         stagger(1000 , [ 
//           animate('1s', keyframes([
//             style({
//               opacity : 1,
//               transform : 'translateX(10%)',
//               offset : 0.5
//             }),
//             style({
//               opacity : 1,
//               transform : 'translateX(0)',
//               offset : 1
//             })
//           ]))
//         ])
       
//       ], {optional : true})//query
//     ])//transition
//   ]);
  



