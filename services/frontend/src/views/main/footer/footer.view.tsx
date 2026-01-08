import { Anchor, Grid, GridCol, Stack, Text, Title } from '@mantine/core'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FC } from 'react'
import { TFooterProps } from './footer.types'

export const MainFooter: FC<TFooterProps> = async (props) => {
  const metaI18n = await getTranslations('Metadata')
  const footerI18n = await getTranslations('Footer')

  const textLogoAlt = metaI18n('title')
  const textDescription = metaI18n('description')

  const blocks = [{
    title: footerI18n('market'),
    links: [{
      label: footerI18n('shirts'),
      href: '/?search=shirt',
    }, {
      label: footerI18n('dresses'),
      href: '/?search=dress',
    }, {
      label: footerI18n('glasses'),
      href: '/?search=glasses',
    }],
  }, {
    title: footerI18n('information'),
    links: [{
      label: footerI18n('warranty'),
      href: '/#warranty',
    }, {
      label: footerI18n('shipping'),
      href: '/#shipping',
    }, {
      label: footerI18n('returning'),
      href: '/#returning',
    }],
  }, {
    title: footerI18n('company'),
    links: [{
      label: footerI18n('legal'),
      href: '/#legal',
    }, {
      label: footerI18n('jobs'),
      href: '/#jobs',
    }, {
      label: footerI18n('contacts'),
      href: '/#contacts',
    }],
  }]

  return (
    <footer className={props.classNames?.wrapper}>
      <Grid
        className={props.classNames?.content}
        align="flex-start"
        justify="space-between"
        pl="md"
        pr="md"
        pt="xl"
        pb="xl"
      >
        <GridCol span={{ base: 12, md: 6 }}>
          <Stack w={{ xs: '100%', md: '80%' }}>
            <Anchor href="/" display="flex">
              <Image width={42} height={42} src="/logo-colored.svg" alt={textLogoAlt} />
            </Anchor>
            <Text size="sm" c="gray">{textDescription}</Text>
          </Stack>
        </GridCol>

        {blocks.map((block) => (
          <GridCol key={block.title} span={{ base: 6, xs: 4, md: 2 }}>
            <Stack gap="sm">
              <Title order={4}>{block.title}</Title>
              <Stack gap={2}>
                {block.links.map((link) => (
                  <Anchor key={link.label} href={link.href} c="gray">
                    {link.label}
                  </Anchor>
                ))}
              </Stack>
            </Stack>
          </GridCol>
        ))}
      </Grid>
    </footer>
  )
}
