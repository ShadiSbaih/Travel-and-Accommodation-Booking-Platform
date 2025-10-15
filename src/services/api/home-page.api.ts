import api from "./axios";

const homePageApi = {

    getFeaturedDeals: async () => {
        const { data } = await api.get('/home/featured-deals');
        return data
    },
    getTrendingDestinations: async () => {
        const { data } = await api.get('/home/destinations/trending');
        return data
    },
    getRecentlyVisitedHotels: async (userId: string) => {
        const { data } = await api.get(`/home/users/${userId}/recent-hotels`);
        return data
    },
};

export default homePageApi;