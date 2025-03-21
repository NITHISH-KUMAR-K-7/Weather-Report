import React, { useEffect,useState,useRef } from 'react'
import search from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'

export default function Weather(){

    const inputRef = useRef()
    const [weatherData, setWeatherDate] = useState(false)
    const allIcons = {
        "01d":clear,
        "01n":clear,
        "02d":cloud,
        "02n":cloud,
        "03d":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow,
        
    }
    const searches = async (city) =>{
        if(city ===""){
            alert("Enter City Name");
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            

            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear;
            console.log(icon)
            setWeatherDate({
                humidity:data.main.humidity,
                windspeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon: icon
            })
        }
        catch(error){
            setWeatherDate(false);
            console.error("Error in fetching weather data");

        }
    }

    useEffect(() =>{
        searches("London");
    },[]);
    return(
        <>
       
        <div className="sm:w-1/2 mx-auto mt-15 bg-gradient-to-r from-red-100 to-purple-500 rounded-3xl lg: 3/4">
            <div className="flex flex-wrap w-full">
                <input className="border-none focus:outline-none p-4 mt-20  bg-white text-gray-700 h-10 mx-auto w-3/4 rounded-2xl" 
                type="text" placeholder="Enter City..." ref={inputRef} />
                <img className="mt-20 ml-1 p-2 bg-white w-10 h-10 rounded-full mx-auto my-auto cursor-pointer" src={search} alt="" onClick={()=>searches(inputRef.current.value)}/>
            </div>
                {weatherData?<> 
                
                
            <div className="flex flex-wrap justify-center">
                <img className="sm:w-30 h-30 md:w-40 h-40 lg:w-60 h-60" src={weatherData.icon} alt="" />
            </div>
            <div className="flex justify-center w-full">
                <h1 className="text-bold text-white text-5xl ">{weatherData.temperature}°C</h1>
            </div>
            <div className="flex justify-center w-full mt-2">
                <h3 className="text-bold text-white text-5xl ">{weatherData.location}</h3>
            </div>

            {/* <div  className="sm:w-full  md:w-full mt-15 lg:w-1/2 mb-15 flex flex-wrap justify-center mx-auto"> */}
            <div  className="sm:w-full mt-10 mx-auto " >
                <div className="sm: justify-center flex flex-col items-center ">
                    <img className="sm:w-15 h-15 mb-5 " src={humidity} alt="" />
                <div  className="px-4 text-center text-3xl">
                    <h3>{weatherData.humidity}%</h3>
                    <p>Humidity</p> 
                </div>
                </div>
            
            </div>
            
                <div  className="sm:w-full mt-10 mx-auto" >    
                <div className="sm: justify-center flex flex-col items-center">
                <img className="sm:w-15 h-15 mb-5" src={wind} alt="" />
                <div  className="px-4 text-center text-3xl">
                <h3>{weatherData.windspeed} Km/h</h3>
                <p className="mb-10">Wind Speed</p>
                </div>
                </div>

            </div>    

                

               
            
                </>:<></>}
         
                
          
        
        
         </div>
        </>
    );
}