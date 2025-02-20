import React from "react";
import Customizer from "./Customizer";
import Searchbar from "./Searchbar";
import Offcanvascart from "./Offcanvascart";
export default function Footer() {
  return (
    <>
      <div>
        <Customizer />
      </div>

      <Searchbar />

      <Offcanvascart />
    </>
  );
}
