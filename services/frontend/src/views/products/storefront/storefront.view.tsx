import { Center, Grid, GridCol, Rating, Stack, Title } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { ProductAnchor, ProductsPrices } from '@/views/products'
import { TProductsStorefront } from './storefront.types'

export const ProductsStorefront: FC<TProductsStorefront> = (props) => (
  <Grid columns={24}>
    {props.items.map((product) => {
      const href = `${props.href}/${product.id}`

      return (
        <GridCol
          key={product.id}
          span={{
            xs: 8,
            md: 6,
            lg: 4,
          }}
        >
          <ProductAnchor href={href} c="black" underline="never">
            <Stack gap="xs">
              <Center>
                <Image
                  width={300}
                  height={300}
                  src={product.thumbnail}
                  alt={product.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </Center>
              <Title order={4}>{product.title}</Title>
              <Rating size="sm" value={product.rating} readOnly={true} />
              <ProductsPrices
                locale={props.locale}
                discount={product.discountPercentage}
                price={product.price}
              />
            </Stack>
          </ProductAnchor>
        </GridCol>
      )
    })}
  </Grid>
)
