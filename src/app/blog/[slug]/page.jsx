"use client";

import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import AnimatedText from '../../utils/animated-text/AnimatedText';
import FormatDate from '../../utils/format-date/FormatDate';
import { useBlogs } from '../useBlogs';
import { get, ref, update } from 'firebase/database';
import { database } from '../../firebase';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Overlay from '@/app/utils/overlay/Overlay';
import { useAuth } from '@/app/providers/AuthProvider';
import Loading from '../../utils/loading/Loading';
import '../blog.css'
import { useUI } from '@/app/providers/UIProvider';

const BlogPage = () => {
  const { admin } = useAuth();
  const { blogs, loading } = useBlogs();
  const { slug } = useParams();
  const { deleteWarn, setDeleteWarn } = useUI();
  const [blogEdit, setBlogEdit] = useState(null)
  const [blogEdits, setBlogEdits] = useState({
    title: '',
    content: ''
  })

  const [checkLiked, setCheckLiked] = useState(false);
  const [likes, setLikes] = useState(0);

//   useEffect(() => {
//     const likedMap = JSON.parse(localStorage.getItem("blogLikes")) || {};
//     if (likedMap[slug]) {
//       setCheckLiked(true);
//     }
//   }, [slug]);

//   useEffect(() => {
//     if (!loading) {
//       const blog = blogs.find((b) => b.slug === slug);
//       if (blog) {
//         setLikes(blog.likes || 0);
//       }
//     }
//   }, [loading, blogs, slug]);

  if (loading) return <Loading />;

  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return <div>Blog not found</div>;


  // const handleLike = async () => {
  //   const blogRef = ref(database, `blogs/${slug}`);
  //   const likedMap = JSON.parse(localStorage.getItem("blogLikes")) || {};
  //   const alreadyLiked = likedMap[slug] === true;
  //   const isLiking = !alreadyLiked;

  //   try {
  //     await update(blogRef, { 
  //       likes: isLiking ? likes + 1 : Math.max(0, likes - 1)
  //     });

  //     // Update local state
  //     setLikes((prev) => Math.max(0, isLiking ? prev + 1 - 1 : prev - 1));
  //     setCheckLiked(isLiking);

  //     // Update localStorage
  //     const updatedLikes = { ...likedMap, [slug]: isLiking };
  //     localStorage.setItem("blogLikes", JSON.stringify(updatedLikes));

  //   } catch (error) {
  //     console.error("Error updating likes:", error);
  //   }
  // };
  
  const handleDel = () => {
    setDeleteWarn(true);
  }

  const handleEdit = () => {
    setBlogEdit(true)
    setBlogEdits({
      title: blog.title,
      content: blog.content
    })
  }

  const handleSave = async () => {
    const blogRef = ref(database, `blogs/${slug}`);

    try {
      await update(blogRef, { 
        title: blogEdits.title,
        content: blogEdits.content,
        snippet: blogEdits.content.replace(/[#*_`>~\-+=]+/g, '')
        .replace(/\[.*?\]\(.*?\)/g, '')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .trim()
        .slice(0, 100) + '...'
      });

      setBlogEdit(null)
    }

    catch (error) {
      console.error("Error updating blog post:", error);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setBlogEdits((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDelete = async () => {

    try {
      const blogRef = ref(database, `blogs/${deleteBlog}`);
      await remove(blogRef);
      await refresh();
      setDeleteWarn(false);
      router.push("/blog")
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  }
  

  return (
    <div className='blogpage-wrapper'>
      { admin && deleteWarn ?
    <div className='blog-delete-wrapper'>
        <div className='blog-delete-topbar'>
          <h3>Delete Blog</h3>
          <div className='blog-delete-icon flex-center' onClick={() => setDeleteWarn(false)}><i className="fa-solid fa-x"></i></div>
        </div>
        <div className='blog-delete-body'>
            <p>Are you sure you want to delete this blog?</p>
            <div className='blog-delete-buttons flex-center'>
                <button className='delete-yes' onClick={handleDelete}>Yes</button>
                <button className='delete-no' onClick={() => setDeleteWarn(false)}>No</button>
            </div>
        </div>
    </div> : ''}
      <header>
        {!blogEdit ? <h1><AnimatedText text={blog.title} /></h1> : 
          <input value={blogEdits.title} name='title' className='blogpage-edit-input' onChange={handleChange}/>
        }
        <div className='blogpage-meta'>
        <div className='blogpage-img-wrapper skeleton'>
          <img loading='eager' src={blog.pfp} alt="Author Profile" />
        </div>
          <div>
            <address className='blogpage-author'>By <span>{blog.author}</span></address>
            <time dateTime={blog.date} className='blogpage-date'><FormatDate date={blog.date} /></time>
          </div>
        </div>
        <div className='blogpage-meta-buttons'>
        {/* <div className={`blogpage-likes ${checkLiked ? 'liked' : ''}`}>
          <button onClick={handleLike} className="button-press">
            <i className={`${checkLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}`}></i> {likes}
          </button>
        </div> */}
        {admin ?         <div className='blogpage-meta-buttons-admin'>
          {blogEdit ?         <button className="button-press blog-save" onClick={handleSave}>
          <i className="fa-solid fa-floppy-disk"></i>
          </button> :         <button className="button-press blog-edit" onClick={handleEdit}>
          <i className="fa-solid fa-pen-to-square"></i>
          </button>}

          <button className="button-press blog-delete" onClick={handleDel}>
          <i className="fa-solid fa-trash-can"></i>
          </button>
        </div> : ''}
        </div>
      </header>
      <main className='blogpage-content'>
        {!blogEdit ? <Markdown>{blog.content}</Markdown> : 
          <textarea className='blogpage-edit-textarea' name='content' onChange={handleChange} value={blogEdits.content}></textarea>
        }
      </main>
    </div>
  );
};

export default BlogPage;
