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
};

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
};

type User = {
    // Define the User type here based on its properties
};
