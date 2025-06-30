'use client';

import { CSSVariablesResolver, rgba } from '@mantine/core';
import { themeToVars } from '@mantine/vanilla-extract';
import { theme } from './theme.styles';

export const vars = themeToVars(theme);

export const resolver: CSSVariablesResolver = () => ({
    variables: {},
    light: {
        '--mantine-color-background': vars.colors.gray[1],
        '--mantine-color-drawer-overlay': rgba(vars.colors.gray[4], 0.95),
        '--mantine-color-drawer-content': vars.colors.gray[2],
        '--mantine-color-border': vars.colors.gray[1],
        '--mantine-color-label': vars.colors.gray[6],
        '--mantine-color-table-header': vars.colors.gray[1],
        '--mantine-color-text-unavailable': vars.colors.gray[4],
        '--mantine-color-danger': vars.colors.red.filled,
        '--mantine-color-warning': vars.colors.orange.filled,
        '--mantine-color-success': vars.colors.green.filled,
        '--mantine-color-secondary': vars.colors.grape.filled,
    },
    dark: {
        '--mantine-color-background': vars.colors.dark[8],
        '--mantine-color-drawer-overlay': rgba(vars.colors.dark[7], 0.95),
        '--mantine-color-drawer-content': vars.colors.dark[8],
        '--mantine-color-border': vars.colors.dark[6],
        '--mantine-color-label': vars.colors.dark[2],
        '--mantine-color-table-header': vars.colors.dark[6],
        '--mantine-color-text-unavailable': vars.colors.dark[3],
        '--mantine-color-danger': vars.colors.red[4],
        '--mantine-color-warning': vars.colors.orange[4],
        '--mantine-color-success': vars.colors.green[4],
        '--mantine-color-secondary': vars.colors.grape[4],
    },
});
