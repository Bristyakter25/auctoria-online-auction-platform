
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
// import ParticleBg from "../ParticleBg/ParticleBg";

const Footer = () => {
  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
    // await loadSlim(engine);
}, []);

const particlesLoaded = useCallback(async container => {
    await console.log(container);
}, []);

  return (
    <div className="relative text-white bg-[#2d0147]">
      {/* Particle Background */}
     
      {/* <Particles
        className="absolute inset-0 z-0"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: { enable: false },
          background: { color: "#2d0147" },
          particles: {
            color: { value: "#ffffff" },
            links: {
              enable: true,
              color: "#c084fc",
              distance: 120, 
              opacity: 0.5,
              width: 0.7,
            },
            move: {
              enable: true,
              speed: 0.8,
              outModes: "out",
            },
            number: {
              value: 30, 
              density: { enable: true, area: 800 },
            },
            size: {
              value: { min: 1, max: 3 },
            },
            opacity: { value: 0.4 },
          }
          
        }}
      /> */}

      {/* Footer Content */}
      <div className="relative z-10 p-10 grid md:grid-cols-4 gap-6">
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-bold text-purple-300 mb-2"> <span className="text-white">Auction</span></h2>
          <p className="text-sm text-gray-300">
            A reliable platform for bidding and auctioning items.
            Find great deals, or auction your own items today.
          </p>
          <div className="flex gap-4 mt-4 text-purple-200 text-xl">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaLinkedinIn className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Services */}
        <div>
          <h6 className="footer-title text-lg mb-2">Services</h6>
          <a className="link link-hover block">Buy & Sell</a>
          <a className="link link-hover block">Marketing</a>
          <a className="link link-hover block">Advertisement</a>
        </div>

        {/* Company */}
        <div>
          <h6 className="footer-title text-lg mb-2">Company</h6>
          <a className="link link-hover block">About us</a>
          <a className="link link-hover block">Contact</a>
        </div>

        {/* Legal */}
        <div>
          <h6 className="footer-title text-lg mb-2">Legal</h6>
          <a className="link link-hover block">Terms of use</a>
          <a className="link link-hover block">Privacy policy</a>
          <a className="link link-hover block">Cookie policy</a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="relative z-10 footer footer-center p-4 bg-[#24013b] text-purple-200">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All rights reserved by
            Rex Auction Ltd.
          </p>
        </aside>
      </div>
      {/* <ParticleBg></ParticleBg> */}
    </div>
  );
};

export default Footer;