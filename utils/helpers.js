export const getTitleFields = (mediaType) => {
    const movieFields = 
        ['tmdbId',
        'director',
        'cast',
        'title', 
        'release_date',
        'overview',
        'poster',
        'mediaType',
        'trailer',
        'sources',
        'genres',
        'production_companies',
        'status',
        'popularity',
        'tagline' ]

    const tvFields = 
        ['tmdbId',
        'director',
        'cast',
        'title', 
        'release_date',
        'overview',
        'poster',
        'mediaType',
        'trailer',
        'sources',
        'genres',
        'production_companies',
        'status',
        'popularity',
        'tagline' ]

    if (mediaType === 'movie') {
        return movieFields
    } else if (mediaType === 'tv') {
        return tvFields
    } else {
        return 'Unknown media type'
    }
}

export const getGenreNames = (genreIds, mediaType) => {

    const movieGenres = [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 10402,
            "name": "Music"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },
        {
            "id": 10770,
            "name": "TV Movie"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 10752,
            "name": "War"
        },
        {
            "id": 37,
            "name": "Western"
        }
    ]

    const tvGenres = [
        {
            "id": 10759,
            "name": "Action & Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 10762,
            "name": "Kids"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10763,
            "name": "News"
        },
        {
            "id": 10764,
            "name": "Reality"
        },
        {
            "id": 10765,
            "name": "Sci-Fi & Fantasy"
        },
        {
            "id": 10766,
            "name": "Soap"
        },
        {
            "id": 10767,
            "name": "Talk"
        },
        {
            "id": 10768,
            "name": "War & Politics"
        },
        {
            "id": 37,
            "name": "Western"
        }
    ]

    const genresToUse = mediaType === 'movie' ? movieGenres : tvGenres

    return genreIds.map(id => genresToUse.find(g => g.id === id).name)
}