import * as streamingAvailability from "streaming-availability";

export const getTrendingMovies = async (streamingService) => {
    try {
        const RAPID_API_KEY = import.meta.env.VITE_XRAPIDAPI_KEY
        const client = new streamingAvailability.Client(new streamingAvailability.Configuration({
            apiKey: RAPID_API_KEY
        }));
        const data = await client.showsApi.searchShowsByFilters({
            country: "us",
            catalogs: [streamingService],
            // keyword: "zombie",
            showType: "movie",
        });
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getTrendingShows = async (streamingService) => {
    try {
        const RAPID_API_KEY = import.meta.env.VITE_XRAPIDAPI_KEY
        const client = new streamingAvailability.Client(new streamingAvailability.Configuration({
            apiKey: RAPID_API_KEY
        }))
        const data = await client.showsApi.getTopShows({
            country: "us",
            service: streamingService,
            showType: "series",
        })
        return data
    } catch (error) {
        console.log(error)
    }
}