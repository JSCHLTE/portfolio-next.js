import './bio.css'
import AnimatedText from '@/app/utils/animated-text/AnimatedText'

const Bio = () => {
  return (
    <div className='bio-wrapper'>
        <div className='bio-img-wrapper skeleton'>
            <img src='/images/pfp.webp' alt="Stylized portrait of Jordan wearing sunglasses, created with a swirling, abstract filter effect that resembles painted brush strokes. The sunglasses reflect the word 'Vibes' in a bold, colorful font."/>
        </div>
        <div className='bio-info-wrapper'>
            <span className='bio-info-name'><AnimatedText text='Jordan Schulte'/></span>
            <div className='bio-info-location'><AnimatedText text='Buffalo, NY'/></div>
            <div className='bio-info-role'><AnimatedText text='Front-End Engineer'/></div>
            <div className='bio-links-wrapper'>
                <a href="https://github.com/JSCHLTE" target='_blank' rel='noreferrer noopener' aria-label='Checkout my GitHub' className='button-press'><i className="fa-brands fa-github" aria-hidden="true"></i></a>
                <a href="https://www.linkedin.com/in/jordan-schulte-9a5961216/" target='_blank' rel='noreferrer noopener' aria-label='Checkout my LinkedIn' className='button-press'><i className="fa-brands fa-linkedin" aria-hidden="true"></i></a>
                <a href="https://x.com/jschlte" target='_blank' rel='noreferrer noopener' aria-label='Checkout my Twitter' className='button-press'><i className="fa-brands fa-x-twitter" aria-hidden="true"></i></a>
            </div>
            <div className='bio-copyright'>
              <p>© Jordan Schulte {new Date().getFullYear()}</p>
            </div>
        </div>
    </div>
  )
}

export default Bio