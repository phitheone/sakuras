import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
//import Player from "react-material-music-player";
//import Player, { Track, PlayerInterface } from "react-material-music-player";
import "./App.css";

import intro from "./images/intro.png";
import introbtn from "./images/introbtn.png";
import day from "./images/day.png";
import night from "./images/night.jpg";
import daybtn from "./images/daybtn.png";
import nightbtn from "./images/nightbtn.png";
import prev from "./images/back.png";
import next from "./images/forward.png";
import playbtn from "./images/play.png";
import pausebtn from "./images/pause.png";
import petal from "./images/sakura_petal.png";

import track1 from "./music/1.mp3";
import track2 from "./music/2.mp3";
import track3 from "./music/3.mp3";
import track4 from "./music/4.mp3";
import track5 from "./music/5.mp3";
import track6 from "./music/6.mp3";

const tracks = [track1, track2, track3, track4, track5, track6];

function App() {
  const [siteState, setSiteState] = useState("intro");

  const [isPlaying, setIsPlaying] = useState(true);
  const [songIndex, setSongIndex] = useState(3);

  const openSite = () => {
    setSiteState("day");
    audioElem.current.play();
  };

  const audioElem = useRef();

  const playingButton = () => {
    if (isPlaying) {
      //pause(); // this will pause the audio
      audioElem.current.pause();
      setIsPlaying(false);
    } else {
      //play(); // this will play the audio
      audioElem.current.play();
      setIsPlaying(true);
    }
  };

  const skipAhead = () => {
    if (isPlaying) {
      if (songIndex === 5) {
        setSongIndex(0);
      } else {
        setSongIndex(songIndex + 1);
      }
      setTimeout(() => {
        audioElem.current.autoplay = true;
        audioElem.current.play();
      }, 1200);
    }
  };

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  const skipBack = () => {
    if (isPlaying) {
      if (songIndex === 0) {
        setSongIndex(tracks.length - 1);
      } else {
        setSongIndex(songIndex - 1);
      }
      setTimeout(() => {
        audioElem.current.autoplay = true;
        audioElem.current.play();
      }, 1200);
    }
  };

  // useEffect(() => {
  //   if (audioElem.current.ended) {
  //     skipAhead();
  //   }
  // }, [audioElem.current.ended]);

  return (
    <div className="App">
      <AnimatePresence mode="sync" initial={false}>
        {siteState === "intro" && (
          <motion.div
            key="introkey"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 3 }}
            transition={{ type: "tween", duration: 1 }}
            className="Page"
          >
            <motion.img src={intro} alt="introbg" className="DayNightBg" />

            <motion.img
              src={introbtn}
              alt="introbtn"
              className="IntroBtnImg"
              onClick={() => openSite()}
              whileHover={{ scale: 1.1 }}
            />
          </motion.div>
        )}
        {siteState === "day" && (
          <motion.div
            key="daykey"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ type: "tween", duration: 0.5 }}
            className="Page"
          >
            <motion.img src={day} alt="daybg" className="DayNightBg" />

            <Particles
              id="tsparticles"
              init={particlesInit}
              loaded={particlesLoaded}
              options={{
                particles: {
                  number: {
                    value: 14,
                    density: {
                      enable: true,
                      value_area: 800,
                    },
                  },
                  shape: {
                    type: "image",
                    stroke: {
                      width: 0,
                      color: "#000000",
                    },
                    image: {
                      src: "img/sakura_petal.png",
                      width: 100,
                      height: 100,
                    },
                    rotate: {
                      animation: {
                        enable: true,
                        speed: { min: 10, max: 20 },
                      },
                    },
                    tilt: {
                      enable: true,
                      value: {
                        min: 0,
                        max: 360,
                      },
                      animation: {
                        enable: true,
                        speed: { min: 10, max: 20 },
                      },
                    },
                    roll: {
                      darken: {
                        enable: true,
                        value: 25,
                      },
                      enlighten: {
                        enable: true,
                        value: 25,
                      },
                      enable: true,
                      speed: {
                        min: 15,
                        max: 25,
                      },
                    },
                    wobble: {
                      distance: 30,
                      enable: true,
                      speed: {
                        min: -15,
                        max: 15,
                      },
                    },
                  },
                  opacity: {
                    value: 1,
                    random: true,
                    anim: {
                      enable: false,
                      speed: 1,
                      opacity_min: 0.7,
                      sync: false,
                    },
                  },
                  size: {
                    value: 15.782952832645451,
                    random: true,
                    anim: {
                      enable: false,
                      speed: 40,
                      size_min: 0.1,
                      sync: false,
                    },
                  },
                  line_linked: {
                    enable: false,
                    distance: 500,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 2,
                  },
                  move: {
                    enable: true,
                    speed: 4.734885849793636,
                    direction: "bottom-left",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                      enable: false,
                      rotateX: 600,
                      rotateY: 1200,
                    },
                  },
                },
                interactivity: {
                  detect_on: "canvas",
                  events: {
                    onhover: {
                      enable: true,
                      mode: "repulse",
                    },
                    onclick: {
                      enable: true,
                      mode: "repulse",
                    },
                    resize: false,
                  },
                  modes: {
                    grab: {
                      distance: 400,
                      line_linked: {
                        opacity: 0.5,
                      },
                    },
                    bubble: {
                      distance: 400,
                      size: 4,
                      duration: 0.3,
                      opacity: 1,
                      speed: 3,
                    },
                    repulse: {
                      distance: 120,
                      duration: 0.4,
                    },
                    push: {
                      particles_nb: 4,
                    },
                    remove: {
                      particles_nb: 2,
                    },
                  },
                },
                retina_detect: true,
              }}
            />
            <motion.img
              src={daybtn}
              alt="daynightbtn"
              onClick={() => setSiteState("night")}
              className="DayNightSwitch"
            />
          </motion.div>
        )}
        {siteState === "night" && (
          <motion.div
            key="nightkey"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 1, scale: 1 }}
            transition={{ type: "tween", duration: 0.5 }}
            className="Page"
          >
            <motion.img src={night} alt="nightbg" className="DayNightBg" />
            <Particles
              id="tsparticles"
              init={particlesInit}
              loaded={particlesLoaded}
              options={{
                particles: {
                  number: {
                    value: 15,
                    density: {
                      enable: true,
                      value_area: 1683.5826639087988,
                    },
                  },
                  shape: {
                    type: "image",
                    stroke: {
                      width: 0,
                      color: "#000000",
                    },
                    polygon: {
                      nb_sides: 5,
                    },
                    image: {
                      src: "img/firefly.png",
                      width: 100,
                      height: 100,
                    },
                  },
                  opacity: {
                    value: 1,
                    random: true,
                    anim: {
                      enable: false,
                      speed: 1,
                      opacity_min: 0.1,
                      sync: false,
                    },
                  },
                  size: {
                    value: 25.782952832645451,
                    random: true,
                    anim: {
                      enable: false,
                      speed: 40,
                      size_min: 0.1,
                      sync: false,
                    },
                  },
                  line_linked: {
                    enable: false,
                    distance: 500,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 2,
                  },
                  move: {
                    enable: true,
                    speed: 2.734885849793636,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                      enable: true,
                      rotateX: 881.8766334760375,
                      rotateY: 7295.524876938129,
                    },
                  },
                },
                interactivity: {
                  detect_on: "canvas",
                  events: {
                    onhover: {
                      enable: true,
                      mode: "bubble",
                    },
                    onclick: {
                      enable: true,
                      mode: "repulse",
                    },
                    resize: false,
                  },
                  modes: {
                    grab: {
                      distance: 400,
                      line_linked: {
                        opacity: 0.5,
                      },
                    },
                    bubble: {
                      distance: 400,
                      size: 4,
                      duration: 0.3,
                      opacity: 1,
                      speed: 3,
                    },
                    repulse: {
                      distance: 81.20772123013451,
                      duration: 0.4,
                    },
                    push: {
                      particles_nb: 4,
                    },
                    remove: {
                      particles_nb: 2,
                    },
                  },
                },
                retina_detect: true,
              }}
            />
            <motion.img
              src={nightbtn}
              alt="daynightbtn"
              onClick={() => setSiteState("day")}
              className="DayNightSwitch"
            />
          </motion.div>
        )}
      </AnimatePresence>
      {(siteState === "day" || siteState === "night") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="Player"
        >
          {/*===========PLAYER============*/}
          <div className="component">
            <button className="playButtonS" onClick={skipBack}>
              <img src={prev} alt="prev_song" />
            </button>
            {!isPlaying ? (
              <button className="playButton" onClick={playingButton}>
                <img src={playbtn} alt="play_song" />
              </button>
            ) : (
              <button className="playButton" onClick={playingButton}>
                <img src={pausebtn} alt="pause_song" />
              </button>
            )}
            <button className="playButtonS" onClick={skipAhead}>
              <img src={next} alt="next_song" />
            </button>
          </div>
        </motion.div>
      )}
      <audio src={tracks[songIndex]} ref={audioElem} onEnded={skipAhead} />
    </div>
  );
}

export default App;
