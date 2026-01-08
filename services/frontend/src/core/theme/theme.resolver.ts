import { CSSVariablesResolver } from '@mantine/core'

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--quazex-sizing-width': '1680px',
  },
  light: {
    '--quazex-footer-bg': theme.colors.gray[0],
  },
  dark: {
    '--quazex-footer-bg': theme.colors.gray[6],
  },
})
