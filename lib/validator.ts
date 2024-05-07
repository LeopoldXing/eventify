import {z} from "zod";
import {CheckedState} from "@radix-ui/react-checkbox";

export const eventFormSchema = z.object({
  title: z.string().min(4, "Title is too short").max(32, "Title can not be longer than 32 characters"),
  description: z.string().max(400, "Description can not be longer than 400 characters"),
  location: z.string().min(4, "Location is too short"),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url()
})
