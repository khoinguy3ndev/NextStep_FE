import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useRegister } from '../model/register.model'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Link } from '@tanstack/react-router'

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(6),
  password: z.string().min(6),
})

export function RegisterForm() {
  const { register, error, loading } = useRegister()

  const form = useForm({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },

    validators: {
      onSubmit: ({ value }) => {
        const result = registerSchema.safeParse(value)

        if (!result.success) {
          return result.error.flatten().fieldErrors
        }
      },
    },

    onSubmit: async ({ value }) => {
      await register(value)
    },
  })

  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full'>
      <div className="flex gap-4 mb-8 w-full align-items-center justify-center">
        <div className='flex'>
          <div className='flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 11 3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></div>
          <div className="ml-4 flex items-center justify-center">
            <h1 className="text-4xl font-medium">Todo</h1>
          </div>
        </div>
      </div>
      <Card className="w-full max-w-sm flex flex-col gap-6">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <CardContent>
            <div className="flex flex-col gap-6 mb-4">

              {/* Email */}
              <form.Field name="email">
                {(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={field.state.value}
                      onChange={(e) => field.setValue(e.target.value)}
                    />
                    {field.state.meta.errors?.[0] && (
                      <p className="text-sm text-red-500">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Name */}
              <form.Field name='name'>
                {(field) => (
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor={field.name}>Name</Label>
                    </div>
                    <Input 
                      id={field.name}
                      type="text" 
                      placeholder="Your Name" 
                      required
                      value={field.state.value} 
                      onChange={(e) => field.setValue(e.target.value)} 
                    />
                  </div>
                )}
              </form.Field>

              {/* Password */}
              <form.Field name='password'>
                {(field) => (
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor={field.name}>Password</Label>
                    </div>
                    <Input 
                      id={field.name} 
                      type="password" 
                      placeholder="••••••••" 
                      required 
                      value={field.state.value} 
                      onChange={(e) => field.setValue(e.target.value)} 
                    />
                    {field.state.meta.errors?.[0] && (
                      <p className="text-sm text-red-500">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* General error */}
              {error && (
                <div className="text-sm text-red-500">
                  Registration failed
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              Sign Up
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
