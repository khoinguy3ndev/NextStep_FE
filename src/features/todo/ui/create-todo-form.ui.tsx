import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useCreateTodoModel } from "../model/create-todo.model";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";

const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
})

export function CreateTodoForm() {
  console.log("CreateTodoForm re-render");
  const { createTodo, loading } = useCreateTodoModel();

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = createTodoSchema.safeParse(value)
        if (!result.success) {
          return result.error.flatten().fieldErrors
        }
      },
    },
    onSubmit: async ({ value }) => {
      try {
        await createTodo({
          title: value.title,
          description: value.description || '',
          startDate: new Date(value.startDate).toISOString(),
          endDate: new Date(value.endDate).toISOString(),
        });
        form.reset();
      } catch (error) {
        console.error(error);
      }
    },
  })

  return (
    <Card className="w-full bg-card">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <CardContent className="space-y-4 pt-6 pb-4">
          <div className="space-y-2">
            <form.Field name="title">
              {(field) => {
                console.log("Field title re-render", field.state.value);
                return (
                <>
                  <Input
                    placeholder="Add a new todo..."
                    value={field.state.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    className="h-12"
                  />
                  {field.state.meta.errors?.[0] && (
                    <p className="text-sm text-red-500">{field.state.meta.errors[0]}</p>
                  )}
                </>
              )}}
            </form.Field>
          </div>
          <div className="space-y-2">
            <form.Field name="description">
              {(field) => (
                <>
                  <Input
                    placeholder="Add description (optional)..."
                    value={field.state.value}
                    onChange={(e) => field.setValue(e.target.value)}
                  />
                </>
              )}
            </form.Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <form.Field name="startDate">
                {(field) => {
                  console.log("Field startDate re-render", field.state.value);
                  return (
                  <>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={field.state.value}
                      onChange={(e) => field.setValue(e.target.value)}
                    />
                    {field.state.meta.errors?.[0] && (
                      <p className="text-sm text-red-500">{field.state.meta.errors[0]}</p>
                    )}
                  </>
                )}}
              </form.Field>
            </div>
            <div className="space-y-2">
              <form.Field name="endDate">
                {(field) => {
                  console.log("Field endDate re-render", field.state.value);
                  return (
                  <>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={field.state.value}
                      onChange={(e) => field.setValue(e.target.value)}
                    />
                    {field.state.meta.errors?.[0] && (
                      <p className="text-sm text-red-500">{field.state.meta.errors[0]}</p>
                    )}
                  </>
                )}}
              </form.Field>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button type="submit" disabled={loading} className="w-full sm:w-auto min-w-[120px]">
            + Add Todo
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
