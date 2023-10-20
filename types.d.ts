// types/types.d.ts

export interface Event {
  id: string;
  title: string;
  details: string;
  location: string;
  organizers: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
  user: User;
  userId: string;
  attendees: Attendee[];
}

export interface Attendee {
  id: string;
  paid: boolean;
  amount_paid?: number;
  amount_due?: number;
  createdAt: Date;
  updatedAt: Date;
  event: Event;
  eventId: string;
  user: User;
  userId: string;
  registrantId: string;
}

type UserDetail = {
  name: string;
  email: string;
  status: string;
  Role: string;
  createdAt: string;
  imageUrl: string;
};

type HeroDetail = {
  heading: string;
  content: string;
  imageLink: string;
  mainButtonName: string?;
  secondaryButtonName: string?;
  showMainButton: boolean?;
  showSecondaryButton: boolean?;
  mainLink: string?;
  secondaryLink: string?;
};

type User = {
  // Define the User type here based on its properties
};
