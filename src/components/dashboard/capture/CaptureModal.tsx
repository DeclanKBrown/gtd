import React from 'react'
import ReactDOM from 'react-dom'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { captureSchema } from '@/lib/validations/captureSchema'
import { trpc } from '@/app/_trpc/Client'

interface CaptureModalProps {
  onClose: () => void
}

const CaptureModal = ({ onClose }: CaptureModalProps) => {
  const form = useForm<z.infer<typeof captureSchema>>({
    resolver: zodResolver(captureSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'TASK',
      status: 'INBOX',
    },
  })

  const { mutate: createTask } = trpc.createTask.useMutation({
    onSuccess: () => {
      onClose()
    },
    onError: (error) => {
      console.log(error)
    },
  })
  const { mutate: createProject } = trpc.createProject.useMutation({
    onSuccess: () => {
      onClose()
    },
    onError: (error) => {
      console.log(error)
    },
  })
  const { mutate: createReference } = trpc.createReference.useMutation({
    onSuccess: () => {
      onClose()
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const onSubmit = (values: z.infer<typeof captureSchema>) => {
    console.log(values)
    if (values.type === 'TASK') {
      createTask({
        data: {
          name: values.name,
          description: values.description,
          status: values.status,
        },
      })
    }
    if (values.type === 'PROJECT') {
      createProject({
        data: {
          name: values.name,
          description: values.description,
          status: values.status,
        },
      })
    }
    if (values.type === 'REFERENCE') {
      createReference({
        data: {
          name: values.name,
          description: values.description,
          status: values.status,
        },
      })
    }
    console.log('submitted')
  }

  const watchType = form.watch('type')

  React.useEffect(() => {
    if (watchType === 'TASK') {
      form.setValue('status', 'INBOX')
    } else if (watchType === 'PROJECT') {
      form.setValue('status', 'ACTIVE')
    } else if (watchType === 'REFERENCE') {
      form.setValue('status', 'ACTIVE')
    }
  }, [watchType, form.setValue])

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={onClose}
      ></div>
      <Card className="z-10 max-w-2xl pt-4">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid grid-cols-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="TASK">Task</SelectItem>
                            <SelectItem value="PROJECT">Project</SelectItem>
                            <SelectItem value="REFERENCE">Reference</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={
                          watchType === 'TASK'
                            ? 'INBOX'
                            : watchType === 'PROJECT'
                              ? 'ACTIVE'
                              : 'ACTIVE'
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {watchType === 'TASK' && (
                            <SelectGroup>
                              <SelectItem value="INBOX">Inbox</SelectItem>
                              <SelectItem value="SOMEDAY">Someday</SelectItem>
                              <SelectItem value="WAITING">Waiting</SelectItem>
                              <SelectItem value="NEXT_ACTION">
                                Next Action
                              </SelectItem>
                              <SelectItem value="DONE">Done</SelectItem>
                              <SelectItem value="DELEGATED">
                                Delegated
                              </SelectItem>
                              <SelectItem value="ELIMINATED">
                                Eliminated
                              </SelectItem>
                            </SelectGroup>
                          )}
                          {watchType === 'PROJECT' && (
                            <SelectGroup>
                              <SelectItem value="ACTIVE">Active</SelectItem>
                              <SelectItem value="NOT_STARTED">
                                Not Started
                              </SelectItem>
                              <SelectItem value="ARCHIVED">Archived</SelectItem>
                            </SelectGroup>
                          )}
                          {watchType === 'REFERENCE' && (
                            <SelectGroup>
                              <SelectItem value="ACTIVE">Active</SelectItem>
                              <SelectItem value="ARCHIVED">Archived</SelectItem>
                            </SelectGroup>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {watchType === 'REFERENCE' ? 'Url' : 'Description'}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Create
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>,
    document.body,
  )
}

export default CaptureModal
