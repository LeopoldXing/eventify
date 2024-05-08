"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from 'zod';
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {eventFormSchema} from "@/lib/validator";
import CategoryDropdown from "@/components/form/element/CategoryDropdown";
import React, {useState} from "react";
import {Textarea} from "@/components/ui/textarea"
import FileUploader from "@/components/form/element/FileUploader";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Checkbox} from "@/components/ui/checkbox"
import {IEvent} from "@/lib/database/models/event.model";
import {eventDefaultValues} from "@/constants";
import {useUploadThing} from "@/utils/uploadthing/uploadthing-utils";
import {handleError} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {createEvent} from "@/lib/actions/event.actions";

type EventFormProps = {
  userId: string,
  type: "create" | "update",
  event?: IEvent,
  eventId?: string
}

const EventForm = ({userId, type, event, eventId}: EventFormProps) => {
  const router = useRouter();

  const initialValues = event && type === 'update' ? {
    ...event,
    startDateTime: new Date(event.startDateTime),
    endDateTime: new Date(event.endDateTime)
  } : eventDefaultValues;

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues
  })

  const {startUpload} = useUploadThing("imageUploader");

  const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
    let uploadedImageUrl = values.imageUrl;

    if (Array.isArray(fileList) && fileList.length > 0) {
      const uploadedImages = await startUpload(fileList);
      if (!uploadedImages) {
        return;
      }
      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "create") {
      try {
        const newEvent = await createEvent({
          event: {...values, imageUrl: uploadedImageUrl},
          userId,
          path: "/profile"
        });
        if (newEvent) {
          form.reset();
          alert(`新 event id -> ${newEvent._id}`);
          router.push(`/events/${newEvent._id}`);
        }
      } catch (e) {
        handleError(e);
      }
    }

    console.log(values)
  }

  /*  manage file array  */
  const [fileList, setFileList] = useState<File[]>([]);

  /*  manage date picker  */
  const [startDate, setStartDate] = useState<Date>(new Date());

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

            <FormField control={form.control} name="categoryId" render={({field}) => (
                <FormItem className="w-full">
                  <FormControl>
                    <CategoryDropdown onChangeHandler={field.onChange} value={field.value}/>
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
                      <FormField control={form.control} name="isFree" render={({field}) => (
                          <FormItem>
                            <FormControl>
                              <div className="px-6 py-4 flex items-center justify-center overflow-hidden border-none rounded-lg bg-gray-100 focus:outline-none
                                              focus-visible:ring-transparent focus:ring-transparent !important">
                                <label htmlFor="isFree"
                                       className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                  Free Ticket
                                </label>
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
