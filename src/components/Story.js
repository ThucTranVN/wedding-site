import React from 'react'
import styled, { keyframes } from 'styled-components'
import Title from './SectionTitle'
import LoveStoryIcon from '../assets/imgs/love-story.png';
import { AsyncImage } from 'loadable-image'
import { Blur } from 'transitions-kit'

const AniBeating = keyframes`
    from{
        opacity:.1;
    }
    to{
        opacity:1;
    }
`
const StyledWrapper = styled.section`
  width: 100%;

  .tl {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .items {
      overflow-y: scroll;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      -ms-overflow-style: none;  /* Internet Explorer 10+ */
      scrollbar-width: none;  /* Firefox */

      /* Remove custom scrollbar to avoid layout reflows */
      &::-webkit-scrollbar { 
          display: none; 
      } 
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 0.4rem;
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        scrollbar-width: none;  /* Firefox */

        /* Remove custom scrollbar to avoid layout reflows */
        &::-webkit-scrollbar { 
            display: none; 
        } 
        .content {

          position: relative;
          bbackground: #D3CCE3;  /* fallback for old browsers */
          background: -webkit-linear-gradient(to right, #E9E4F0, #D3CCE3);  /* Chrome 10-25, Safari 5.1-6 */
          background: linear-gradient(to right, #E9E4F0, #D3CCE3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 2px solid #222;
          padding: 0.2rem;
          border-radius: 0.12rem;
          width: 4rem;

          .title {
            font-size: 0.3rem;
          }

          .date {
            margin: 0.1rem 0;
            font-style: oblique;
            font-size: 0.12rem;
            color: #666;
          }

          .desc {
            -ms-overflow-style: none;  /* Internet Explorer 10+ */
            scrollbar-width: none;  /* Firefox */

            /* Remove custom scrollbar to avoid layout reflows */
            &::-webkit-scrollbar { 
                display: none; 
            } 
            height: 1.5rem;
            overflow: scroll;
            line-height: 1.5;
            margin-top: 0.12rem;
            font-size: 0.15rem;
            display: flex;
            flex-direction: column;

            span {
              margin-bottom: 0.1rem;
            }
          }
        }

        &:nth-child(even) {
          flex-direction: row-reverse;
        }

        .heart {
          margin: 0 0.2rem;
          font-size: 0.3rem;
          animation: ${AniBeating} 1s ease-in-out infinite;
          animation-direction: alternate;
          animation-delay: inherit;
        }

        .pic {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;

          img {
            z-index: 8;
            border-radius: 50%;
            border: 2px solid #222;
            width: 2rem;
            height: 2rem;
            object-fit: cover;
          }
        }

        /* For smaller screens */
        @media screen and (max-width: 414px) {
          flex-direction: column-reverse;

          .heart {
            margin: 0.2rem 0;
          }

          &:nth-child(even) {
            flex-direction: column-reverse;
          }
        }

        /* For landscape screens with constrained height */
        @media screen and (min-width: 415px) and (max-height: 600px) {
          flex-direction: row;

          // .heart {
          //   margin: 0 0.2rem;
          // }

          &:nth-child(even) {
            flex-direction: row-reverse;
          }
        }

        /* Portrait orientation */
        @media (orientation: portrait) {
          flex-direction: column-reverse;

          .heart {
          width: 0.6rem; /* Match the font-size */
          height: 0.6rem; /* Match the font-size */
          margin-top: 0.5rem; /* Add spacing between icon and name */
          margin-bottom: 0.5rem; /* Add spacing between icon and name */
          }

          &:nth-child(even) {
            flex-direction: column-reverse;
          }
        }

        /* Landscape orientation */
        @media (orientation: landscape) {
          flex-direction: row;

          .heart {
          margin: 0 0.2rem;
          width: 0.4rem; /* Match the font-size */
          height: 0.4rem; /* Match the font-size */
          margin-right: 0.5rem; /* Add spacing between icon and name */
          margin-left: 0.5rem; /* Add spacing between icon and name */
          }

          &:nth-child(even) {
            flex-direction: row-reverse;
          }
        }
      }
    }
  }

  .preLoad
  {
    border-radius: 50%;
    background: #3a6186;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #89253e, #3a6186);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #89253e, #3a6186); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
`;

const prefix =
  'https://alike-pine-brand.glitch.me/images/'
const items = [
  {
    title: 'Encounter: Luck casts a spell',
    datetime: '',
    desc: `<span>Our first meeting happens at a company party. Although it was our first contact, it felt like we had known each other for a long time. This familiar and surprising feeling made us get closer to each other little by little. </span>`,
    picture: `${prefix}/story/s1.jpg`
  },
  {
    title: 'Understanding: The meaning of love',
    datetime: '',
    desc: `<span>Cupid's arrow hit us, and the air was filled with the sweet smell of love.</span>
    <span>She was so beautiful in my eyes.</span>
    <span>We both love nature and the animals.</span>
    <span>We are fond of traveling to Dalat, the location where I proposed.</span>
    <span>We enjoy viewing travel vlogs, romantic films, and enjoying our rice paper (which she prefers the most) while watching.</span>
    <span>It was inevitable that there would be discord in our lives when we were together.</span>
    <span>Fortunately, we have the ability to regain our composure and evaluate the situation in a timely manner, as well as to express our emotions and subsequently adapt to one another following each disagreement.</span>
    <span>A good personal connection is the outcome of getting along and interacting. We are willing to provide love and energy to one another, and we are always appreciative.</span>`,
    picture: `${prefix}/story/s2.jpg`
  },
  {
    title: 'Stay together: Peace of mind is where we belong',
    datetime: '',
    desc: `<span>It was not love at first sight for either of us.</span>
    <span>There was attraction, certainly, at least on my part.</span>
    <span>Throughout our time together, we found something far greater: we found friendship.</span>
    <span>When really, all alone, we simply enjoy each other’s company so much. We could not stay away from one another.</span>
    <span>I have never been a man enjoy flirting, or chatting, or, indeed, talking at all. But with her, conversation has always been easy.</span>
    <span>Her laughter brings me joy. To meet a beautiful girl is one thing, but to meet your best friend in the most beautiful girl is something entirely apart.</span>
    <span>I understand that friendship is the best possible foundation a marriage can have.</span>
    <span>In my heart, we've been married for a long time, and this has been our daily routine.</span>
    <span>We will be more devoted to one another in the future and will meticulously preserve this relationship.</span>
    <span>Share both joys and challenges, collaborate, and strive diligently for our glorious future!</span>`,
    picture: `${prefix}/story/s3.jpg`
  }
]
function createMarkup(html) {
  return { __html: html }
}

export default function Couple() {
  return (
    <StyledWrapper>
      <Title title="Our sweet journey" />
      <div className="tl">
        <ul className="items">
          {items.map(({ title, datetime, desc, picture }, idx) => (
            <li key={title} className="item">
                <AsyncImage
                  style={{ width: 150, height: 150}}
                  src={picture}
                  loader={<div className='preLoad'/>}
                  Transition={Blur}
                  alt="picture" 
                  className='pic'
              />
              <img className="heart" src={LoveStoryIcon} alt="Love Story Icon" />
              <div
                className="content"
                style={{ animationDelay: `0.${idx * 5}s` }}
              >
                <h4 className="title">{title}</h4>
                <time className="date">{datetime}</time>
                <p
                  className="desc"
                  dangerouslySetInnerHTML={createMarkup(desc)}
                ></p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </StyledWrapper>
  )
}
