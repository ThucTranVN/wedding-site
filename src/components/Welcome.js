import React, { useEffect } from 'react'
import styled from 'styled-components'
import Title from './SectionTitle'
import useTimer from '../useTimer'

const StyledWrapper = styled.section`
  width: 100%;
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    .countdown {
      width: 100%;
      opacity: 0.8;
      padding: 0.3rem 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 0.24rem;
      .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.35rem;
        width: 1.4rem;
        height: 1.4rem;
        border: 1px solid #000000;
        border-radius: 50%;
        color: black;
        .num {
          font-weight: 800;
          font-size: 0.8rem;
          margin-bottom: 0.1rem;
        }
        .txt {
          font-size: 0.2rem;
        }
      }
      @media screen and (max-width: 768px) {
        /* flex-direction: column; */
        .box {
          width: 0.6rem;
          height: 0.6rem;
          .num {
            font-size: 0.4rem;
            .txt {
              font-size: 0.1rem;
            }
          }
        }
      }
    }

    .cele {
      color: #212121;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.8;
      .flowers {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: hidden;
      }
      .txt {
        white-space: nowrap;
        font-family: 'AutumnInNovember';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        font-size: 0.5rem;
        padding: 0.1rem 0.3rem;
      }
    }
  }
`

export default function Welcome() {
  const { value } = useTimer();
  return (
    <StyledWrapper>
      <Title title="Welcome to our wedding" /> 
      <div className="wrapper">
        <div className="countdown">
          <div className="box">
            <span className="num day">{value.day}</span>
            <span className="txt">days</span>
          </div>
          <div className="box">
            <span className="num hour">{value.hour}</span>
            <span className="txt">hours</span>
          </div>
          <div className="box">
            <span className="num min">{value.minute}</span>
            <span className="txt">minutes</span>
          </div>
          <div className="box">
            <span className="num second">{value.second}</span>
            <span className="txt">seconds</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  )
}
