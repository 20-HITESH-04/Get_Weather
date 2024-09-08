const submitbtn = document.getElementById('submitbtn') ;
const cityName = document.getElementById('cityName') ;
const city_name = document.getElementById('city_name') ;
const temp = document.getElementById('temp') ;
const temp_status = document.getElementById('temp_status') ;
const datahide = document.querySelector('.middle_layer') ;

const getInfo = async(event) => {
    event.preventDefault() ;
    let city_val = cityName.value ;

    if(city_val === "")
    {
        city_name.innerText = "Please type the name of the city before search" ;
        datahide.classList.add('data_hide') ;
    }
    else
    {
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_val}&appid=cff6fb0de66c3dbbfd8f2a8ac0edde92` ;
            const response = await fetch(url) ;
            const data = await response.json() ;
            console.log(data) ;

            const arrData = [data] ;
            const kelvinTemp = arrData[0].main.temp;
            const celsiusTemp = (kelvinTemp - 273.15).toFixed(1);

            city_name.innerText = `${arrData[0].name} , ${arrData[0].sys.country}` ;
            temp.innerText = celsiusTemp ;

            let tempMood = arrData[0].weather[0].main ;
            if(tempMood == "Clear"){
                temp_status.innerHTML = '<i class="fa-solid fa-sun"></i>' ;
            }else if(tempMood == "Clouds"){
                temp_status.innerHTML = '<i class="fa-solid fa-cloud"></i>' ;
            }else if(tempMood == "Rain"){
                temp_status.innerHTML = '<i class="fa-solid fa-cloud"></i>' ;
            }else{
                temp_status.innerHTML = '<i class="fa-solid fa-cloud-sun-rain"></i>' ;
            }

            datahide.classList.remove('data_hide') ;
        }catch{
            city_name.innerText = `Please enter the city name properly` ;
            datahide.classList.add('data_hide') ;
        }
    }
}

submitbtn.addEventListener('click',getInfo) ;

// Function to get the current day and date, and update the HTML elements
const updateDateAndDay = () => {
    const now = new Date();
    
    // Array of days for convenience
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    // Get the current day and date
    const dayOfWeek = days[now.getDay()];
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    
    // Update the HTML elements
    document.getElementById('day').innerText = dayOfWeek;
    document.getElementById('date').innerText = formattedDate;
};

// Call the function when the page loads
window.onload = updateDateAndDay;