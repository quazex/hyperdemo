'use client'

import { ActionIcon, CloseButton, Input } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconSearch } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useQueryStates } from 'nuqs'
import { FC, MouseEventHandler, useEffect } from 'react'
import { SearchSchema, serialize } from '@/core/url'
import { useRouter } from '@/i18n/navigation'

/**
 * Поле поиска для шапки витрины
 */
export const MainSearch: FC = () => {
  const i18n = useTranslations('Header')

  const router = useRouter()

  const [state, setState] = useQueryStates(SearchSchema, {
    shallow: false,
  })

  const formFields = useForm({
    mode: 'controlled',
    initialValues: {
      search: state.search,
    },
  })

  const onSubmit = formFields.onSubmit((values) => {
    const query = serialize({
      currency: state.currency,
      search: values.search,
      page: 1,
    })
    router.push(`/${query}`)
  })

  const onReset: MouseEventHandler<HTMLButtonElement> = () => {
    setState({
      search: '',
      page: 1,
    })
    formFields.reset()
  }

  useEffect(() => {
    formFields.setValues({
      search: state.search,
    })
  }, [
    state.search,
  ])

  const formSearchProps = formFields.getInputProps('search')

  const textPlaceholder = i18n('search.placeholder')
  const textClear = i18n('search.clear')
  const textSubmit = i18n('search.submit')

  return (
    <form onSubmit={onSubmit}>
      <Input
        placeholder={textPlaceholder}
        value={formSearchProps.value}
        onChange={formSearchProps.onChange}
        onFocus={formSearchProps.onFocus}
        onBlur={formSearchProps.onBlur}
        error={formSearchProps.error}
        leftSectionPointerEvents="all"
        leftSection={(
          <ActionIcon
            size="sm"
            type="submit"
            variant="transparent"
            aria-label={textSubmit}
          >
            <IconSearch />
          </ActionIcon>
        )}
        rightSectionPointerEvents="all"
        rightSection={(
          <CloseButton
            aria-label={textClear}
            onClick={onReset}
            style={{
              display: formSearchProps.value ? undefined : 'none',
            }}
          />
        )}
      />
    </form>
  )
}
