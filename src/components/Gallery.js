import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import LightGallery from 'lightgallery/react'
import { AsyncImage } from 'loadable-image'
import { Blur } from 'transitions-kit'
import Title from './SectionTitle'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-transitions.css'
import lgZoom from 'lightgallery/plugins/zoom'

const Loading = styled.div`
  font-size: 0.24rem;
  padding: 0.4rem 0.2rem;
  text-align: center;
`
const StyledWrapper = styled.section`
  min-height: 50vh;
  width: 100%;
  max-width: 2200px;
  margin: auto;
  .wrapper {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */

    /* Remove custom scrollbar to avoid layout reflows */
    &::-webkit-scrollbar { 
        display: none; 
    } 
    width: 100%;
    max-height: 200vh;  
    overflow: auto;
    will-change: transform;

    .lg-react-element {
      margin: 12px; 
      column-count: 4;
      @media screen and (max-width: 1500px) {
        column-count: 3;
      }
      @media screen and (max-width: 768px) {
        column-count: 3;
      }
      column-gap: 0.14rem;
      .picture {
        cursor: pointer;
        max-width: auto;
        margin: 0 auto 5px auto;
        border: 5px;
        img {
          border: 3px solid #ccc;
          width: 100%;
          border: 5px;
          border-radius: 14px;
        }
      }
    }
    @media screen and (max-width: 414px) {
      padding: 0 0.02rem;
      .lg-react-element {
        column-count: 3;
        .picture img {
          border: none;
        }
      }
    }
  }
  .btns {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 0.1rem;
    .group {
      display: flex;
      .btn {
        background: #EECDA3;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to top, #EF629F, #EECDA3);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to top, #EF629F, #EECDA3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        margin: 0;
        transition: all 0.6s ease-in-out;
        cursor: pointer;
        border: none;
        font-size: 0.3rem;
        padding: 0.08rem 0.3rem;
        &:first-child {
          padding-left: 0.6rem;
          border-top-left-radius: 30px;
          border-bottom-left-radius: 30px;
        }
        &:last-child {
          padding-right: 0.6rem;
          border-top-right-radius: 30px;
          border-bottom-right-radius: 30px;
        }
        &.curr {
          color: #fff;
          background-color: green;
        }
      }
    }
  }

  .preLoad
  {
    border-radius: 14px;
    background: #3a6186;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #89253e, #3a6186);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #89253e, #3a6186); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
`

const weddings = Array.from(Array(36).keys())
  .map((v, idx) => `w${idx + 1}`)
const dailys = Array.from(Array(60).keys())
  .map((v, idx) => `d${idx + 1}`)
  .filter((p) => !['d30', 'd36', 'd50', 'd51', 'd52','d53', 'd54','d55', 'd56', 'd57','d58', 'd59'].includes(p))

// console.log({ weddings })
const GalleryInstance = ({ popupDan, cate = 'wedding', photos = [] }) => {
  const viewCount = useRef(0)
  const title = {
    wedding: 'Our wedding photo',
    dailys: 'Our daily photo'
  }
  const [reiniting, setReiniting] = useState(false)
  // console.log({ photos })
  const onInit = (detail) => {
    console.log('lightGallery has been initialized', detail)
  }
  const handleSlideAfter = () => {
    viewCount.current = viewCount.current + 1
    // console.log(viewCount.current)
  }
  const handleLgClose = () => {
    // console.log('lg close')
    if (viewCount.current >= 30) {
      popupDan('Our sweet memories')
    }
  }
  const handleLgOpen = () => {
    viewCount.current = 0
  }
  useEffect(() => {
    setReiniting(true)
    const inter = setTimeout(() => {
      setReiniting(false)
    }, 1000)
    return () => {
      clearTimeout(inter)
    }
  }, [photos])

  return reiniting ? (
    <Loading>Loading...</Loading>
  ) : (
      <LightGallery
        onAfterClose={handleLgClose}
        onAfterOpen={handleLgOpen}
        onAfterSlide={handleSlideAfter}
        mode={cate == 'wedding' ? 'lg-zoom-in-big' : 'lg-slide-vertical-growth'}
        onInit={onInit}
        speed={500}
        plugins={[lgZoom]}
        mobileSettings={{
          controls: true,
          showCloseButton: true,
          download: false
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo}
            className="picture"
            data-sub-html={`<h4>${title[cate]}</h4>`}
            data-src={`https://alike-pine-brand.glitch.me/images/${photo}.jpg`}
          >
            <AsyncImage
                style={{ width: "100%", height: "auto", aspectRatio: 16 / 9 }}
                src={`https://alike-pine-brand.glitch.me/images/${photo}.jpg`}
                loader={<div className='preLoad'/>}
                alt={photo}
                Transition={Blur}
              />
          </div>
        ))}
      </LightGallery>
  )
}
export default function Gallery({ popupDan }) {
  const [cate, setCate] = useState('wedding')
  const [photos, setPhotos] = useState(weddings)

  const handleCateClick = (evt) => {
    const { cate } = evt.target.dataset
    setCate(cate)
    setPhotos(cate == 'wedding' ? weddings : dailys)
  }
  return (
    <StyledWrapper>
      <Title title="Memories · Gallery" />
      <div className="btns">
        <div className="group">
          <button
            className={`btn ${cate == 'wedding' ? 'curr' : ''}`}
            data-cate="wedding"
            onClick={handleCateClick}
          >
            Wedding photo
          </button>
          <button
            className={`btn ${cate == 'dailys' ? 'curr' : ''}`}
            data-cate="dailys"
            onClick={handleCateClick}
          >
            Daily photo
          </button>
        </div>
      </div>
      <div className="wrapper">
        <GalleryInstance cate={cate} photos={photos} popupDan={popupDan} />
      </div>
    </StyledWrapper>
  )
}
