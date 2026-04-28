import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "./Button";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true, 
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="w-full bg-gray-50 py-10">
      <Slider {...settings}>
        
        {/* Laptop */}
        <div>
          <div className="max-w-[1300px] mx-auto px-5 md:px-20 h-[500px] flex items-center justify-between">
            <div className="flex flex-col gap-5 max-w-xl">
              <h1 className="text-5xl font-bold">
                Powerful <br />
                <span className="text-blue-500">Laptop Collection</span>
              </h1>
              <p className="text-gray-600">
                High-performance laptops for work, gaming, and creativity.
              </p>
              <Button text="Shop Now  →" />
            </div>

            <img
              src="./laptop.png"
              alt="Laptop"
              className="h-[350px] object-contain"
            />
          </div>
        </div>

        {/* iPhone */}
        <div>
          <div className="max-w-[1300px] mx-auto px-5 md:px-20 h-[500px] flex items-center justify-between">
            <div className="flex flex-col gap-5 max-w-xl">
              <h1 className="text-5xl font-bold">
                Latest <br />
                <span className="text-blue-500">iPhone Series</span>
              </h1>
              <p className="text-gray-600">
                Experience speed, camera excellence, and premium design.
              </p>
                <Button text="Buy Iphone →"/>
            </div>

            <img
              src="./iphone.png"
              alt="iPhone"
              className="h-[350px] object-contain"
            />
          </div>
        </div>

        {/* Desktop */}
        <div>
          <div className="max-w-[1300px] mx-auto px-5 md:px-20 h-[500px] flex items-center justify-between">
            <div className="flex flex-col gap-5 max-w-xl">
              <h1 className="text-5xl font-bold">
                Ultimate <br />
                <span className="text-blue-500">Desktop Setup</span>
              </h1>
              <p className="text-gray-600">
                Perfect desktops for office, design, and gaming performance.
              </p>
               <Button text="Buy Desktop  →"/>
            </div>

            <img
              src="./desktop.png"
              alt="Desktop"
              className="h-[350px] object-contain"
            />
          </div>
        </div>

      </Slider>
    </div>
  );
};

export default Hero;
