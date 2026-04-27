export type EventCategory = "exercise" | "social" | "health" | "learning" | "arts" | "food";

export type Language = "en" | "zh" | "ms" | "ta";

export interface CommunityEvent {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  venueAddress: string;
  region: Region;
  isFree: boolean;
  price?: string;
  organizer: string;
  contactNumber?: string;
  imageUrl?: string;
  isAccessible: boolean;
  tags: string[];
  eventUrl?: string;
  registered: number;
  capacity: number;
  transport: {
    nearestMrt: string;
    mrtLine: string;
    mrtLineColor: string;
    walkFromMrt: string;
    busServices: string[];
    nearestBusStop: string;
    directions?: string;
  };
}

export type Region = "north" | "south" | "east" | "west" | "central";

export interface Filters {
  category: EventCategory | "all";
  region: Region | "all";
  freeOnly: boolean;
  searchQuery: string;
}
