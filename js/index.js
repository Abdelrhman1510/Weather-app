async function search(city) {
    let myApi = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4a8e081695504290b44224234232202&q=${city}&days=3`);
    if ( myApi.status !=400 && myApi.ok  ) {
        let data = await myApi.json();
        displayCurrent(data.location, data.current),
        displayAnother(data.forecast.forecastday)
    }
}

document.getElementById("search").addEventListener("keyup", data=>{
    search(data.target.value)
}
);

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function displayCurrent(cityName, temp) {
    if (temp != null ) {
        var myDate = new Date(temp.last_updated.replace(" ", "T"));
         let cartona = `
       <div class="  col-lg-4" >
       <div class="card rounded-start-4">
       <div class="card-header d-flex justify-content-between align-items-center py-0 pt-2">
       <p>${days[myDate.getDay()]}</p>
       <p>${myDate.getDate() + monthNames[myDate.getMonth()]}</p>
       </div>
       <div class="card-body">
       <h5 class="card-title">${cityName.name} , <span class ="text-warning"> ${cityName.country}</span> </h5>
       <p class="card-text fs-1">${temp.temp_c}<sup>o</sup> C</p>
       <img src="https:${temp.condition.icon}" alt="">
       <p class="text-primary">${temp.condition.text}</p>
       <span class="me-3">
       <img src="images/images1 (2).png" alt="">
            20%
       </span>
       <span class="me-3">
       <img src="images/images1 (3).png" alt="">
        ${temp.wind_kph} Km/h
        </span>
        <span class="me-3">
        <img src="images/images1 (4).png" alt="">
        ${temp.wind_dir}
        </span>
        </div>
        </div> 
        </div> 
        `;
        
        document.getElementById("forecast").innerHTML = cartona;
    }
}
function displayAnother(numOfDays) {
    let cartona = "";
    for (let i = 1; i < numOfDays.length; i++)
     cartona +=   `
            <div class="  col-lg-4" >
            <div class="card rounded-0 custom-card">
            <div class="card-header text-center py-3 pt-2">
            ${days[new Date(numOfDays[i].date.replace(" ", "T")).getDay()]}
            </div>
            <div class="card-body text-center p-4 ">
            <img src="https:${numOfDays[i].day.condition.icon}" alt="">
            <p class="card-text fs-1">${numOfDays[i].day.maxtemp_c} <sup>o</sup> C</p>
            <p class="card-text fs-6 disabled">${numOfDays[i].day.mintemp_c} <sup>o</sup> C</p>
            <p class="text-primary">${numOfDays[i].day.condition.text}</p>
            </div>
            </div>
            </div>
            
            `;



    document.getElementById("forecast").innerHTML += cartona
}
search("alexandria");
