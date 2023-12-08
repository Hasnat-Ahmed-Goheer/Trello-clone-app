import Image from "next/image";
import SearchBox from "./SearchBox";
import GptTextBox from "./GptTextBox";

const Header = () => {  
  return (
    <header>
      <div className="absolute left-0 top-0 h-96 w-full bg-gradient-to-br from-red-400 to-[#0055D1] rounded-lg filter blur-3xl opacity-50 -z-50 " />
      <div className=" flex flex-col items-center bg-gray-500/10 p-2 md:flex-row md:justify-between">
        {/* Image */}
        <Image
          src="/Trello_logo.svg.png"
          alt="Trello Logo"
          width={300}
          height={100}
          className="w-52 object-contain pb-8 md:w-56 md:pb-0"
        />

        {/* SearchBox Component */}
        <div className="w-full">
          <SearchBox />
        </div>
      </div>
      <GptTextBox />
    </header>
  );
};

export default Header;
