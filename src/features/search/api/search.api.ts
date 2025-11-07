import api from "@/core/api/axios";

const searchApi = {
    searchHotels: async (
        params: {
            city: string;
            adults: number;
            children: number;
            numberOfRooms: number;
        },
        signal?: AbortSignal
    ) => {
        const { data } = await api.get('/home/search', {
            params: {
                city: params.city,
                adults: params.adults,
                children: params.children,
                numberOfRooms: params.numberOfRooms
            },
            signal
        });
        return data;
    }
}

export default searchApi;