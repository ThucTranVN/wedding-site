import React, { useRef, useEffect } from 'react'
import Confetti from 'confetti-react'
import styled, { keyframes } from 'styled-components'
import { MdClose } from 'react-icons/md'
import Typed from 'typed.js'

const AniBounceIn = keyframes`
 from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`
const StyledPopup = styled.section`
  z-index: 99999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(2, 2, 2, 0.8);
  .tip {
    box-sizing: border-box;
    width: 5rem;
    z-index: 9;
    position: absolute;
    top: 20%;
    left: 50%;
    margin-left: -2.5rem;
    padding: 0.4rem 0.3rem;
    font-size: 0.3rem;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${AniBounceIn} 1s both;
    .title {
      font-size: 0.3rem;
      font-weight: 800;
    }
    .content {
      margin: 0.2rem 0;
      color: #333;
      font-size: 0.2rem;
      padding: 0.3rem 0;
      word-break: break-all;
      width: 100%;
      p {
        margin-bottom: 0.14rem;
        line-height: 1.5;
      }
      strong {
        font-weight: 800;
        padding: 0 0.05rem;
        color: #000;
      }
    }
    .ps {
      font-size: 0.12rem;
      color: #ccc;
      align-self: flex-start;
    }
    .close {
      cursor: pointer;
      position: absolute;
      left: 50%;
      bottom: -0.8rem;
      transform: translate3d(-50%, 0, 0);
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 50%;
      border: 1px solid #eee;
      padding: 0.05rem;
    }
  }
`
export default function Celebrate({ closeDan, dan = 'Super long memory egg' }) {
  const el = useRef(null)
  // Create reference to store the Typed instance itself
  const typed = useRef(null)
  useEffect(() => {
    if (dan) {
      // elRef refers to the <span> rendered below
      typed.current = new Typed(el.current, {
        strings: [
          `<p>Great!!! </p>
<p>Found an Easter egg: <strong>${dan}</strong>, take a screenshot to save this interface, collect <strong>two Easter eggs</strong>, and then you can find the groom 🤵🏻 to exchange for a small gift carefully prepared by the couple! </p>
<p>Free and free shipping, only 10 pieces available, while stocks last. </p>`
        ],
        typeSpeed: 30,
        showCursor: false
      })
    }

    return () => {
      if (dan) {
        // Make sure to destroy Typed instance during cleanup
        // to prevent memory leaks
        typed.current.destroy()
      }
    }
  }, [dan])
  return (
    <StyledPopup>
      <Confetti gravity={0.2} numberOfPieces={300} />
      <div className="tip">
        <h3 className="title">Congratulations🎉🎉🎉</h3>
        <div className="content" ref={el}></div>
        <div className="ps">* The final right of interpretation of the event belongs to the groom</div>
        <div className="close" onClick={closeDan}>
          <MdClose color="#fff" />
        </div>
      </div>
    </StyledPopup>
  )
}
