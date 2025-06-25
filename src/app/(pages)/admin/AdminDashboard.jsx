"use client";

import { useEffect, useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from '@/app/firebase'
import { slugify } from '@/app/utils/slugify/slugify'; // make sure this exists!
import { useAuth } from '@/app/providers/AuthProvider'
import { useRouter } from 'next/navigation';
import AnimatedText from '@/app/utils/animated-text/AnimatedText';
import NotificationBox from '@/app/utils/notifications/NotificationBox';
import '@/app/forms.css'
import Loading from '@/app/utils/loading/Loading';

const AdminDashboard = () => {

    const { admin, loading, auth } = useAuth();
    const router = useRouter();

  const [formValues, setFormValues] = useState({
    blogTitle: '',
    blogBody: ''
  });
  const [notifications, setNotifications] = useState(null)

  // Redirect non-admin users to login
  useEffect(() => {
    if (!loading && admin === false) {
      router.push('/login');
    }
  }, [admin, loading, router]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const slug = slugify(formValues.blogTitle);

    const cleanSnippet = formValues.blogBody
      .replace(/[#*_`>~\-+=]+/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .trim()
      .slice(0, 100) + '...';

    const newBlog = {
      title: formValues.blogTitle,
      content: formValues.blogBody.trim(),
      author: "Jordan Schulte",
      slug: slug,
      likes: [],
      date: new Date().toISOString().split('T')[0],
      pfp: "/images/blogpfp.webp",
      snippet: cleanSnippet
    };

    try {
      const blogRef = ref(database, `blogs/${slug}`);
      await set(blogRef, newBlog);
      handleNotification("success", "Blog Posted", "Blog successfully posted.")
      setFormValues({ blogTitle: '', blogBody: '' });
    } catch (err) {
      handleNotification("failed", "Failed", `Blog posting failed due to error: ${err}`)
    }
  };

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

  if(loading) return <Loading />
  if (!admin) return null;

return (
  <div className="admin-wrapper">
    <h1><AnimatedText text='Create a Blog' /></h1>

    {notifications && (
      <NotificationBox
        type={notifications.type}
        message={notifications.message}
        desc={notifications.desc}
      />
    )}

    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-title-wrapper">
        <label htmlFor="blogTitle">
          Blog title:
          <input
            type="text"
            id="blogTitle"
            name="blogTitle"
            value={formValues.blogTitle}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="form-body-wrapper">
        <label htmlFor="blogBody">
          Blog body:
          <textarea
            id="blogBody"
            name="blogBody"
            value={formValues.blogBody}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <button className="form-submit button-press">POST</button>
    </form>
  </div>
);

};

export default AdminDashboard;
