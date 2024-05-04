"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {eventFormSchema} from "@/lib/validator";

type EventFormProps = {
  userId: string,
  type: "create" | "update"
}

const EventForm = ({userId, type}: EventFormProps) => {
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      imageUrl: '',
      startDateTime: new Date(),
      endDateTime: new Date(),
      categoryId: '',
      price: '',
      isFree: false,
      url: '',
    }
  })

  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
            <FormField control={form.control} name="title" render={({field}) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Event title" {...field}
                           className="form-input"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
            )}/>

            <FormField control={form.control} name="description" render={({field}) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Description" {...field} className="form-input"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
            )}/>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
  );
};

export default EventForm;