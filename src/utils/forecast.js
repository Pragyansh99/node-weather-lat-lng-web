const request = require('request')

// DarkSky API  and key 

const forecast = (lat,lng,callback) =>{
    const url = `https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/${lat},${lng}`;
    request({url:url, json:true }, (error, response)=>{
    if(error) {
        callback('Something went wrong!!! Unable to connet to server',undefined)
    } else if (response.body.error) {
        callback('Cannot find weather report for this location !!! Try another loaction', undefined)
    } else {
        callback(undefined,response.body)
    }
  })
}

module.exports = forecast 