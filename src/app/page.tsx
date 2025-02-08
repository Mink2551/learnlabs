"use client"

import React from "react";
import Banner from "./components/Banner";
import Searchbar from "./components/searchbar";

export default function Home() {
  return (
    <main className="min-h-[200vh]">
      <Banner/>
      <Searchbar/>
    </main>
  );
}
