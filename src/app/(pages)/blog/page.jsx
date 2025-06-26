import BlogCard from './BlogCard';
import './blog.css'
import AnimatedText from '@/app/utils/animated-text/AnimatedText';

export const metadata = {
  title: 'Blog | Jordan Schulte',
  description: "The blog page, read Jordan Schulte's blogs and get updates about him and the website.",
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