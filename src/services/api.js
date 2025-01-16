export const getDashboardData = async() => {
    const response = await fetch('http://localhost:3000/api/dashboard', {
        credentials: 'include'
    })
    const data = await response.json()

    return data
}

// export const getUserRegionFromDB = async() => {
//     try {
//         const response = await fetch(`http://localhost:3000/api/dashboard`, {
//             credentials: 'include'
//         })

//         if (!response.ok) {
//             throw new Error('Failed to fetch user region');
//         }

//         const data = await response.json()

//         return data.region
//     } catch (error) {
//         console.error('Error getting user region:', error);
//         return null
//     }
// }

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