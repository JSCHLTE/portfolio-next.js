"use client";

import { use, useEffect, useState } from 'react'
import './contact.css'
import '../forms.css'
import AnimatedText from '@/app/utils/animated-text/AnimatedText'
import NotificationBox from '../utils/notifications/NotificationBox'

const Contact = () => {

      const [formValues, setFormValues] = useState({
        contactName: '',
        contactEmail: '',
        contactSubject: '',
        contactBody: ''
      })

      const [notifications, setNotifications] = useState(null)

      const handleChange = (e) => {
        const { name, value } = e.target

        setFormValues((prev) =>  ({
            ...prev,
            [name]: value,
        }))
      }

      const handleSubmit = async(e) => {
        e.preventDefault();
        const { contactName, contactEmail, contactSubject, contactBody } = formValues

        if(contactBody.trim() == "" || contactSubject.trim() == "") {
            return;
        }

        handleNotification("warning", "Message Sending", "Message may take 30-60 seconds if form was inactive for more than 15 minutes.")

        try {
            const res = await fetch("https://portfolio-evln.onrender.com/contact", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: contactName,
                    email: contactEmail,
                    subject: contactSubject,
                    body: contactBody
                }),
            })

            const result = await res.json()
            result ? handleNotification("success", "Message Sent", "Thank you for messaging me, I will get back to you ASAP.") : ''
            setFormValues({
                contactName: '',
                contactEmail: '',
                contactSubject: '',
                contactBody: ''
              })
        } catch (err){
            handleNotification("failed", "Failed", `Message failed due to error: ${err}`)
        }
      }

      const handleNotification = (type, message, desc) => {
        setNotifications({
          type: [type],
          message: [message],
          desc: [desc]
        })
      }

      useEffect(() => {
        let timeout;
    
        if(notifications) {
            timeout = setTimeout(() => {
                setNotifications(null)
            }, 7500)
        }
    
        return () => clearTimeout(timeout)
      }, [notifications])

  return (
    <div className="contact-wrapper">
        <h1><AnimatedText text="Contact Me"/></h1>
        {notifications ? <NotificationBox type={notifications.type} message={notifications.message} desc={notifications.desc}/> : ''}
        <form onSubmit={handleSubmit} id='contactForm'>
            <label htmlFor='contactName'>
                Name:
                <input type='text' id='contactName' name='contactName' placeholder='Jordan Schulte' required onChange={handleChange} value={formValues.contactName}/>
            </label>
            <label htmlFor='contactEmail'>
                Email:
                <input type='email' id='contactEmail' name='contactEmail' placeholder='jordanschulte@email.com' required onChange={handleChange} value={formValues.contactEmail}/>
            </label>
            <label htmlFor='contactSubject'>
                Subject:
                <input type='text' id='contactSubject' name='contactSubject' required onChange={handleChange} value={formValues.contactSubject}/>
            </label>
            <label htmlFor='contactBody'>
                Message:
                <textarea  id="contactBody" name="contactBody" required onChange={handleChange} value={formValues.contactBody}></textarea>
            </label>
            {notifications?.type == "warning" ? <button className='contact-button disabled' disabled><iframe className='spinner' src="https://lottie.host/embed/a9d1be0a-eba0-4c76-9dcf-b95d27e96f6b/jpskbz67I1.lottie"></iframe></button> : <button className='contact-button button-press'>Send Message</button>}
        </form>
    </div>
  )
}

export default Contact