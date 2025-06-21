import AnimatedText from '@/app/utils/animated-text/AnimatedText'
import JobTitle from './JobTitle'
import './about.css'

const About = () => {

  return (
    <div className="about-wrapper">
    <section className='aboutme-wrapper'>
    <h1 className='about-title'><AnimatedText text="About Me" /></h1>
    <p>Hey, I’m a Front-End Engineer who’s big on the details — I like making sure things look exactly how they’re supposed to, and that they work just as well on a phone as they do on a big screen. I’m all about clean, responsive design and writing code that feels solid. Right now, I’m looking to break into the dev world and join a team where I can keep learning, build cool things, and grow as a developer. Outside of coding, you’ll usually find me watching sports, gaming, or spending time with the fam.</p>
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