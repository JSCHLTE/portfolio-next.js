"use client";

import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import AnimatedText from '../../utils/animated-text/AnimatedText';
import FormatDate from '../../utils/format-date/FormatDate';
import { useBlogs } from '../useBlogs';
import { get, ref, update, set, remove } from 'firebase/database';
import { database } from '../../firebase';
import { useParams, useRouter } from 'next/navigation';
import Overlay from '@/app/utils/overlay/Overlay';
import { useAuth } from '@/app/providers/AuthProvider';
import Loading from '../../utils/loading/Loading';
import '../blog.css'
import { useUI } from '@/app/providers/UIProvider';

const BlogPage = () => {
  const { admin, user } = useAuth();
  const { blogs, loading } = useBlogs();
  const { slug } = useParams();
  const { deleteWarn, setDeleteWarn } = useUI();
  const [blogEdit, setBlogEdit] = useState(null)
  const [blogEdits, setBlogEdits] = useState({
    title: '',
    content: ''
  })

  const router = useRouter();

  const [liked, setLiked] = useState(null);
  const [likes, setLikes] = useState(null);

  const blog = blogs.find((b) => b.slug === slug);


  useEffect(() => {
    if (!blog || !user) return;
  
    const isLiked = blog.likes && blog.likes.hasOwnProperty(user.uid);
    setLiked(isLiked);
  
    const likeKeys = blog.likes ? Object.keys(blog.likes) : [];
    setLikes(likeKeys.length);
  }, [blog, user]);
  

  if (loading) return <Loading />;

  if (!blog) return <div>Blog not found</div>;

  const handleLike = async () => {
    if (!user?.uid) return;
  
    const likeRef = ref(database, `blogs/${slug}/likes/${user.uid}`);
    const snapshot = await get(likeRef);
  
    if (snapshot.exists()) {
      await remove(likeRef);
    } else {
      await set(likeRef, true);
    }
  };
  
  
  const handleDel = () => {
    if(!admin) return;
    setDeleteWarn(true);
  }

  const handleEdit = () => {
    if(!admin) return;
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
        .slice(0, 100) + '...',
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
      const blogRef = ref(database, `blogs/${slug}`);
      await remove(blogRef);
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
        <div className='blog-delete-body'>
            <p>Are you sure you want to delete "<b>{blog.title}</b>"?</p>
            <div className='blog-delete-buttons flex-center'>
                <button className='delete-yes button-press' onClick={handleDelete}>Yes</button>
                <button className='delete-no button-press' onClick={() => setDeleteWarn(false)}>No</button>
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
        <div className={`blogpage-likes ${liked ? 'liked' : ''}`}>
          <button onClick={handleLike} className="button-press">
            <i className={`fa-${liked ? 'solid' : 'regular'} fa-heart`}></i> {likes}
          </button>
        </div>
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
