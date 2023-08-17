export interface EventCreateData {
  title: string;
  location?: string | null;
  organizer: string;
  start: string;
  end: string;
  status: "Free" | "Busy" | "Tentative";
  allday: boolean;
  webpage?: string | null;
  imagedata?: string | null;
  categories: { id: number }[];
  extra?: string | null;
}
