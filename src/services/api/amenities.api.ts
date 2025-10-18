import api from "./axios";
import type { Amenity } from "../../types/api/amenities";

const amenitiesApi = {
    getAmenities: async (): Promise<Amenity[]> => {
        const { data } = await api.get('/search-results/amenities')
        return data;
    }
}

export default amenitiesApi;