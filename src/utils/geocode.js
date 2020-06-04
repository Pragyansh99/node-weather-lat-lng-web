const request = require('request')

const baseUrl = 'https://api.mapbox.com'
const endpoint = 'mapbox.places'
const access_token  = 'pk.eyJ1IjoiaG9saWRheTk5IiwiYSI6ImNrYXVyYWt2cTB0bGEycXB0YWUxaTFtd2gifQ.2W0frS89AkPT9nmdqtubxQ'
const limit = 1

const geocode = (address,callback)=>{

    const mapboxUrl = `${baseUrl}/geocoding/v5/${endpoint}/${address}.json?access_token=${access_token}&limit=${limit}`
    
    request({url:mapboxUrl, json:true},(error, response) =>{
        if(error){
            callback('Something went wrong !!! Cannot connect to services', undefined)
        } else if(!response.body.features.length) {
            callback('Location not found !!! Please try another search', undefined)
        } else {
            callback(undefined,{
                longitude: response.body.features[0].center[0],
                lattitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }   
    })
}

module.exports = geocode