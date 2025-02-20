import React from "react";
import Leftbar from "./Leftbar";
import Header from "./Header";
import Aside from "./Aside";
export default function Topheader() {
  return (
    <>
      {/* Sidebar Start */}
      <Leftbar />
      {/*  Sidebar End */}
      <div className="page-wrapper">
        {/*  Header Start */}
        <Header />
        {/*  Header End */}
        <Aside />
      </div>
    </>
  );
}
