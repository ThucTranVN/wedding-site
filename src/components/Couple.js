import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Title from './SectionTitle'
import FrameImage from '../assets/imgs/frame-removebg.png'
import EIu from '../assets/imgs/eiu.png'
import AIu from '../assets/imgs/aiu.png'

const StyledWrapper = styled.section`
  width: 100%;
  .cp {
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 414px) {
      flex-direction: column;
      margin: 0;
    }

    @media screen and (min-width: 415px) and (max-height: 600px) {
      /* Landscape mode with specific height */
      flex-direction: row;
    }

    @media (orientation: portrait) {
      /* Portrait mode */
      flex-direction: column;
      margin: 0;
    }

    @media (orientation: landscape) {
      /* Landscape mode */
      flex-direction: row;
      margin: 0.4rem;
    }

    .profile {
      -webkit-text-stroke-width: 0.2px;
      -webkit-text-stroke-color: black;
      color: #222;
      padding: 0.4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 0.4rem;

      .pic {
        width: 3rem;
        height: 3rem;
        background-repeat: no-repeat;
        background-size: 75%, 100%;
        background-position: center;
        overflow: hidden;

        &.boy {
          background-position-y: 62%;
          background-image: url(${AIu}), url(${FrameImage});
        }
        &.girl {
          background-size: 70%;
          background-position-x: 45%;
          background-position-y: 62%;
          background-image: url(${EIu}), url(${FrameImage});
        }

        img {
          width: 100%;
          height: 100%;
        }
      }

      .name {
        font-family: 'AutumnInNovember';
        font-size: 0.4rem;
        padding: 0.2rem 0;
        margin: 0.2rem 0;
      }

      .intro {
        font-size: 0.12rem;
        white-space: nowrap;
      }
    }
  }
`;

const tips = {
  h: {
    m: 'left',
    w: 'right'
  },
  v: {
    m: 'above',
    w: 'below'
  }
}
export default function Couple({ popupDan }) {
  const [pos, setPos] = useState('v')
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkScreenSize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Example logic: set 'v' for portrait, 'h' for landscape
        if (height > width) {
          setPos('v'); // Portrait
        } else {
          setPos('h'); // Landscape
        }
      };

      // Run the check on mount and on window resize
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);

      // Cleanup the event listener on unmount
      return () => window.removeEventListener('resize', checkScreenSize);
    }
  }, []);

  const handleDC = () => {
    popupDan('Bride · Groom')
  }
  return (
    <StyledWrapper>
      <Title title="Bride · Groom" />
      <div className="cp">
      <div className="profile">
          <div className="pic girl" onDoubleClick={handleDC}>
            <img src={FrameImage} alt="Bride" />
          </div>
          <div className="name">Phương Thảo👰🏻</div>
          <div className="intro">
          There are three things I cannot live without: water, air, and that man on the {tips[pos].w}
          </div>
        </div>
        <div className="profile">
          <div className="pic boy" onDoubleClick={handleDC}>
            <img src={FrameImage} alt="Groom" />
          </div>
          <div className="name">Kiến Thức🤵🏻</div>
          <div className="intro">
          There are three things I cannot live without: water, air, and that woman on the {tips[pos].m}
          </div>
        </div>

      </div>
    </StyledWrapper>
  )
}
