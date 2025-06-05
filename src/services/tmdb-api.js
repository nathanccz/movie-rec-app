import { getGenreNames } from '../../utils/helpers'

const GET_OPTIONS = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    'Content-Type': 'application/json',
  },
}

export const getFullMediaDetails = async (mediaId, mediaType, userRegion) => {
  try {
    const URL = `https://api.themoviedb.org/3/${mediaType}/${mediaId}?append_to_response=videos,watch/providers,credits`
    const response = await fetch(URL, GET_OPTIONS)
    const data = await response.json()
    const baseMediaDetails = extractMediaDetails(data, mediaType)
    const providers = extractProviders(data['watch/providers'], userRegion)
    const castAndCrew = extractCastAndCrew(data.credits)
    const fullMediaDetails = {
      ...baseMediaDetails,
      sources: providers,
      cast: castAndCrew.cast,
    }

    if (mediaType === 'movie') {
      fullMediaDetails.director = castAndCrew.director
    }

    return fullMediaDetails
  } catch (error) {
    console.log('Error fetching media details:', error)
  }
}

const extractMediaDetails = (data, mediaType) => {
  let mediaDetails = {}

  const movieFields = [
    'id',
    'mediaType',
    'title',
    'genres',
    'overview',
    'popularity',
    'poster_path',
    'production_companies',
    'status',
    'tagline',
    'videos',
    'release_date',
  ]

  const tvFields = [
    'id',
    'mediaType',
    'genres',
    'overview',
    'popularity',
    'poster_path',
    'production_companies',
    'status',
    'created_by',
    'videos',
    'seasons',
    'tagline',
    'networks',
    'name',
  ]

  const fieldsToUse = mediaType === 'movie' ? movieFields : tvFields

  for (let field of fieldsToUse) {
    switch (field) {
      case 'id':
        mediaDetails.tmdbId = data.id
        break
      case 'mediaType':
        mediaDetails.mediaType = mediaType
        break
      case 'poster_path':
        mediaDetails.poster =
          `https://image.tmdb.org/t/p/w300${data.poster_path}` || null
        break
      case 'videos':
        if (data.videos.results.length === 0) {
          mediaDetails.videos = []
          break
        }
        const trailer =
          data.videos.results?.find((r) => r.official) || data.videos.results[0]
        mediaDetails.trailer = `https://www.youtube.com/watch?v=${trailer.key}`
        break
      default:
        mediaDetails[field] = data[field]
    }
  }

  return mediaDetails
}

const extractProviders = (data, userRegion) => {
  const regionData = data.results[userRegion]

  if (!regionData) {
    return []
  }
  const getMappedData = (data, type) =>
    data && data.length > 0 ? data.map((d) => ({ ...d, type })) : []

  const results = [
    ...getMappedData(regionData.flatrate, 'subscription'),
    ...getMappedData(regionData.free, 'free'),
  ]

  if (!results) {
    return []
  }
  const resultsWithLogoURLs = results.map((r) => {
    return {
      ...r,
      logo: `https://image.tmdb.org/t/p/w200/${r.logo_path}`,
    }
  })

  return resultsWithLogoURLs
}

const extractCastAndCrew = (data) => {
  const cast = data.cast //Array of objects
  const director = data.crew.find((c) => c.job === 'Director') || null

  return {
    cast: cast,
    director: director,
  }
}

export const fetchMovieAutocomplete = async (userInput) => {
  if (userInput === '') return
  try {
    const URL = `https://api.themoviedb.org/3/search/movie?query=${userInput}`
    const response = await fetch(URL, GET_OPTIONS)
    const data = await response.json()
    const resultsWithPoster = data.results.map((r) => {
      r.poster = `https://image.tmdb.org/t/p/w300${r.poster_path}`
      return r
    })

    return resultsWithPoster
  } catch (error) {
    console.log(error)
  }
}

export const fetchTvAutocomplete = async (userInput) => {
  if (userInput === '') return
  try {
    const URL = `https://api.themoviedb.org/3/search/tv?query=${userInput}`
    const response = await fetch(URL, GET_OPTIONS)
    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

export const getTrendingNow = async (provider, mediaType, userRegion) => {
  const providerIds = {
    Netflix: 8,
    'Amazon Prime': 9,
    Max: 1899,
    'Apple TV': 2,
  }

  const providerId = providerIds[provider]
  console.log(GET_OPTIONS)
  try {
    const URL = `https://api.themoviedb.org/3/discover/${mediaType}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=${userRegion}&with_watch_providers=${providerId}`

    const response = await fetch(URL, GET_OPTIONS)
    const data = await response.json()

    const titlesWithPosters = data.results.map((t) => ({
      ...t,
      genres: getGenreNames(t.genre_ids, mediaType),
      poster: `https://image.tmdb.org/t/p/w200${t.poster_path}`,
      mediaType: mediaType,
    }))

    return titlesWithPosters
  } catch (error) {
    console.log('Error fetching trending titles:', error)
  }
}

export const generateDataFromMessage = async (obj) => {
  const data = []

  for (const key in obj) {
    const title = key
      .split(' ')
      .filter((el) => !el.includes('('))
      .join(' ')
    const response = await fetchMovieAutocomplete(title)
    console.log(response)
    const filtered = response.filter((el) => el.title === title)[0]
    console.log(filtered)
    data.push(filtered)
  }
  console.log(data)
  return data
}
