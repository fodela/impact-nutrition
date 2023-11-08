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