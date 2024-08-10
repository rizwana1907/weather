import React, { useState, useEffect } from "react";

import axios from "axios";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

// api key
const APIKey = "4ea0752f7d3fa73ce25b36c37ea00917";

// full height
const height = {
  height: "120vh",
};
const date = new Date();
const hours = date.getHours();
let Greet;

if (hours < 12) {
  Greet = "Hey, Morning! Have a jovial day ahead.";
} else if (hours < 16) {
  Greet = "Hey, Good Afternoon.";
} else {
  Greet = "Hey, Warm Evening wishes to you!";
}

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Delhi");
  const [inputValue, setinputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setinputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    console.log(inputValue);
    if (inputValue !== "") {
      setLocation(inputValue);
    }

    const input = document.querySelector("input");

    if (input.value === "") {
      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);
      }, 900);
    }
    input.value = "";

    e.preventDefault();
  };

  useEffect(() => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}`;
    axios
      .get(url)
      .then((res) => {
        // set data after 1500 ms
        setTimeout(() => {
          setData(res.data);
          // set loading false
          setLoading(false);
        }, 1100);

        // setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 700);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  if (!data) {
    return (
      <div className="w-full h-full g-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
        <div>
          <ImSpinner8 className="text-5xl animate-spin flex text-white" />
        </div>
      </div>
    );
  }

  let icon;
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill className="" />;
      break;
    case "Rain":
      icon = <IoMdRainy className=" text-cyan-400" />;
      break;
    case "Clear":
      icon = <IoMdSunny className=" text-yellow-200" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className=" text-cyan-300" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm className=" text-black" />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    default:
  }
  const date = new Date();

  return (
    <div
      style={height}
      className=" w-full h-full  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center  "
    >
      {/* {errorMsg && (
        <div className="w-full max-w-[77vw] sm:max-w-[250px] lg:max-w-[200px] p-2 bg-red-600 align-middle  text-white absolute lg:top-6  text-2xl capitalize rounded-lg  hidden">
          {" "}
          {`${errorMsg.response.data.message}`}
        </div>
      )} */}
      <div className="text-center  ">
        <h3 className="greet text-xl px-5 text-white font-medium md:text-2xl">
          {Greet}
        </h3>
      </div>

      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } h-16 bg-black/30 w-full lg:max-w-[450px] max-w-[350px] rounded-full backdrop-blur-[32px] m-8 mb-6`}
      >
        <div className="h-full relative flex items-center justify-between ">
          <input
            onChange={(e) => handleInput(e)}
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[16px] font-light pl-6 h-20"
            type="text"
            placeholder="City or Country"
          />

          <button
            onClick={(e) => handleSubmit(e)}
            className=" bg-lime-500  hover:bg-lime-400 lg:w-20 lg:h-14 hidden lg:visible  h-16 rounded-full  justify-center items-center  "
          >
            <IoMdSearch className="text-2xl  " />
          </button>
        </div>
      </form>

      {/* cards */}
      <div className="  w-full lg:max-w-[450px] max-w-[350px] bg-black/30 min-h-[580px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6 mb-20">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            {" "}
            <ImSpinner8 className="text-white text-5xl animate-spin" />
          </div>
        ) : (
          <div>
            {/* Card Top */}
            <div className=" flex items-center gap-x-4  ">
              {/* icon-1 */}
              <div className=" text-[78px]"> {icon} </div>
              <div>
                {/* Country-name */}
                <div className="text-3xl font-sem">
                  {" "}
                  {data.name}, {data.sys.country}{" "}
                </div>

                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="my-20">
              <div className="flex justify-center items-center">
                {/* Temperature */}
                <div className="text-[150px] leading-none font-light">
                  {parseInt(data.main.temp)}
                </div>

                {/* celcius icon */}
                <div className="text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>
              {/* Weather descp */}
              <div className=" capitalize text-center">
                {data.weather[0].description}
              </div>
            </div>
            {/* Card Bottom */}
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
              <div className="flex  justify-between">
                <div className="flex items-center gap-x-2">
                  {/*icon*/}
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Visibility{" "}
                    <span className="ml-2">{data.visibility / 1000} Km</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Feels Like{" "}
                    <div className="flex ml-2">
                      {parseInt(data.main.feels_like)}{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex  justify-between">
                <div className="flex items-center gap-x-2">
                  {/*icon*/}
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Humidity{" "}
                    <span className="ml-2">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div>
                    Wind <span className="ml-2">{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <h1 className="text-xl font-medium dark:text-white p-12 pb-4 lg:pb-15 ">
        Made with &hearts; by Rohit
      </h1> */}
    </div>
  );
};

export default App;
