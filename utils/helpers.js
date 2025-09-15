export const getTitleFields = (mediaType) => {
  const movieFields = [
    'tmdbId',
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
    'tagline',
  ]

  const tvFields = [
    'tmdbId',
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
    'tagline',
  ]

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
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 99,
      name: 'Documentary',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 36,
      name: 'History',
    },
    {
      id: 27,
      name: 'Horror',
    },
    {
      id: 10402,
      name: 'Music',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10749,
      name: 'Romance',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 10770,
      name: 'TV Movie',
    },
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 10752,
      name: 'War',
    },
    {
      id: 37,
      name: 'Western',
    },
  ]

  const tvGenres = [
    {
      id: 10759,
      name: 'Action & Adventure',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 99,
      name: 'Documentary',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 10762,
      name: 'Kids',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10763,
      name: 'News',
    },
    {
      id: 10764,
      name: 'Reality',
    },
    {
      id: 10765,
      name: 'Sci-Fi & Fantasy',
    },
    {
      id: 10766,
      name: 'Soap',
    },
    {
      id: 10767,
      name: 'Talk',
    },
    {
      id: 10768,
      name: 'War & Politics',
    },
    {
      id: 37,
      name: 'Western',
    },
  ]

  const genresToUse = mediaType === 'movie' ? movieGenres : tvGenres

  return genreIds.map((id) => genresToUse.find((g) => g.id === id).name)
}

export const isLikelyMediaRelated = (text) => {
  const mediaKeywords = [
    // General media
    'movie',
    'movies',
    'film',
    'films',
    'tv',
    'tv show',
    'tv series',
    'show',
    'series',
    'watch',
    'stream',
    'streaming',
    'binge',

    // Genres
    'comedy',
    'drama',
    'thriller',
    'horror',
    'action',
    'romance',
    'sci-fi',
    'science fiction',
    'fantasy',
    'documentary',
    'animated',
    'animation',
    'anime',
    'crime',
    'mystery',
    'adventure',
    'family',

    // Platforms
    'netflix',
    'hulu',
    'disney',
    'disney+',
    'prime',
    'amazon prime',
    'hbo',
    'hbo max',
    'max',
    'paramount',
    'peacock',
    'apple tv',
    'crunchyroll',
    'showtime',

    // People
    'actor',
    'actress',
    'cast',
    'director',
    'filmmaker',
    'producer',
    'character',
    'stars',
    'starring',

    // Content terms
    'episode',
    'season',
    'pilot',
    'finale',
    'scene',
    'plot',
    'story',
    'recommendation',
    'recommend',
    'trailer',
    'clip',
    'review',
    'spoiler',

    // Movie/TV phrases
    'what to watch',
    'something to watch',
    'good show',
    'good movie',
    'favorite movie',
    'favorite show',
    'best movie',
    'best show',
  ]

  const lowerInput = text.toLowerCase()

  return mediaKeywords.some((keyword) => lowerInput.includes(keyword))
}

export const isTitleCaseAPA = (str) => {
  const minorWords = new Set([
    'a',
    'an',
    'and',
    'as',
    'at',
    'but',
    'by',
    'for',
    'in',
    'nor',
    'of',
    'on',
    'or',
    'so',
    'the',
    'to',
    'up',
    'with',
    'yet',
  ])

  // Normalize smart quotes/apostrophes/dashes
  str = str
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .trim()

  // Split by space but keep punctuation grouped with words
  const words = str.split(/\s+/)

  return words.every((word, index) => {
    const isFirstOrLast = index === 0 || index === words.length - 1

    // Remove surrounding punctuation (e.g., "Quotes,", "(Parentheses):", etc.)
    const cleaned = word.replace(/^[^A-Za-z0-9']+|[^A-Za-z0-9']+$/g, '')

    // Allow raw ampersand
    if (cleaned === '&') return true

    // Allow acronyms (all caps)
    if (/^[A-Z]{2,}$/.test(cleaned)) return true

    const lower = cleaned.toLowerCase()

    if (minorWords.has(lower) && !isFirstOrLast) {
      return cleaned === lower
    } else {
      // Capitalized word with optional internal apostrophes or hyphens
      return /^[A-Z][a-z]*(?:['-][A-Z]?[a-z]+)*$/.test(cleaned)
    }
  })
}

// export const buildResultsMessage = (text) => {
//   const lines = text.split('\n')
//   let introMessage = ''
//   const results = {}
//   let endMessage = ''

//   let inResults = false
//   let inEnding = false

//   for (const line of lines) {
//     const match = line.match(/^\d+\.\s\*\*(.+?)\*\*\:\s(.+)/)

//     if (match) {
//       inResults = true
//       const [, title, description] = match
//       results[title.trim()] = description.trim()
//     } else if (!inResults) {
//       introMessage += line + '\n'
//     } else {
//       inEnding = true
//       endMessage += line + '\n'
//     }
//   }

//   return [introMessage.trim(), results, endMessage.trim()]
// }

export const buildResultsMessage = (text) => {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/i)

  if (match) {
    const codeString = match[1].trim()

    try {
      const parsed = JSON.parse(codeString)
      console.log('Parsed JSON:', parsed)
      return Object.values(parsed)
    } catch (err) {
      console.error('Failed to parse JSON:', err)
    }
  } else {
    console.warn('No code block found')
  }
}

export function isEmpty(obj) {
  for (let field in obj) {
    if (obj[field].length > 0) {
      return false
    }
  }
  return true
}
