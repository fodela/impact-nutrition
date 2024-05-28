'use client'
import { EventFormProps } from "@/components/Dashboard/DashboardEvent/AddEventForm";
import { Event } from "@prisma/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getEvents = createAsyncThunk( "events/getEvents", async (data, thunkApi) => {
    let headersList = {
        Accept: "*/*",
    };

    let reqOptions = {
        url: `/api/events`,
        method: "GET",
        headers: headersList,
    };
    try {
        let response = await axios.request(reqOptions);
        return response.data;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.message)
    }
    } 
) 

export const addEventAttendee = createAsyncThunk('events/addEventAttendee',  async (eventId: string, thunkApi) => {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    eventId,
  });
  try {
    const response = await axios.post(`/api/events/attend`, body, {
    headers,
  });
  return response.data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(error);
  }
  
}
)

export const addEventPayment = createAsyncThunk(
  "events/addEventPayment",
  async ({
    eventId,
    userId,
    amount,
    paid,
    receipt,
  }: {
    eventId: string;
    userId: string;
    amount: number;
    paid: boolean;
    receipt: string;
  }, thunkApi) => {
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({
      eventId,
      amount,
      userId,
      paid,
      receipt,
    });

    try {
      const response = await axios.post("/api/events/attend/payments", body, {
        headers,
      });

      return response.data;
    } catch (error:any) {
      // Handle the error appropriately
      console.error("Failed to add event payment:", error);
     thunkApi.rejectWithValue({ error: error.message }) ;
    }
  }
);
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id: string, thunkAPI) => {
    const headers = {
      Accept: "*/*",
    };

    const reqOptions = {
      url: `/api/events?id=${id}`,
      method: "DELETE",
      headers,
    };

    try {
      const response = await axios.request(reqOptions);
      return response.data;
    } catch (error:any) {
      if (error.response && error.response.status >= 400) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue({ message: errorMessage });
      } else {
        throw error;
      }
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async (
    {
      id,
      title,
      details,
      excerpt,
      image,
      location,
      price,
      organizers,
      paymentLink,
      eventDate,
    }: Event,
    thunkAPI
  ) => {
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({
      id,
      title,
      details,
      excerpt,
      image,
      location,
      price,
      paymentLink,
      organizers,
      eventDate,
    });

    try {
      const response = await axios.put(`/api/events`, body, {
        headers,
      });
      return response.data;
    } catch (error:any) {
      if (error.response && error.response.status >= 400) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue({ message: errorMessage });
      } else {
        throw error;
      }
    }
  }
);

export const getMyEvents = createAsyncThunk(
  "events/getMyEvents",
  async (id: string, thunkAPI) => {
    const headers = {
      Accept: "*/*",
    };

    const reqOptions = {
      url: `/api/events/attend/${id}/myevents`,
      method: "GET",
      headers,
    };

    try {
      const response = await axios.request(reqOptions);
      return response.data;
    } catch (error:any) {
      if (error.response && error.response.status >= 400) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue({ message: errorMessage });
      } else {
        throw error;
      }
    }
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (formData: EventFormProps, thunkAPI) => {
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(`/api/events`, formData, {
        headers,
      });
      return response.data;
    } catch (error:any) {
      if (error.response && error.response.status >= 400) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue({ message: errorMessage });
      } else {
        throw error;
      }
    }
  }
);