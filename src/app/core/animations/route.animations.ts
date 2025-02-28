import {
  animate,
  query,
  style,
  transition,
  trigger,
  stagger,
  sequence
} from '@angular/animations';
import { AnimationsService } from './animations.service';

export const ROUTE_ANIMATIONS_ELEMENTS = 'route-animations-elements';

const STEPS_ALL: any[] = [
  query(':enter > *', style({ opacity: 0 }), { // , position: 'fixed'
    optional: true
  }),
  query(':enter .' + ROUTE_ANIMATIONS_ELEMENTS, style({ opacity: 0 }), {
    optional: true
  }),
  sequence([
    query(
      ':leave > *',
      [
        style({ display : 'none' }), // opacity: 0 transform: 'translateY(0%)',
        animate(
          '0s ease-in-out',
          style({ opacity: 0 }) // transform: 'translateY(-3%)',
        ),
        // style({ position: 'fixed' })
      ],
      { optional: true }
    ),
    query(
      ':enter > *',
      [
        style({
          // transform: 'translateY(-3%)',
          opacity: 0,
          // position: 'static'
        }),
        animate(
          '0.5s ease-in-out',
          style({ opacity: 1 }) // transform: 'translateY(0%)',
        )
      ],
      { optional: true }
    )
  ]),
  query(
    ':enter .' + ROUTE_ANIMATIONS_ELEMENTS,
    stagger(75, [
      style({ opacity: 0 }), // transform: 'translateY(10%)',
      animate(
        '0.5s ease-in-out',
        style({ opacity: 1 }) // transform: 'translateY(0%)',
      )
    ]),
    { optional: true }
  )
];
const STEPS_NONE: any[] = [];
const STEPS_PAGE = [STEPS_ALL[0], STEPS_ALL[2]];
const STEPS_ELEMENTS = [STEPS_ALL[1], STEPS_ALL[3]];

export const routeAnimations = trigger('routeAnimations', [
  transition(isRouteAnimationsAll, STEPS_ALL),
  transition(isRouteAnimationsNone, STEPS_NONE),
  transition(isRouteAnimationsPage, STEPS_PAGE),
  transition(isRouteAnimationsElements, STEPS_ELEMENTS)
]);

export function isRouteAnimationsAll() {
  return AnimationsService.isRouteAnimationsType('ALL');
}

export function isRouteAnimationsNone() {
  return AnimationsService.isRouteAnimationsType('NONE');
}

export function isRouteAnimationsPage() {
  return AnimationsService.isRouteAnimationsType('PAGE');
}

export function isRouteAnimationsElements() {
  return AnimationsService.isRouteAnimationsType('ELEMENTS');
}
