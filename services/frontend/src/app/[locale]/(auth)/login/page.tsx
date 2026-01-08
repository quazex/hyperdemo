'use client'

import { Button, PasswordInput, Stack, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { JSX, useState } from 'react'
import Validators from 'validator'
import { useRouter } from '@/i18n/navigation'
import { LoginAction } from './action'
import { TFieldsLogin } from './types'

export default function LoginPage(): JSX.Element {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const formFields = useForm<TFieldsLogin>({
    initialValues: {
      username: 'emilys',
      password: 'emilyspass',
    },
    validate: {
      username: (value) => Validators.isEmail(value),
      password: (value) => Validators.isStrongPassword(value),
    },
  })

  const inputUsernameProps = formFields.getInputProps('username')
  const inputPasswordProps = formFields.getInputProps('password')

  const submitHandler = async (values: TFieldsLogin): Promise<void> => {
    setLoading(true)
    const result = await LoginAction(values)

    setLoading(false)

    if (result.status === true) {
      router.replace('/')
    }
  }

  const onSubmit = formFields.onSubmit(submitHandler)

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Title order={1}>Login</Title>
        <TextInput
          label="Username"
          placeholder="example@mail.com"
          value={inputUsernameProps.value}
          onChange={inputUsernameProps.onChange}
          onFocus={inputUsernameProps.onFocus}
          onBlur={inputUsernameProps.onBlur}
          error={inputUsernameProps.error}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={inputPasswordProps.value}
          onChange={inputPasswordProps.onChange}
          onFocus={inputPasswordProps.onFocus}
          onBlur={inputPasswordProps.onBlur}
          error={inputPasswordProps.error}
        />
        <Button
          type="submit"
          disabled={formFields.submitting}
          loading={loading}
        >
          Login
        </Button>
      </Stack>
    </form>
  )
}
