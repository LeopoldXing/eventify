"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {eventFormSchema} from "@/lib/validator";
import CategoryDropdown from "@/components/form/element/CategoryDropdown";
import React, {useState} from "react";
import {ICategory} from "@/lib/database/models/category.model";
import {Textarea} from "@/components/ui/textarea"
import FileUploader from "@/components/form/element/FileUploader";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Checkbox} from "@/components/ui/checkbox"

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

  /*  manage date picker  */
  const [startDate, setStartDate] = useState<Date>(new Date());

  // @ts-ignore
  // @ts-ignore
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
          <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
            <FormField control={form.control} name="location" render={({field}) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="px-6 flex items-center justify-center overflow-hidden border-none rounded-lg bg-gray-100 focus:outline-none
                                    focus-visible:ring-transparent focus:ring-transparent !important">
                      <Image src="/assets/icons/location-grey.svg" alt="calendar" width={24} height={24}/>
                      <Input placeholder="Event location or online" {...field} className="w-full form-input"/>
                    </div>
                  </FormControl>
                  <FormMessage className="form-description"/>
                </FormItem>
            )}/>
          </div>
          {/*  start date  */}
          <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
            <FormField control={form.control} name="startDateTime" render={({field}) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="px-6 py-4 flex items-center justify-center overflow-hidden border-none rounded-lg bg-gray-100 focus:outline-none
                                    focus-visible:ring-transparent focus:ring-transparent !important">
                      <Image src="/assets/icons/calendar.svg" alt="calendar" width={24} height={24} className="filter-grey"/>
                      <p className="ml-3 whitespace-nowrap text-grey-600">Start Date: </p>
                      <DatePicker selected={field.value} onChange={(date: Date) => field.onChange(date)} showTimeSelect timeInputLabel="Time:"
                                  dateFormat="MM/dd/yyyy h:mm aa" wrapperClassName="datePicker"/>
                    </div>
                  </FormControl>
                  <FormMessage className="form-description"/>
                </FormItem>
            )}/>
            {/*  end date  */}
            <FormField control={form.control} name="endDateTime" render={({field}) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="px-6 py-4 flex items-center justify-center overflow-hidden border-none rounded-lg bg-gray-100 focus:outline-none
                                    focus-visible:ring-transparent focus:ring-transparent !important">
                      <Image src="/assets/icons/calendar.svg" alt="calendar" width={24} height={24} className="filter-grey"/>
                      <p className="ml-3 whitespace-nowrap text-grey-600">End Date: </p>
                      <DatePicker selected={field.value} onChange={(date: Date) => field.onChange(date)} showTimeSelect timeInputLabel="Time:"
                                  dateFormat="MM/dd/yyyy h:mm aa" wrapperClassName="datePicker"/>
                    </div>
                  </FormControl>
                  <FormMessage className="form-description"/>
                </FormItem>
            )}/>
          </div>
          <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
            {/*  price  */}
            <FormField control={form.control} name="price" render={({field}) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="px-6 flex items-center justify-center overflow-hidden border-none rounded-lg bg-gray-100 focus:outline-none
                                    focus-visible:ring-transparent focus:ring-transparent !important">
                      <Image src="/assets/icons/dollar.svg" alt="dollar" width={24} height={24} className="filter-grey"/>
                      <Input type="number" placeholder="price" {...field} className="w-full form-input"/>
                      {/*  isFree checkbox  */}
                      <FormField control={form.control} name="price" render={({field}) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <div className="px-6 py-4 flex items-center justify-center overflow-hidden border-none rounded-lg bg-gray-100 focus:outline-none
                                              focus-visible:ring-transparent focus:ring-transparent !important">
                                <label htmlFor="isFree"
                                       className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                  Free Ticket
                                </label>
                                {/* @ts-ignore */}
                                <Checkbox id="isFree" onCheckedChange={field.onChange} checked={field.value}
                                          className="mr-2 h-5 w-5 border-2 border-primary-500"/>
                              </div>
                            </FormControl>
                            <FormMessage className="form-description"/>
                          </FormItem>
                      )}/>
                    </div>
                  </FormControl>
                  <FormMessage className="form-description"/>
                </FormItem>
            )}/>
            {/*  url  */}
            <FormField control={form.control} name="url" render={({field}) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center justify-center overflow-hidden border-none rounded-lg bg-gray-100 focus:outline-none">
                      <Image src="/assets/icons/link.svg" alt="link" width={24} height={24} className="ml-6"/>
                      <Input placeholder="URL" {...field} className="form-input"/>
                    </div>
                  </FormControl>
                  <FormMessage className="form-description"/>
                </FormItem>
            )}/>
          </div>

          <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="button col-span-2 w-full capitalize">
            {form.formState.isSubmitting ? "Submitting..." : `${type} Event`}
          </Button>
        </form>
      </Form>
  );
};

export default EventForm;
