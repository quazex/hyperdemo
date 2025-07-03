import { style } from '@vanilla-extract/css';

export const CounterStyles = style({
    position: 'fixed',
    top: 20,
    right: 20,
    background: 'white',
    color: 'black',
    padding: 10,
    borderRadius: 8,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    zIndex: 10000,
});
