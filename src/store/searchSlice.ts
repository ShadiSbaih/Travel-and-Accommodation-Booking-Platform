import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SearchData {
    query: string;
    checkIn: Date;
    checkOut: Date;
    adults: number;
    children: number;
    rooms: number;
}

const initialState: SearchData = {
    query: '',
    checkIn: new Date(),
    checkOut: new Date(),
    adults: 2,
    children: 0,
    rooms: 1,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchData: (_, action: PayloadAction<SearchData>) => {
            return action.payload;
        },
    },
});

export const { setSearchData } = searchSlice.actions;
export default searchSlice.reducer;
