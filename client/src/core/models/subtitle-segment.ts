import { Time } from "./time";

export interface SubtitleSegment {
  id: number;
  startTime: Time;
  endTime: Time;
  text: string;
}