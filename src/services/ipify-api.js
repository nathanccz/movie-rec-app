async function getIP() {
	try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        return data.ip     
    } catch (error) {
        console.log(error)
    }
}

export const getUserRegion = async () => {
    const IP = await getIP()
    const GEO_KEY = import.meta.env.VITE_GEO_KEY
    const URL = `https://geo.ipify.org/api/v2/country?apiKey=${GEO_KEY}&ipAddress=${IP}`
    
    
    try {
        const response = await fetch(URL)
        const data = await response.json()
        const userRegion = data.location.country

        return userRegion
    } catch (error) {
        console.log(error)
    }
}

