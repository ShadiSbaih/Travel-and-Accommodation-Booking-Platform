import api from "./axios";
import type { Amenity } from "@/features/hotels/types";

const amenitiesApi = {
    getAmenities: async (): Promise<Amenity[]> => {
        const { data } = await api.get('/search-results/amenities')
        return data;
    }
}

export default amenitiesApi;