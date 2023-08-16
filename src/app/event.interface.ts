import { Category } from "./category.interface";
export interface Event {
  id: number;
  title: string;
  location: string | null;
  organizer: string;
  start: string;
  end: string;
  status: "Free" | "Busy" | "Tentative";
  allday: boolean;
  webpage: string | null;
  imageurl: string | null;
  categories: Category[];
  extra: string | null;
}
