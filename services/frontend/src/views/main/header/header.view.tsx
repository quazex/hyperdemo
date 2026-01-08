import {
  Anchor,
  Grid,
  GridCol,
  Group,
  Input,
} from '@mantine/core'
import { IconWorld } from '@tabler/icons-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { JSX, Suspense } from 'react'
import { HeaderMenu } from './header.menu'
import { MainSearch } from './header.search'
import { THeadersProps } from './header.types'

export const MainHeader = async (props: THeadersProps): Promise<JSX.Element> => {
  const cookiesStorage = await cookies()
  const isAuthenticated = cookiesStorage.has('refresh_token')

  const headerI18n = await getTranslations('Header')
  const metaI18n = await getTranslations('Metadata')

  const logoAlt = metaI18n('title')
  const loginText = headerI18n('links.login')
  const profileText = headerI18n('links.profile')

  const linkText = isAuthenticated ? profileText : loginText
  const linkHref = isAuthenticated ? '/profile' : '/login'

  return (
    <header className={props.classNames?.wrapper}>
      <Grid
        className={props.classNames?.content}
        align="center"
        justify="space-between"
        pl="md"
        pr="md"
        pt="sm"
        pb="sm"
      >
        <GridCol span="content">
          <Anchor href="/" display="flex">
            <Image width={28} height={28} src="/logo-white.svg" alt={logoAlt} />
          </Anchor>
        </GridCol>

        <GridCol span="auto" maw={580}>
          <Suspense fallback={<Input disabled={true} />}>
            <MainSearch />
          </Suspense>
        </GridCol>

        <GridCol span="content">
          <Group>
            <Suspense fallback={<IconWorld />}>
              <HeaderMenu />
            </Suspense>
            <Anchor c="white" fw="bold" href={linkHref}>{linkText}</Anchor>
          </Group>
        </GridCol>
      </Grid>
    </header>
  )
}
