import { MultilangText } from "@/types/common";

export type VideoDTO = {
  id: string;
  slug: string;
  title: MultilangText;
  description: MultilangText;
  subdescription: MultilangText;
  durationMinutes: number;
  order: number;
};
