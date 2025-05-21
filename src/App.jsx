import { useGSAP } from "@gsap/react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger);

function App() {
  const phoneGalleryRef = useRef();
  const firstPageRef = useRef();

  const lenis = useLenis();

  useGSAP(() => {
    if (!lenis) return;
    lenis.on('scroll', ScrollTrigger.update);

    //Pin the first page
    gsap.timeline({
      scrollTrigger: {
        trigger: firstPageRef.current,
        start: "0%",
        end: "100%",
        pin: true,
        pinSpacing: false,
      },
    });

    //Highlight PAGE 2
    const tlH = gsap.timeline({
      scrollTrigger: {
        trigger: ".second-page",
        // markers: { startColor: "green", endColor: "green" },
        scrub: true,
        start: "-40%",
        end: "40%",
      },
    });

    tlH.fromTo(
      ".highlight",
      { color: "rgba(255,255,255, 0.1" },
      { color: "rgba(255,255,255, 1", stagger: 1 }
    );

    const tlHRemove = gsap.timeline({
      scrollTrigger: {
        trigger: ".second-page",
        // markers: { startColor: "red", endColor: "red" },
        scrub: true,
        start: "-20%",
        end: "60%",
      },
    });

    tlHRemove.to(".highlight", { color: "rgba(255,255,255, 0.3", stagger: 1 });

    //Page 3
    const tlSplit = gsap.timeline({
      scrollTrigger: {
        trigger: ".third-page",
        start: "-25%",
        end: "30%",
        // markers: true,
        scrub: true,
      },
    });

    tlSplit.fromTo(".large-phone", { x: "40%" }, { x: "20%" });
    tlSplit.fromTo(".small-phone", { x: "-40%" }, { x: "-20%" }, "<");
    // gsap for text :D
    tlSplit.fromTo(
      ".product-text-left",
      { x: 50, opacity: 0 },
      { opacity: 1, x: -80 },
      "<"
    );
    tlSplit.fromTo(
      ".product-text-right",
      { x: -50, opacity: 0 },
      { opacity: 1, x: 80 },
      "<"
    );

    const tlSplitPin = gsap.timeline({
      scrollTrigger: {
        trigger: ".third-page",
        pin: true,
        pinSpacing: false,
        start: "0%",
        end: "100%",
      },
    });

    // fourth page
    //Carousel

    const swatches = document.querySelectorAll(".swatches img");
    const gallery = phoneGalleryRef.current;
    const slides = document.querySelectorAll(".phone-gallery-container");

    let currentSwatch = "blue";
    let topIndex = 2;

    swatches.forEach((swatch, index) => {
      const coord = slides[index].getBoundingClientRect().left;

      swatch.addEventListener("click", (e) => {
        let swatchName = e.target.getAttribute("swatch");
        let closeUp = document.querySelector("." + swatchName);
        //Check if we are on the same swatch
        if (currentSwatch === swatchName) return;

        gsap.set(closeUp, { zIndex: topIndex });
        gsap.fromTo(closeUp, { opacity: 0 }, { opacity: 1, duration: 1 });

        //Gallery
        gsap.to(gallery, { x: -coord, duration: 1, ease: "back.out(1)" });
        //Increment zIndex
        topIndex++;
        currentSwatch = swatchName;
      });
    });

    //Page 5 video on scroll
    const tlVideo = gsap.timeline({
      scrollTrigger: {
        trigger: ".fifth-page",
        start: "0%",
        end: "150%",
        scrub: true,
        pin: true,
      },
    });
    tlVideo.fromTo(
      ".product-video",
      { currentTime: 0 },
      { currentTime: 3, duration: 1 }
    );

    tlVideo.fromTo(
      ".product-info-container h3",
      { opacity: 0 },
      { opacity: 1, stagger: 0.25, duration: 0.5 },
      "<"
    );

    //6th Page
    const tlParallax = gsap.timeline({
      scrollTrigger: {
        trigger: ".sixth-page",
        start: "-25%",
        end: "50%",
        scrub: true,
      },
    });

    tlParallax.fromTo(".photo-description", { y: 0 }, { y: -80 });
    tlParallax.fromTo(".portrait-container", { y: 0 }, { y: -80 }, "<");
    tlParallax.fromTo(".phone-video", { y: 0 }, { y: -200 }, "<");

  }, { dependencies: [lenis] })

  // refencia : https://gsap.com/community/forums/topic/27708-scrolltrigger-control/
  // https://codepen.io/make96/pen/yLOaVpE

  return (
    <ReactLenis root>
      <nav>
        <a href="./index.html" className="logo">iPhone 14 Pro</a>
        <div className="nav-links">
          <a href="#">Overview</a>
          <a href="#">Switching to iPhone</a>
          <a href="#">Tech Specs</a>
          <button className="buy-button">Buy</button>
        </div>
      </nav>
      {/* 1st page */}
      <section ref={firstPageRef} className="first-page h-screen">
        <div className="first-page-text mix-blend-difference">
          <h1 className="first-page-title text-white">iPhone 14 Pro</h1>
          <h2 className="first-page-subtitle text-white">Oh. So. Pro</h2>
        </div>
        {/* <!--add front page video--> */}
        <video
          className="intro-video"
          autoPlay
          loop
          src="https://cdn.cosmos.so/3b6b18f1-2e4a-4358-a8b7-e939931b15ba.mp4"
          muted
          preload="auto"
        ></video>
      </section>
      {/* <!-- 2nd PAGE --> */}
      <section className="second-page">
        <video
          className="smoke-video"
          src="https://cdn.cosmos.so/dcdbd3de-2111-4bbf-a41e-356da304b13b.mp4"
          autoPlay
          loop
          muted
        ></video>
        {/* <img className="smoke-video" src="https://cdn.cosmos.so/81251ecf-6433-4130-b205-173ddf5a1bb2?format=jpeg" alt="" /> */}
        <div className="second-text">
          <p className="text-container">
            <span className="highlight"
            >A dramatically more powerful camera system.</span
            >
            <span className="highlight"
            >A display so responsive, every interaction feels new again.</span
            >
            <span className="highlight"> The world's fastest smartphone chip. </span>
            <span className="highlight">Exceptional durability.</span>
            <span className="highlight">And a huge leap in battery life.</span>
            <br />
            <br />
            <span className="highlight">Let's pro</span>
          </p>
        </div>
      </section>
      <section className="third-page mb-16 bg-zinc-950">
        <div className="product-text-container">
          <div className="product-text-left mix-blend-difference">
            <p className="phone-title text-white">iPhone 14 Pro Max</p>
            <p className="phone-size pro-size text-white">6.7"</p>
          </div>
          <div className="product-text-right mix-blend-difference">
            <div className="phone-title text-white">Iphone 14 Max</div>
            <p className="phone-size max-size text-white">6.1"</p>
          </div>
        </div>
        <div className="product-images absolute top-1/2 left-1/2 flex">
          <img src="../images/large-phone.png" className="large-phone" alt="" />
          <img src="../images/small-phone.png" className="small-phone" alt="" />
        </div>
        <p className="retina-line">Super Retina XDR display with ProMotion</p>
      </section>
      {/* <!--4th Page Slide--> */}
      <section className="fourth-page">
        <div className="purchase-left">
          <div ref={phoneGalleryRef} className="phone-gallery">
            <div className="phone-gallery-container blue-cont">
              <img className="blue-back" src="../images/blue-iphone-back.png" alt="" />
            </div>
            <div className="phone-gallery-container blue-cont">
              <img className="silver-back" src="../images/silver-iphone-back.png" alt="" />
            </div>
            <div className="phone-gallery-container blue-cont">
              <img className="gold-back" src="../images/gold-iphone-back.png" alt="" />
            </div>
            <div className="phone-gallery-container blue-cont">
              <img className="graphite-back" src="../images/graphite-iphone-back.png" alt="" />
            </div>
          </div>
          <div className="swatch-container">
            <div className="swatches flex justify-between">
              <img src="../images/swatch-blue.svg" swatch="blue" alt="" />
              <img src="../images/swatch-silver.svg" swatch="silver" alt="" />
              <img src="../images/swatch-gold.svg" swatch="gold" alt="" />
              <img src="../images/swatch-graphite.svg" swatch="graphite" alt="" />
            </div>
            <p><span>Sierra Blue</span>, <span>Silver</span>, <span>Gold</span>, <span>Graphite.</span></p>
          </div>
        </div>
        <div className="purchase-right">
          <img src="../images/blue-closeup.png" className="blue phone" alt="" />
          <img src="../images/silver-closeup.png" className="silver phone" alt="" />
          <img src="../images/gold-closeup.png" className="gold phone" alt="" />
          <img src="../images/graphite-closeup.png" className="graphite phone" alt="" />
        </div>
      </section>
      {/* <!--Fifth page Video scroll--> */}
      <section className="fifth-page">
        <video className="product-video" src="../images/output-2.mp4" muted></video>
        <div className="product-info-container">
          <div className="left-info">
            <h3>up to <br /><span> 25% brighter outdoors</span><br />for content that looks even more vivid in sunlight</h3>
            <h3><span>Even more display area</span><br />thanks to smaller camera system.</h3>
          </div>
          <div className="right-info">
            <h3><span>Custom OLED technology</span><br />pushes the display's incredible resolution and color right to the edge</h3>
            <h3>up to <span>1200 nits</span> peak brightness for your HDR photos and videos</h3>
          </div>
        </div>
      </section>
      <section className="sixth-page">
        <div className="photo-description">
          <h3 className="photo-title">Customize <br /> your camera to</h3>
          <h4 className="photo-subtitle">lock in your look.</h4>
        </div>
        <div className="portrait-container">
          <img src="../images/portrait.jpg" className="portrait rounded-lg" alt="" />
        </div>
        <div className="absolute z-10 left-1/3 top-1/3">
          <img className="relative z-10" src="../images/iphone-frame.png" alt="" />
          <video className="absolute top-4 left-4 rounded-3xl" src="../images/iphone-camera.mp4" autoPlay muted loop preload="auto"></video>
        </div>
      </section>
    </ReactLenis>
  )
}

export default App
