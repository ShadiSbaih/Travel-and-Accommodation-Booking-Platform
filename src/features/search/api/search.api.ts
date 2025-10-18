import api from "@/core/api/axios";

const searchApi = {
    searchHotels: async (params: {
        city: string;
        adults: number;
        children: number;
        numberOfRooms: number;
    }) => {
        const { data } = await api.get('/home/search', {
            params: {
                city: params.city,
                adults: params.adults,
                children: params.children,
                numberOfRooms: params.numberOfRooms
            }
        });
        return data;
    }
}

export default searchApi;