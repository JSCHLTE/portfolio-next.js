"use client";

import { useState, useRef, useEffect } from 'react'
import './animatedText.css'

const AnimatedText = ({ text }) => {

    const [isVisible, setIsVisible] = useState(false);
    const referenceContainer = useRef();

    useEffect(() => {

        const options = {
            threshold: 1.0,
        }

        const observer = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting) {
                setIsVisible(true)
                observer.unobserve(entry.target)
            }
        }, options)

        observer.observe(referenceContainer.current)

        return () => {
            observer.disconnect();
        }
    }, [])

    const words = text.split(' ');
    let letterCount = 0;

  return (
    <div ref={referenceContainer} className='animated-text'>
        {
            words.map((word, wordIndex) => (
                <span key={wordIndex} className='word'>
                    {[...word].map((char, charIndex) => {
                        const gCounter = letterCount++
                        return (
                            <span
                            key={charIndex} 
                            className={`letter ${isVisible ? 'visible' : ''}`}
                            style={{ transitionDelay: `${gCounter * 25}ms` }}
                            >{char}</span>
                        )
                    })}
                    {wordIndex < words.length - 1 && (
          <span className="letter" aria-hidden="true">
            {'\u00A0'}
          </span> )}
                </span>
            ))
        }
    </div>
  )
}

export default AnimatedText