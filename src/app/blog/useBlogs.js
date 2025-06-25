"use client";

import { useEffect, useState, useCallback } from 'react';
import { database } from '../firebase';
import { ref, get, child, onValue } from 'firebase/database';

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = useCallback(async () => {
    const dbRef = ref(database);
    try {
      const snapshot = await get(child(dbRef, 'blogs'));
      const data = snapshot.val();

      let blogArray = [];
      if (typeof data === 'object' && data.title) {
        blogArray = [data]; // single blog object case
      } else {
        blogArray = Object.entries(data || {})
          .filter(([id, blog]) => blog && blog.title)
          .map(([id, blog]) => ({
            id,
            ...blog,
          }));
      }

      setBlogs(blogArray);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBlogs();
    
    // Set up real-time listener
    const blogsRef = ref(database, 'blogs');
    const unsubscribe = onValue(blogsRef, () => {
      fetchBlogs();
    });

    return () => unsubscribe();
  }, [fetchBlogs]);

  return { blogs, loading, refresh: fetchBlogs };
};
