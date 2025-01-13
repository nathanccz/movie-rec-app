import { getUserRegion } from "./ipify-api"

export const getFullMediaDetailsFromTMDb = async (mediaId, mediaType) => {
    const initialMediaDetails = await getInitialMediaDetailsFromTMDb(mediaId, mediaType)
    const providers = await getProvidersFromTMDb(mediaId, mediaType)
    const castAndCrew = await getCastAndCrewFromTMDb (mediaId, mediaType)
    const fullMediaDetails = {...initialMediaDetails}

    fullMediaDetails.sources = providers
    fullMediaDetails.cast = castAndCrew.cast

    if (mediaType === 'movie') {
        fullMediaDetails.director = castAndCrew.director
    }

    return fullMediaDetails
}

const getInitialMediaDetailsFromTMDb = async (mediaId, mediaType) => {
    try {
        const URL = `https://api.themoviedb.org/3/${mediaType}/${mediaId}?append_to_response=videos`
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        let mediaDetails = {}

        const movieFields = ['id', 'title', 'genres', 'overview', 'popularity', 'poster_path', 'production_companies', 'status', 'tagline', 'videos']
        const tvFields = ['id','genres', 'overview', 'popularity', 'poster_path', 'production_companies', 'status', 'created_by', 'videos', 'seasons', 'tagline', 'networks', 'name']
        const fieldsToUse = mediaType === 'movie' ? movieFields : tvFields

        for (let field of fieldsToUse) {
            switch (field) {
                case 'id': 
                    mediaDetails.tmdbId = data.id
                    break

                case 'poster_path':
                    mediaDetails.poster = `https://image.tmdb.org/t/p/w300${data.poster_path}` 
                    break

                case 'videos':
                    const trailer = data.videos.results.find(r => r.official) || data.videos.results[0]
                    mediaDetails.trailer = `https://www.youtube.com/watch?v=${trailer.key}`
                    break

                default:
                    mediaDetails[field] = data[field]
            }
        }

        return mediaDetails
       
    } catch (error) {
        console.log(`Error fetching ${mediaType} data:`, error)
        return ['An error occurred while fetching data.']
    }
}

const getProvidersFromTMDb = async (mediaId, mediaType) => {
    try {
        const URL = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/watch/providers`
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        const userRegion = await getUserRegion()
        const regionData = data.results[userRegion]

        if (!regionData) {
            return ['This title is not available in your region.']
        } 

        const results = regionData.flatrate?.concat(regionData?.free || [])

        if (!results) {
            return ['This title is not available for free or by subscription.']
        }

        const resultsWithLogoURLs = results.map(r => {
            return {
                ...r,
                logo: `https://image.tmdb.org/t/p/w200/${r.logo_path}`
            }
        })

         
        return resultsWithLogoURLs
        
    } catch (error) {
        console.log(`Error fetching provider data:`, error)
        return ['An error occurred while fetching data.']
    }
}

const getCastAndCrewFromTMDb = async (mediaId, mediaType) => {
    try {
        const URL = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits?language=en-US`
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        const cast = data.cast //Array of objects
        const director = data.crew.find(c => c.job === 'Director') || null

        return {
            cast: cast,
            director: director
        }
    } catch (error) {
        console.log(`Error fetching provider data:`, error)
        return ['An error occurred while fetching data.']
    }
}