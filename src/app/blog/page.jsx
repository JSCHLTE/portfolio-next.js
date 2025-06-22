// import BlogDelete from '../Comps/common/blog/BlogDelete';
import Overlay from '@/app/utils/overlay/Overlay';
import AnimatedText from '@/app/utils/animated-text/AnimatedText';
import BlogCard from './BlogCard';
import './blog.css'

export const Metadata = {
  title: "Jordan Schulte | Blogs",
  icons: "images/blogpfp.webp",
  description: "Jordan Schulte's portfolio website",
};

const Blog = () => {

  return (
    <>
      <div className="blog-wrapper">
        <h1><AnimatedText text='Blogs' /></h1>
        <div className='blogs-wrapper'>
          <BlogCard />
        </div>
    </div>
  </>
  )
}

export default Blog