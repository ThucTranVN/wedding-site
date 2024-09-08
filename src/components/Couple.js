import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Title from './SectionTitle'
import FrameImage from '../assets/imgs/frame.png'
import EIu from '../assets/imgs/eiu.png'
import AIu from '../assets/imgs/aiu.png'

const StyledWrapper = styled.section`
  width: 100%;
  background-color: #fff;
  padding: 0.3rem 0;
  .cp {
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 414px) {
      flex-direction: column;
      margin: 0;
    }
    .profile {
      color: #222;
      padding: 0.4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 0.4rem;
      .pic {
        width: 2.8rem;
        height: 2.8rem;
        background-repeat: no-repeat;
        background-size: 80%, 100%;
        background-position: center;
        overflow: hidden;
        &.boy {
          background-image: url(${AIu}),
            url(${FrameImage});
        }
        &.girl {
          background-image: url(${EIu}),
            url(${FrameImage});
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        font-family: 'SP-F';
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
`
const tips = {
  h: {
    m: 'trái',
    w: 'phải'
  },
  v: {
    m: 'trên',
    w: 'dưới'
  }
}
export default function Couple({ popupDan }) {
  const [pos, setPos] = useState('h')
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 414) {
        setPos('v')
      }
    }
  }, [])
  const handleDC = () => {
    popupDan('双击666')
  }
  return (
    <StyledWrapper>
      <Title title="Cô dâu · Chú rể" />
      <div className="cp">
      <div className="profile">
          <div className="pic girl" onDoubleClick={handleDC}>
            <img src={FrameImage} alt="man" />
          </div>
          <div className="name">Chu Thảo👰🏻</div>
          <div className="intro">
          Có ba thứ tui không thể sống thiếu: nước, không khí và người đàn ông ở bên {tips[pos].w} đó
          </div>
        </div>
        <div className="profile">
          <div className="pic boy" onDoubleClick={handleDC}>
            <img src={FrameImage} alt="man" />
          </div>
          <div className="name">Kiến Thức🤵🏻</div>
          <div className="intro">
          Có ba thứ tui không thể sống thiếu: nước, không khí và người phụ nữ ở bên {tips[pos].m} đó
          </div>
        </div>

      </div>
    </StyledWrapper>
  )
}
