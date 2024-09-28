import React, { useState, useEffect, useRef, useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import Confetti from 'confetti-react'
import Typed from 'typed.js'
import FrameImage from '../assets/imgs/frame.png'
import useTimer from '../useTimer'
import LocationContext from './LocationContext'; // Import the LocationContext
import { HiChevronDoubleDown } from 'react-icons/hi'
import { AsyncImage } from 'loadable-image'
import { Blur } from 'transitions-kit'

const BGImg = 'https://alike-pine-brand.glitch.me/images/w2.jpg'

const AniDown = keyframes`
    from{
        transform:translateY(-10px);
        opacity:.1;
    }
    to{
        opacity:1;
        transform:translateY(0);
    }
`


const StyledWrapper = styled.section`

  .inner_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    max-width: 2200px;
    margin: auto;
    height: 100vh;
    .bg
    {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    @media screen and (max-width: 1024px) {
      background-size: contain; /* Contain image for smaller screens */
      background-attachment: scroll; /* Prevent issues on smaller devices */
      background-position-y: 100%;
    }

    /* Shadow effect behind the background image */
    &:after {
      position: absolute;
      width: 100%;  /* Cover the entire width */
      height: 100%; /* Cover the entire height */
      top: 0;
      left: 0;
      box-shadow: 0 0 100px 10px rgba(0, 0, 0, 0) inset; /* Shadow inside the box */
      z-index: 1; /* Keep it behind other content */
    }

    .box {
      z-index: 99;
      color: #000;
      padding: 0.5rem;
      background-color: #fff;
      border-radius: 0.4rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      background-image: url(${FrameImage});
      background-repeat: no-repeat;
      background-size: 90%;
      background-position: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      filter: opacity(0.8);
      width: 3.8rem;
      height: 3.8rem;

      .title {
        font-family: 'AutumnInNovember';
        display: flex;
        font-size: 0.3rem;
        padding: 0.2rem 0;
        margin-bottom: 0.2rem;

        span {
          white-space: nowrap;

          strong {
            font-weight: bold;
            color: #be5678;
          }
        }
      }

      .date {
        display: flex;
        flex-direction: column;
        align-items: center;

        .time {
          font-size: 0.16rem;
          color: #999;
          margin-top: 0.12rem;
        }

        .countdown {
          font-family: monospace;
          font-weight: 800;
          font-size: 0.2rem;
          color: #666;
        }
      }
    }
  }

  .down {
    position: absolute;
    width: 0.44rem;
    left: 50%;
    bottom: 0.1rem;
    margin-left: -0.22rem;
    animation-direction: alternate-reverse;
    animation: ${AniDown} 1s infinite;
  }

`;

// initialTime: initCountNum,
// const initCountNum = 3000;
export default function FirstView() {
  const { value } = useTimer(); // useTimer now gets initTime based on location context
  const [size, setSize] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(16 / 9); // Initial aspect ratio for desktop
  const container = useRef(null);
  const el = useRef(null);
  const typed = useRef(null);

    // Access the location from the LocationContext
    const location = useContext(LocationContext);

      // Define the details for different locations
  const weddingDetails = {
    sg: {
      date: '10.11.2024'
    },
    lt: {
      date: '13.10.2024'
    },
    tn: {
      date: '27.10.2024'
    },
  };

    // Set default wedding details if location is not found
    const {date} = weddingDetails[location] || weddingDetails.sg;

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;

      // Switch aspect ratio for mobile and desktop
      if (viewportWidth <= 1024) {
        setAspectRatio(9 / 16); // Mobile aspect ratio
      } else {
        setAspectRatio(16 / 9); // Desktop aspect ratio
      }
    }

    // Check if the container reference is attached before accessing getComputedStyle
    if (container.current) {
      setTimeout(() => {
        const { width, height } = getComputedStyle(container.current);
        setSize({ width, height });
      }, 500);
    }

        // Set initial size and aspect ratio
        handleResize();

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };

  }, [container]); // Add container to the dependencies to make sure it's initialized

  useEffect(() => {
    typed.current = new Typed(el.current, {
      strings: [
        'We <strong>met</strong>',
        'We <strong>fell in love</strong>',
        'We <strong>got married</strong>!',
      ],
      typeSpeed: 200,
      backSpeed: 50,
      backDelay: 1000,
      loop: true,
    });

    return () => {
      typed.current.destroy();
    };
  }, []);

  return (
    <StyledWrapper ref={container}>
      {size && (
        <Confetti
          width={size.width}
          height={size.height}
          recycle={true}
          numberOfPieces={99}
          wind={0.01}
          gravity={0.1}
          opacity={0.8}
          tweenDuration={8000}
        />
      )}
      <div className="inner_wrapper">
      <div className="bg">
      <AsyncImage
                style={{ width: "100%", height: "auto", aspectRatio}}
                src={BGImg}
                loader={<div className='preLoad'/>}
                Transition={Blur}
              />
      </div>
        <div className="box">
          <div className="title">
            💕<span ref={el}></span>💕
          </div>
          <div className="date">
            <div className="countdown">
              <span className="num day">
                {value.day} days<br />{value.hour} hours<br />{value.minute} minutes<br />{value.second} seconds
              </span>
            </div>
            <div className="time">{date}</div>
          </div>
        </div>
      </div>
      <HiChevronDoubleDown className="down" />
    </StyledWrapper>
  );
}