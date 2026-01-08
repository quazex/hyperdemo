'use client'

import { AspectRatio, Stack, UnstyledButton } from '@mantine/core'
import Image from 'next/image'
import { FC, useState } from 'react'
import styles from './images.module.css'
import { TProductsImages } from './images.types'

export const ProductsImages: FC<TProductsImages> = (props) => {
  const [active, setActive] = useState(0)
  const activeImage = props.src[active]

  return (
    <div className={styles.images_grid}>
      <Stack>
        {props.src.map((src, index) => {
          const onClick = () => setActive(index)
          return (
            <UnstyledButton key={src} onClick={onClick}>
              <AspectRatio ratio={1}>
                <Image
                  width={120}
                  height={120}
                  src={src}
                  alt={props.alt}
                  priority={true}
                />
              </AspectRatio>
            </UnstyledButton>
          )
        })}
      </Stack>
      <AspectRatio ratio={1} maw="100%">
        <Image
          width={1000}
          height={1000}
          src={activeImage}
          alt={props.alt}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </AspectRatio>
    </div>
  )
}
