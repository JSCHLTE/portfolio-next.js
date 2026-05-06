import AnimatedText from '@/app/utils/animated-text/AnimatedText'
import JobTitle from './JobTitle'
import './about.css'

export const metadata = {
  title: 'About | Jordan Schulte',
  description: 'More about Jordan Schulte and his work history.',
};


const About = () => {

  return (
    <div className="about-wrapper">
    <section className='aboutme-wrapper'>
    <h1 className='about-title'><AnimatedText text="About Me" /></h1>
    <p>I'm a Web Developer who focuses on writing clean, responsive code and ensuring consistent, high-quality experiences across devices. I value precision in implementation and building interfaces that are both functional and well-structured. I'm looking to join a team where I can contribute to meaningful projects, continue growing technically, and collaborate with others who are passionate about the web. Outside of development, I enjoy watching sports, golfing, and spending time with family.</p>
    </section>
    <section className='work-wrapper'>
    <h2><AnimatedText text="Work History" /></h2>
    <div className='works-wrapper'>
      <JobTitle
        title="Website Manager & Developer"
        workPlace="New York Marketing"
        location="Williamsville, NY"
        dateStart="2022-08"
        dateEnd="present"
        tasks={["Managed 120+ WordPress websites for diverse clients.", "Designed and implemented custom website layouts and features.", "Troubleshot scripting issues and ensured website functionality.", "Applied SEO strategies to enhance search engine rankings and drive traffic.", "Collaborated with designers and developers to ensure optimal user experience and visual design."]}
        active="active"
      />
            <JobTitle
        title="Jewelry Consultant (Seasonal)"
        workPlace="Kay Jewelers"
        location="Williamsville, NY"
        dateStart="2021-10"
        dateEnd="2022-01"
        tasks={["Assisted customers with purchases and product recommendations.","Handled POS transactions and applied discounts.","Maintained attractive merchandise displays.", "Delivered high-quality customer service."]}
        active=""
      />
    </div>
    </section>
    </div>
  )
}

export default About