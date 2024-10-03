import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import Title from './SectionTitle'
import LocationContext from './LocationContext'; // Import the LocationContext
import { AsyncImage } from 'loadable-image'
import { Blur } from 'transitions-kit'

const WeddingImage = 'https://alike-pine-brand.glitch.me/images/d8.jpg';

const StyledWrapper = styled.section`
  z-index: 1;
  width: 100%;
  margin: auto;
  max-width: 2200px;

  .wrapper {
    max-width: 2200px;
    height: 100vh;
    margin: 2rem auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    position: relative; /* Ensure this wrapper is positioned for z-index context */

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
      
    .bg {
      position: absolute; /* Absolute position to stretch */
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .box {
      min-height: 2rem;
      width: 4rem;
      background-color: rgba(2, 2, 2, 0.5);
      z-index: 9; /* Higher z-index to stay on top of background */
      color: #fff;
      padding: 0.25rem 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: 0.2rem;
      border-radius: 20px;
      position: relative; /* Ensure it's within the stacking context */
      
      @media screen and (max-width: 768px) {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin-top: -2.5rem;
        flex-direction: column;
      }

      .title {
        font-size: 0.3rem;
        width: 100%;
        text-align: center;
        border-bottom: 1px solid rgba(222, 222, 222, 0.4);
        padding-bottom: 0.2rem;
      }

      .items {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0.2rem 0;

        .item {
          font-size: 0.22rem;
          display: flex;
          align-items: center;
          margin: 0.1rem 0;

          .label {
            color: #ccc;
            white-space: nowrap;

            &:after {
              content: '：';
            }
          }

          .txt {
            white-space: nowrap;
            font-weight: 800;

            &.loc {
              display: flex;
              flex-direction: column;

              .map {
                margin-top: 0.12rem;
                width: 2.4rem;
                height: 2.4rem;

                img {
                  width: 100%;
                  height: 100%;
                  border: 1px solid #ccc;
                  border-radius: 10px;
                }

                &:hover img {
                  box-shadow: 0px 1px 20px black;
                }
              }
            }
          }

          @media screen and (max-width: 768px) {
            flex-direction: column;

            .label {
              margin-bottom: 0.12rem;
            }
          }
        }
      }
    }
  }
`;


export default function Wedding() {
  const [size, setSize] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(16 / 9); // Initial aspect ratio for desktop
  const container = useRef(null);
  const el = useRef(null);
  const typed = useRef(null);

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


  // Access the location from the LocationContext
  const location = useContext(LocationContext);

  // Define the details for different locations
  const weddingDetails = {
    sg: {
      date: '10.11.2024 11:00 AM',
      venue: 'Maison De Charme',
      mapUrl: 'https://maps.app.goo.gl/B2PbiPWjK9LEcWxi9',
    },
    lt: {
      date: '13.10.2024 11:00 AM',
      venue: 'Thanh Khiet Wedding Restaurant',
      mapUrl: 'https://maps.app.goo.gl/WManTnyTXW68uom87',
    },
    tn: {
      date: '27.10.2024 11:00 AM',
      venue: 'Sunrise Cana Restaurant',
      mapUrl: 'https://maps.app.goo.gl/kdzokCpSpCmpKGqy8',
    },
  };


  // Set default wedding details if location is not found
  const { date, venue, mapUrl } = weddingDetails[location] || weddingDetails.sg;

  return (
    <StyledWrapper>
      <Title title="Event Venue" /> 
      <div className="wrapper">
      <div className="bg">
      <AsyncImage
                style={{ width: "100%", height: "auto", aspectRatio}}
                src={WeddingImage}
                loader={<div className='preLoad'/>}
                Transition={Blur}
              />
        </div>
        <div className="box">
          <h3 className="title">Wedding Party</h3>
          <ul className="items">
            <li className="item">
              <span className="label">Time</span>
              <span className="txt">{date}</span>
            </li>
            <li className="item">
              <span className="label">Location</span>
              <a href={mapUrl} target='_blank'> <span className="txt">{venue}</span></a>
            </li>
          </ul>
        </div>
      </div>
    </StyledWrapper>
  )
}
