"use client";

import Banner from "../../components/Banner";
import Grid from "../../components/Grid";

export default function Home() {
  return (
    <main className="min-h-screen pb-20 relative">
      {/* Main Content */}
      <Banner />
      <Grid />
    </main>
  );
}
