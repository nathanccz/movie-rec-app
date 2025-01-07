export const getTitleDetails = async (id) => {
      try {
          const WATCHMODE_API_KEY = import.meta.env.VITE_WATCHMODE_KEY
          const WATCHMODE_URL = `https://api.watchmode.com/v1/title/${id}/details/?apiKey=${WATCHMODE_API_KEY}&append_to_response=sources`
          const response = await fetch(WATCHMODE_URL)
          const data = await response.json()
          return data
      } catch (error) {
          console.log(error)
      }
}

export const getAutocompleteDetails = async (userInput) => {
    if (userInput === '') return
    try {
        const WATCHMODE_API_KEY = import.meta.env.VITE_WATCHMODE_KEY
        const WATCHMODE_AUTOCOMPLETE_URL = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${WATCHMODE_API_KEY}&search_value=${userInput}&search_type=2`
        const response = await fetch(WATCHMODE_AUTOCOMPLETE_URL)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}