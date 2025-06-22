import { ref, remove } from 'firebase/database';
import { database } from '../firebase';
import { useBlogs } from './useBlogs';
import Overlay from '../utils/overlay/Overlay';

const BlogDelete = ({ setDeleteWarning, deleteBlog }) => {
  const { refresh } = useBlogs();
  const navigate = useNavigate();

  const handleDelete = async () => {

    try {
      const blogRef = ref(database, `blogs/${deleteBlog}`);
      await remove(blogRef);
      await refresh();
      setDeleteWarning(false);
      navigate("/blog")
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  }

  return (
    <>
      <Overlay />
    <div className='blog-delete-wrapper'>
        <div className='blog-delete-topbar'>
          <h3>Delete Blog</h3>
          <div className='blog-delete-icon flex-center' onClick={() => setDeleteWarning(false)}><i className="fa-solid fa-x"></i></div>
        </div>
        <div className='blog-delete-body'>
            <p>Are you sure you want to delete this blog?</p>
            <div className='blog-delete-buttons flex-center'>
                <button className='delete-yes' onClick={handleDelete}>Yes</button>
                <button className='delete-no' onClick={() => setDeleteWarning(false)}>No</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default BlogDelete