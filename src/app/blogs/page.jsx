// import BlogDelete from '../Comps/common/blog/BlogDelete';
import Overlay from '@/app/utils/overlay/Overlay';
import AnimatedText from '@/app/utils/animated-text/AnimatedText';
import BlogCard from './BlogCard';
import './blog.css'

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