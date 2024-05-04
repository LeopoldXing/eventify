import {z} from "zod";

export const eventFormSchema = z.object({
  username: z.string().min(4, "Username is too short").max(16, "Username can not be longer than 16 characters"),
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
