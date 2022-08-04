import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Movie from "./Movie";

export default function Main(props) {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  const { tab } = useSelector((root) => root.movieReducer);

  useEffect(() => {
    axios
      .get("https://getpantry.cloud/apiv1/pantry/a0380fbf-1c1d-4218-8d97-350fbf2df51d/basket/nowShowingMovie")
      .then(function (response) {
        setData1(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("https://getpantry.cloud/apiv1/pantry/a0380fbf-1c1d-4218-8d97-350fbf2df51d/basket/upComingMovie")
      .then(function (response) {
        setData2(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="main">
      <div className="movie-list">
        {tab === 1 &&
          data1?.nowShowingMovie?.map((movie, index) => {
            return <Movie history={props.history} movie={movie} index={index} key={index}></Movie>;
          })}
        {tab === 2 &&
          data2?.upComingMovie?.map((movie, index) => {
            return <Movie movie={movie} key={index} disabled></Movie>;
          })}
      </div>
    </div>
  );
}
