"use client";

import { useBlogs } from './useBlogs';
import AnimatedText from '@/app/utils/animated-text/AnimatedText';
import FormatDate from '@/app/utils/format-date/FormatDate';
import Loading from '@/app/utils/loading/Loading';
import Link from 'next/link';
import { useAuth } from '@/app/providers/AuthProvider'; 
import Image from 'next/image';

const BlogCard = () => {

  const { user } = useAuth();

  const { blogs, loading } = useBlogs();
  if (loading) return <Loading />;
  if (blogs.length < 1) return <p>No blogs found.</p>;

  return (
    <>
    {blogs.sort((a, b) => new Date(b.date) - new Date(a.date)).map((blog) => (
        <Link className='blog-link card-press' href={`/blog/${blog.slug}`} key={blog.slug}>
          <article className='blog-item button-press'>
            <div className='blog-info'>
              <h3 className='blog-title'><AnimatedText text={blog.title} /></h3>
              <p className='blog-snippet'>{blog.snippet}</p>
            </div>
            <div className='blog-meta'>
              <div className='blog-meta-left'>
              <div className='blog-meta-img-wrapper skeleton'>
              <Image
                src='/images/pfp.webp'
                alt="Image of Jordan"
                fill
            />
              </div>
                <div className='blog-meta-author-wrapper'>
                  <span className='blog-meta-author'>{blog.author}</span>
                  <time dateTime={blog.date}>{<FormatDate date={blog.date}/>}</time>
                </div>
              </div>
              <div className='blog-meta-right'>
                <span className='blog-meta-likes'>{(() => {
                                          const likeCount = blog.likes ? Object.keys(blog.likes).length : 0;
                                          const hasLiked = blog.likes && user?.uid && blog.likes[user.uid] === true;

                                          return (
                                            <>
                                              <i className={`fa-${hasLiked ? 'solid' : 'regular'} fa-heart`}></i>
                                              <span className='blog-meta-likes'>{likeCount}</span>
                                            </>
                                          );
                                        })()}
                                      </span>
              </div>
            </div>
          </article>
        </Link>
    ))}</>
  )
}

export default BlogCard