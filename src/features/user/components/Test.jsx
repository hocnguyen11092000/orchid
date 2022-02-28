import React, { useRef, useState } from "react";
import EXIF from "exif-js";
import exifr, { parse } from "exifr";
import img from "./cafe.jpg";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

function ImageMeta() {
  // const Map = () => {
  //   return <GoogleMap
  //     defaultZoom={10}
  //     defaultCenter={{lat: 54.421532, lng: -75.697189}}
  //   ></GoogleMap>
  // };
  const fileRef = useRef(null);
  const [gpsImg, setGpsImg] = useState({
    lat: "",
    lng: "",
  });

  async function handleChange(e) {
    parse(fileRef.current.files[0], { gps: true }).then((data) => {
      const { latitude, longitude } = data;
      setGpsImg({
        lat: latitude,
        lng: longitude,
      });
    });
  }

  const parseExif = () => {
    console.log(fileRef.current.files[0]);
    parse(fileRef.current.files[0], { gps: true }).then((data) => {
      const { latitude, longitude } = data;
      console.log(latitude, longitude);
    });
  };

  return (
    <>
      <input
        type="file"
        id="file"
        accept=".jpg, .png, .heif, .heic"
        onChange={handleChange}
        ref={fileRef}
      />
      <button onClick={parseExif}>test</button>
      <img src="" alt="" className="img" />
      <div style={{ width: 1000, height: 600 }}>
        <GoogleMapReact
          defaultZoom={10}
          defaultCenter={[10.376528, 106.343889]}
        >
          <Marker key={1} text={"test"} lat={gpsImg.lat} lng={gpsImg.lng} />
        </GoogleMapReact>
      </div>
    </>
  );
}

export default ImageMeta;
