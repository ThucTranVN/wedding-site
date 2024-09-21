import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { HiChevronDoubleDown } from 'react-icons/hi'
import Confetti from 'confetti-react'
import Typed from 'typed.js'

import FrameImage from '../assets/imgs/frame.png'
import useTimer from '../useTimer'

const FirstBlood = 'https://b1560601.tinifycdn.com/w2.png'

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
  background-color: #e4e3ea;
  .inner_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    position: relative;
    width: 100%;
    margin: auto;
    max-width: 1800px;
    background-image: url(${FirstBlood});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    &:after {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      box-shadow: 0 0 100px 10px #e4e3ea inset;
    }
    .box {
      z-index: 99;
      margin-top: 1.2rem;
      color: #000;
      padding: 0.5rem;
      background-color: #fff;
      border-radius: 0.4rem;
      box-shadow: 0 2px 8px #ccc;
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
        font-family: 'SP-F';
        display: flex;
        font-size: 0.48rem;
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
`
// initialTime: initCountNum,
// const initCountNum = 3000;
export default function FirstView() {
  const { startTimer, stopTimer, value } = useTimer()
  const [size, setSize] = useState(null)
  const container = useRef(null)
  const el = useRef(null)
  // Create reference to store the Typed instance itself
  const typed = useRef(null)
  useEffect(() => {
    if (container) {
      setTimeout(() => {
        const { width, height } = getComputedStyle(container.current)
        setSize({ width, height })
      }, 500)
    }
    startTimer()
    return () => {
      stopTimer()
    }
  }, [])
  useEffect(() => {
    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, {
      strings: [
        'We <strong>met</strong>',
        'We <strong>got</strong> each other',
        'We <strong>fell in love</strong>',
        'We <strong>got</strong> married!'
      ],
      typeSpeed: 200,
      backSpeed: 50,
      backDelay: 1000,
      loop: true
    })

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy()
    }
  }, [])
  return (
    <StyledWrapper ref={container}>
      {size && (
        <Confetti
          width={size.width}
          height={size.height}
          className="mask"
          recycle={true}
          numberOfPieces={99}
          wind={0.01}
          gravity={0.1}
          opacity={0.8}
          tweenDuration={8000}
        />
      )}
      <div className="inner_wrapper">
        <div className="box">
          <div className="title">
            💕<span ref={el}></span>💕
          </div>
          <div className="date">
            <div className="countdown">
              <span className="num day">
                {value.day} days<br/>{value.hour} hours<br/>{value.minute} minutes<br/>{value.second} seconds
              </span>
            </div>
            <div className="time">10.11.2024</div>
          </div>
        </div>
      </div>
      <HiChevronDoubleDown className="down" />
    </StyledWrapper>
  )
}
