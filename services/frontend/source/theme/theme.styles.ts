'use client';

import { Anchor, Button, Drawer, MenuDropdown, Paper, Radio, Title, createTheme } from '@mantine/core';

export const theme = createTheme({
    components: {
        Paper: Paper.extend({
            defaultProps: {
                p: 'md',
                shadow: 'none',
                withBorder: false,
            },
        }),
        DrawerRoot: Drawer.Root.extend({
            defaultProps: {
                position: 'right',
                shadow: 'md',
                padding: 'xl',
            },
        }),
        DrawerOverlay: Drawer.Overlay.extend({
            defaultProps: {
                styles: {
                    overlay: {
                        backgroundColor: 'var(--mantine-color-drawer-overlay)',
                    },
                },
            },
        }),
        DrawerContent: Drawer.Content.extend({
            defaultProps: {
                p: 0,
                styles: {
                    content: {
                        backgroundColor: 'var(--mantine-color-drawer-content)',
                    },
                },
            },
        }),
        Anchor: Anchor.extend({
            defaultProps: {
                fw: 'bold',
            },
        }),
        Button: Button.extend({
            defaultProps: {
                size: 'md',
            },
        }),
        MenuDropdown: MenuDropdown.extend({
            defaultProps: {
                styles: {
                    dropdown: {
                        backgroundColor: 'var(--mantine-color-body)',
                    },
                },
            },
        }),
        Radio: Radio.extend({
            defaultProps: {
                styles: {
                    labelWrapper: {
                        fontSize: 'inherit',
                    },
                },
            },
        }),
        RadioGroup: Radio.Group.extend({
            defaultProps: {
                styles: {
                    description: {
                        fontSize: 'inherit',
                    },
                },
            },
        }),
        Title: Title.extend({
            defaultProps: {
                order: 3,
            },
        }),
    },
});
