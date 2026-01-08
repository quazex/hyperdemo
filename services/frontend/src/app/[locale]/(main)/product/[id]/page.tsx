import {
  Breadcrumbs,
  Grid,
  GridCol,
  Rating,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import axios from 'axios'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { JSX } from 'react'
import { TProductsItem, TProductsList } from '@/core/entities'
import { routing } from '@/i18n/routing'
import {
  ProductAnchor,
  ProductsFeatures,
  ProductsImages,
  ProductsPrices,
  ProductsStorefront,
  TProductsFeatures,
} from '@/views/products'
import { TProductParams, TProductProps } from './types'

/**
 * Функция для генерации статической страницы
 */
export async function generateStaticParams() {
  const productsList = await axios.request<TProductsList>({
    method: 'GET',
    baseURL: process.env.QUAZEX_PRIVATE_BACKEND_URL,
    url: 'products',
    timeout: 2_000,
    params: {
      limit: 200,
      skip: 0,
    },
  })

  const staticParams = routing.locales.flatMap<TProductParams>((locale) => productsList.data.products.map((p) => ({
    locale,
    id: p.id.toString(),
  })))

  return staticParams
}

/**
 * Страница карточки товара
 */
export default async function ProductPage(props: TProductProps): Promise<JSX.Element> {
  const params = await props.params

  if (params.locale) {
    setRequestLocale(params.locale)
  }

  const i18n = await getTranslations('Products')

  const textTitles = {
    product: i18n('title'),
    related: i18n('related'),
  }

  const textFeatures = {
    brand: i18n('brand'),
    category: i18n('category'),
    warranty: i18n('warranty'),
    shipping: i18n('shipping'),
    availability: i18n('availability'),
    returning: i18n('returning'),
  }

  const product = await axios.request<TProductsItem>({
    method: 'GET',
    baseURL: process.env.QUAZEX_PRIVATE_BACKEND_URL,
    url: `products/${params.id}`,
    timeout: 2_000,
  })

  const related = await axios.request<TProductsList>({
    method: 'GET',
    baseURL: process.env.QUAZEX_PRIVATE_BACKEND_URL,
    url: `products/category/${product.data.category}`,
    timeout: 2_000,
    params: {
      limit: 6,
      skip: 0,
    },
  })

  const images = product.data.images.slice(0, 4)

  const features: TProductsFeatures[] = [{
    id: 'brand',
    label: textFeatures.brand,
    value: product.data.brand,
  }, {
    id: 'category',
    label: textFeatures.category,
    value: product.data.category,
  }, {
    id: 'warranty',
    label: textFeatures.warranty,
    value: product.data.warrantyInformation,
  }, {
    id: 'shipping',
    label: textFeatures.shipping,
    value: product.data.shippingInformation,
  }, {
    id: 'availability',
    label: textFeatures.availability,
    value: product.data.availabilityStatus,
  }, {
    id: 'returning',
    label: textFeatures.returning,
    value: product.data.returnPolicy,
  }]

  return (
    <Stack gap="lg">
      <Breadcrumbs>
        <ProductAnchor href="/">
          {textTitles.product}
        </ProductAnchor>
        <Text>{product.data.title}</Text>
      </Breadcrumbs>
      <Grid>
        <GridCol span={6}>
          <ProductsImages
            src={images}
            alt={product.data.title}
          />
        </GridCol>
        <GridCol span={4}>
          <Stack>
            <Title order={1}>{product.data.title}</Title>
            <Rating value={product.data.rating} readOnly={true} />
            <ProductsPrices
              locale={params.locale}
              discount={product.data.discountPercentage}
              price={product.data.price}
            />
            <Text>{product.data.description}</Text>
            <Stack>
              <Title order={3}>Features</Title>
              <ProductsFeatures features={features} />
            </Stack>
          </Stack>
        </GridCol>
      </Grid>
      <Stack>
        <Title order={2}>
          {textTitles.related}
        </Title>
        <ProductsStorefront
          locale={params.locale}
          items={related.data.products}
          href="/product"
        />
      </Stack>
    </Stack>
  )
}
