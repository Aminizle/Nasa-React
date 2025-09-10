import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function Particle() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#0b0d17", // deep space navy
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: { enable: false },
            onHover: { enable: false },
            resize: true,
          },
        },
        detectRetina: true,
        particles: {
          number: {
            value: 200,
            density: {
              enable: true,
              area: 1200,
            },
          },
          color: {
            value: ["#ffffff", "#ffe9c4", "#d4fbff"],
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 1,
            random: true,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.3,
              sync: false,
            },
          },
          size: {
            value: { min: 0.5, max: 2.5 },
          },
          move: {
            enable: true,
            speed: 0.1,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
          links: {
            enable: false,
          },
        },
        emitters: [
          {
            direction: "top-right", // shooting star angle
            rate: {
              delay: 5, // one every ~5s
              quantity: 1,
            },
            size: {
              width: 0,
              height: 0,
            },
            position: {
              x: 0,
              y: 100, // bottom-left corner
            },
            particles: {
              color: { value: "#ffffff" },
              move: {
                speed: { min: 15, max: 25 }, // fast streaks
                direction: "top-right",
                straight: true,
                outModes: { default: "destroy" },
              },
              size: {
                value: { min: 1, max: 2 },
                animation: {
                  enable: true,
                  startValue: "max",
                  count: 1,
                  speed: 5,
                  sync: true,
                },
              },
              opacity: {
                value: 1,
                animation: {
                  enable: true,
                  startValue: "max",
                  count: 1,
                  speed: 2,
                  sync: true,
                },
              },
              shape: { type: "line" },
              life: {
                duration: {
                  sync: true,
                  value: 1.5, // short-lived
                },
                count: 1,
              },
            },
          },
        ],
      }}
    />
  );
}

export default Particle;
