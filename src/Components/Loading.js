import React from "react";
import Loader from "react-loader-spinner";
import "./Loading.css";

function Loading() {
  return (
    <div className="loader">
      <Loader type="TailSpin" color="green" height={120} width={120} />
    </div>
  );
}

export default Loading;
