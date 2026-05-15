import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { OuterPage } from '@/components/layout/outer-page'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/hooks/use-auth'
import { api } from '@/lib/api'
import { createLoginSchema, type LoginSchemaType } from '@/lib/schema/login'
import type { ApiError } from '@/types'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { setUser, setToken } = useAuth()

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(createLoginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = form

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const response = await api('/login', {
        method: 'POST',
        body: {
          username: data.username,
          password: data.password
        }
      })
      const body = await response.json()

      if (response.ok) {
        setUser(body.user)
        setToken(body.token)
        navigate('/')
        return
      }

      const error = body as ApiError
      toast.error(error.message)
    } catch {
      toast.error('Unable to connect to server')
    }
  }

  return (
    <OuterPage>
      <div className="mb-6 text-center">
        <h4 className="mb-3 font-bold text-2xl uppercase tracking-tight">
          Sign In
        </h4>
        <p className="text-muted-foreground text-sm">
          Your adventure continues
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Steve"
                  aria-invalid={fieldState.invalid}
                  aria-labelledby={`${field.name}-label`}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  aria-invalid={fieldState.invalid}
                  aria-labelledby={`${field.name}-label`}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="text-center">
          <Link
            to="/recovery"
            className="font-bold text-sm underline underline-offset-4 transition-colors hover:text-primary"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="mt-2 w-full uppercase"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting && <Spinner />}
          {isSubmitting ? 'Loading...' : 'Sign In'}
        </Button>

        <p className="text-center text-muted-foreground text-sm">
          No account?{' '}
          <Link
            to="/register"
            className="font-bold text-foreground underline underline-offset-4"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </OuterPage>
  )
}
