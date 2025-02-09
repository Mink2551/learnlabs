"use client"

import React, { useState } from "react";
import Banner from "./components/Banner";
import SearchBar from "./components/searchbar";
import CardBorder from "./components/Course/cardborder/cardborder";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="min-h-[200vh]">
      <Banner />
      <SearchBar onSearch={setSearchTerm} />
      <CardBorder isAll={true} searchTerm={searchTerm} />
    </main>
  );
}
