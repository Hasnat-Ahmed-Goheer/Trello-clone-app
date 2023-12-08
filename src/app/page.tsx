import Header from "@/components/Header/Header";
import MainBody from "@/components/MainBody/MainBody";
// import { POST } from "./api/generateSummary/route";

export default async function Home() {

  return (
    <main>
      {/* Header */}
      <Header />
      {/* Main Body */}
      <MainBody />
    </main>
  );
}
