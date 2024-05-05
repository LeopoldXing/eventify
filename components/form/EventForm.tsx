"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {eventFormSchema} from "@/lib/validator";
import CategoryDropdown from "@/components/form/element/CategoryDropdown";
import React, {useState} from "react";
import {ICategory} from "@/lib/database/models/category.model";
import {Textarea} from "@/components/ui/textarea"
import FileUploader from "@/components/form/element/FileUploader";


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

  /*  manage category list  */
  const [categoryList, setCategoryList] = useState<ICategory[]>([])

  /*  manage file array  */
  const [fileList, setFileList] = useState<File[]>([]);

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
            <FormField control={form.control} name="title" render={({field}) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Event title" {...field} className="form-input"/>
                  </FormControl>
                  <FormMessage className="form-description"/>
                </FormItem>
            )}/>

            <FormField control={form.control} name="description" render={({field}) => (
                <FormItem className="w-full">
                  <FormControl>
                    <CategoryDropdown categoryList={categoryList} onChangeHandler={field.onChange} value={field.value}/>
                  </FormControl>
                  <FormMessage className="form-description"/>
                </FormItem>
            )}/>
          </div>
          <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
            <FormField control={form.control} name="description" render={({field}) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea placeholder="Description" {...field} className="h-72 form-input"/>
                  </FormControl>
                  <FormMessage className="form-description"/>
                </FormItem>
            )}/>
            <FormField control={form.control} name="imageUrl" render={({field}) => (
                <FormItem className="w-full">
                  <FormControl>
                    <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFileList={setFileList}/>
                  </FormControl>
                  <FormMessage className="form-description"/>
                </FormItem>
            )}/>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
  );
};

export default EventForm;
