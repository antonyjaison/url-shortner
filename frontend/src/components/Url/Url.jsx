import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import "../Url/Url.css";

const Url = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const getUrl = async () => {
      const response = await fetch(`https://url-shortner-t0vu.onrender.com${location.pathname}`);
      const json = await response.json();
      console.log(json);
      if (json === "") {
        console.log("url not found")
      } else {
        window.location.replace(json);
        console.log(json);
      }
    };
    getUrl();
  }, []);

  return null;
};

export default Url;
