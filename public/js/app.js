// http://localhost:3000

const locationForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')


locationForm.addEventListener('submit',(e)=>{
    messageOne.textContent = 'Loading ... '
    messageTwo.textContent = ''
    e.preventDefault();
    fetch('/forecast?search='+search.value).then((response)=>{
        response.json().then((data)=>{
            console.log(data)
        if(data.error_message) {
            messageOne.textContent = data.error_message
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = data.location +' Lat: '+ data.lattitude + ', Lng :'+ data.longitude
            messageTwo.textContent = data.forecast
        }
    })
})
    // console.log('Search text ', search.value)
})