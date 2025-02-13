export const getDashboardData = async() => {
    const response = await fetch('http://localhost:3000/api/dashboard', {
        credentials: 'include'
    })
    const data = await response.json()

    return data
}

export const getUserRegionFromDB = async() => {
    try {
        const response = await fetch(`http://localhost:3000/api/dashboard`, {
            credentials: 'include'
        })

        if (!response.ok) {
            throw new Error('Failed to fetch user region');
        }

        const data = await response.json()

        return data.region
    } catch (error) {
        console.error('Error getting user region:', error);
        return null
    }
}

export const addMovie = async(body) => {
    try {
        const response = await fetch(`http://localhost:3000/api/movies/${body.tmdbId}/add`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
            credentials: 'include'
        })

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Bad Request: Invalid movie data');
            } else if (response.status === 404) {
                throw new Error('Not Found: Endpoint does not exist');
            } else {
                throw new Error('Server error, please try again later');
            }
        } else {
            return true
        }
    } catch (error) {
        console.error('Error adding movie:', error);
        return false; 
    }
}

export const getMovie = async(movieId) => {
    try {
        console.log(movieId)
        const response = await fetch(`http://localhost:3000/api/movies/${movieId}/`, {
            credentials: 'include'
        })

        if (!response.ok) {
            throw new Error('Failed to fetch movie data');
        }
        
        const data = await response.json()
    
        return data
    } catch (error) {
        console.error('Error getting movie:', error);
    }
}

export const getRecommendations = async (userID) => {
    try {
        const response = await fetch(`http://localhost:3000/api/movies/${userID}/recommendations`, {
            credentials: 'include'
        })

        if (!response.ok) {
            throw new Error('Failed to fetch movie recommendations');
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.log('Error getting movie recommendations:', error)
    }
}

export const addFave = async (mediaId) => {
    try {
        const URL = `http://localhost:3000/api/movies/${mediaId}/fave`
        const response = await fetch(URL, {
            method: 'POST',
            credentials: 'include'
        })

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Bad Request: Invalid movie data');
            } else if (response.status === 404) {
                throw new Error('Not Found: Endpoint does not exist');
            } else {
                throw new Error('Server error, please try again later');
            }
        } else {
            return true
        }
           
    } catch (error) {
        console.log('Error adding title to favorites:', error)
    }
}

export const removeFave = async (mediaId) => {
    try {
        const URL = `http://localhost:3000/api/movies/${mediaId}/fave/remove`
        const response = await fetch(URL, {
            method: 'DELETE',
            credentials: 'include'
        })

        if (response.ok) {
            return true
        }

        return null
    } catch (error) {
        console.log('Error deleting review:', error)
        return null
    }
}

export const getFaves = async () => {
    try {
        const URL = `http://localhost:3000/api/movies/faves/all`
        const response = await fetch(URL, {
            credentials: 'include'
        })
        console.log(response)
        if (!response.ok) {
            throw new Error('Failed to fetch faves');
        }

        const data = await response.json()
        console.log(data)
        return data.faves
    } catch (error) {
        console.log('Error getting favorites:', error)
    }
}

export const getReviews = async () => {
    try {
        const URL = `http://localhost:3000/api/movies/reviews/all`
        const response = await fetch(URL, {
            credentials: 'include'
        })
        console.log(response)
        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }

        const data = await response.json()
        console.log(data)
        return data.reviews
    } catch (error) {
        console.log('Error getting reviews:', error)
    }
}

export const addReview = async (mediaId, text) => {
    try {
        const URL = `http://localhost:3000/api/movies/${mediaId}/review`
        const response = await fetch(URL, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'text': text
            }),
            credentials: 'include'
        })

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Bad Request: Invalid movie data');
            } else if (response.status === 404) {
                throw new Error('Not Found: Endpoint does not exist');
            } else {
                throw new Error('Server error, please try again later');
            }
        } else {
            return true
        }
           
    } catch (error) {
        console.log('Error saving review:', error)
    }
}

export const deleteReview = async (mongoId) => {
    try {
        const URL = `http://localhost:3000/api/movies/${mongoId}/delete`
        const response = await fetch(URL, {
            method: 'DELETE',
            credentials: 'include'
        })

        if (response.ok) {
            return true
        }

        return null
    } catch (error) {
        console.log('Error deleting review:', error)
        return null
    }
}

export const editReview = async (mongoId, text) => {
    try {
        const URL = `http://localhost:3000/api/movies/${mongoId}/review/edit`
        const response = await fetch(URL, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'text': text
            }),
            credentials: 'include'
        })

        if (response.ok) {
            return true
        }

        return null
    } catch (error) {
        console.log(error)
    }
}

export const addToWatchlist = async (mediaId) => {
    try {
        const URL = `http://localhost:3000/api/movies/${mediaId}/watchlist`
        const response = await fetch(URL, {
            method: 'POST',
            credentials: 'include'
        })

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Bad Request: Invalid movie data');
            } else if (response.status === 404) {
                throw new Error('Not Found: Endpoint does not exist');
            } else {
                throw new Error('Server error, please try again later');
            }
        } else {
            return true
        }
           
    } catch (error) {
        console.log('Error adding title to favorites:', error)
    }
}

export const getWatchlist = async () => {
    try {
        const URL = `http://localhost:3000/api/movies/watchlist/all`
        const response = await fetch(URL, {
            credentials: 'include'
        })
        console.log(response)
        if (!response.ok) {
            throw new Error('Failed to fetch watchlist');
        }

        const data = await response.json()
        console.log(data)
        return data.watchlist
    } catch (error) {
        console.log('Error getting watchlist:', error)
    }
}

export const removeFromWatchlist = async (mediaId) => {
    try {
        const URL = `http://localhost:3000/api/movies/${mediaId}/watchlist/delete`
        const response = await fetch(URL, {
            method: 'DELETE',
            credentials: 'include'
        })

        if (response.ok) {
            return true
        }

        return null
    } catch (error) {
        console.log('Error deleting from watchlist:', error)
        return null
    }
}