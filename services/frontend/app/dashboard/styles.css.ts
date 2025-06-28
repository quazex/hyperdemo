import { vars } from '@theme';
import { style } from '@vanilla-extract/css';

export const styles = {
    Main: style({
        maxWidth: 1680,
        display: 'flex',
        flexDirection: 'column',
        rowGap: vars.spacing.sm,
        margin: '0 auto',
        padding: vars.spacing.sm,
    }),
};
