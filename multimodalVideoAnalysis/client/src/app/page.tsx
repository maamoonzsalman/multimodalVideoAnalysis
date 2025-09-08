import Title from "./components/landingPage/Title";
import UploadVideo from "./components/landingPage/UploadVideo/UploadVideo";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="navbar">
          <Title/>
      </div>
      <div className="bg-purple-700 flex-1 flex justify-center items-center">
        <UploadVideo/>
      </div>
    </div>
  );
}
