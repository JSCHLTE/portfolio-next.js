import ContactForm from './ContactForm'
import AnimatedText from '@/app/utils/animated-text/AnimatedText.jsx'

export const metadata = {
  title: 'Contact | Jordan Schulte',
  description: "Contact page to reach out to Jordan Schulte.",
};

const Contact = () => {
  return (
    <div className="contact-wrapper">
      <h1><AnimatedText text="Contact Me"/></h1>
      <ContactForm />
    </div>
  )
}

export default Contact