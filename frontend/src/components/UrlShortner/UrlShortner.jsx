import React, { useState } from "react";
import axios from "axios";
import "../UrlShortner/UrlShortner.css";
import copy from "clipboard-copy";
import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";

const UrlShortner = () => {
  const [url, setUrl] = useState("");
  const [urlData, setUrlData] = useState([]);
  const [clipbord, setClipbord] = useState("Click to copy");

  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();

  const sendUrl = (e) => {
    e.preventDefault();
    if (url.length > 0) {
      axios({
        method: "post",
        url: "https://url-shortner-t0vu.onrender.com/api/url/",
        data: { longUrl: url },
      }).then((response) => {
        setUrlData((prev) => [response.data, ...prev]);
        setUrl("");
      });
    }
  };

  return (
    <div className="wrapper">
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: "tooltip-container" })}
        >
          <div {...getArrowProps({ className: "tooltip-arrow" })} />
          {clipbord}
        </div>
      )}
      <div className="navbar">
        <div className="container">
          <h2 className="logo">lity</h2>
        </div>
      </div>

      {/* body */}
      <div className="heading_section container">
        <h1>Shorten your URLs, for your work,personaluse,anything...</h1>
      </div>

      {/* form sectioin */}
      <div className="form_section">
        <form className="input_form container">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            placeholder="Enter your link here"
          />
          <button onClick={sendUrl}>Shortern Url</button>
        </form>
      </div>

      {/* url section */}
      {urlData.map((data) => {
        return (
          <div className="url_section container">
            <div className="url">
              <h4>{data.longUrl}</h4>
              <div className="copy_link">
                <p
                  onClick={() =>
                    copy(`https://vermillion-marzipan-6c3737.netlify.app/${data.shortUrl}`).then(() => {
                      window.location.href = `https://vermillion-marzipan-6c3737.netlify.app/${data.shortUrl}`;
                    })
                  }
                >
                  {`lity.co/${data.shortUrl}`}
                </p>
                <div ref={setTriggerRef} className="icon_section">
                  <i
                    ref={setTriggerRef}
                    className="fa-solid fa-copy copy_icon"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UrlShortner;
