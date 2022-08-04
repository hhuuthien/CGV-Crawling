import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { Select } from "antd";

const { Option } = Select;

export default function ShowTime(props) {
  const [data, setData] = useState(null);
  const [currentProvince, setCurrentProvince] = useState("Hồ Chí Minh");
  const [currentFormat, setCurrentFormat] = useState(0);

  const movieIndex = +props.match.params.movie;

  useEffect(() => {
    axios
      .get("https://getpantry.cloud/apiv1/pantry/a0380fbf-1c1d-4218-8d97-350fbf2df51d/basket/movies")
      .then(function (response) {
        setData(response.data.nowShowingMovie);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (!data) return <></>;

  const movie = data[movieIndex];
  const schedule = movie.schedule;

  let province, format;
  if (schedule.length !== 0) {
    province = schedule.filter((item) => item.province === currentProvince)[0];
    format = province.data[currentFormat];
  }

  const handleChangeProvince = (province) => {
    setCurrentProvince(province);
    setCurrentFormat(0);
  };

  const handleChangeFormat = (format, e) => {
    setCurrentFormat(e.key);
  };

  return (
    <div className="movie">
      <div className="info">
        <div className="poster">
          <img src={movie.images} alt={movie.title} />
        </div>
        <div className="content">
          <p className="title">{movie.title}</p>
          <dl style={{ fontSize: "0.9rem" }}>
            <dt>Director:</dt>
            <dd>{movie.director}</dd>
            <dt>Actor:</dt>
            <dd>{movie.actor}</dd>
            <dt>Genre:</dt>
            <dd>{movie.genre}</dd>
            <dt>Release:</dt>
            <dd>{movie.release}</dd>
            <dt>Runtime:</dt>
            <dd>{movie.runtime}</dd>
            <dt>Language:</dt>
            <dd>{movie.language}</dd>
            <dt>Rating:</dt>
            <dd>{movie.rating}</dd>
          </dl>
        </div>
      </div>
      {schedule.length !== 0 && (
        <div className="showTime" style={{ flex: 1 }}>
          <span style={{ display: "inline-block", marginRight: 10 }}>Khu vực:</span>
          <Select defaultValue={currentProvince} onChange={handleChangeProvince} style={{ width: 200 }}>
            {schedule.map((item, index) => {
              return (
                <Option key={index} value={item.province}>
                  {item.province}
                </Option>
              );
            })}
          </Select>
          <br className="br" />
          <span className="format" style={{ display: "inline-block", marginRight: 10, marginLeft: 50 }}>
            Định dạng:
          </span>
          <Select
            defaultValue={province.availabelFormat[currentFormat]}
            value={province.availabelFormat[currentFormat]}
            onChange={handleChangeFormat}
            style={{ width: 200 }}
          >
            {province.availabelFormat.map((item, index) => {
              return (
                <Option key={index} value={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
          <hr style={{ marginTop: 20 }} />
          <div style={{ margin: "20px 0px" }}>
            {format.map((item, index) => {
              return (
                <div key={index} className="site">
                  <div style={{ fontWeight: "bold" }}>{item.siteName}</div>
                  {item.siteType.map((type, index) => {
                    return (
                      <div key={index}>
                        <div style={{ margin: "10px 0" }}>{type}</div>
                        {item.showTime[index].map((time, i) => {
                          return (
                            <Button
                              className="time"
                              key={i}
                              type="dashed"
                              shape="round"
                              style={{ margin: "0 6px 6px 0" }}
                            >
                              {time}
                            </Button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {schedule.length === 0 && <div>Không tìm thấy suất chiếu cho phim này</div>}
    </div>
  );
}
