import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styles from "./Blog.module.css";

function Blog() {

    const [imageURL, setImageURL] = useState('');
    const[blog,setBlog] = useState([]);
  const { id } = useParams();
//   console.log(id)
  useEffect(() => {
    const fetchImageURL = async () => {
      try {
        
        const blogresponse = await axios.get(`/api/blogs/getsingleblog/${id}`);
        const response = await axios.get(`/api/blogs/getblogphoto/${id}`, { responseType: 'arraybuffer' });
        const imageBlob = new Blob([response.data], { type: 'image/jpeg' }); 
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageURL(imageUrl);
    //   console.log(response.data.blog)
      setBlog(blogresponse.data.blog[0]);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchImageURL();
  }, [id]);

  return (
    <div className={styles.HomePage}>
    <h1>{blog.title}</h1>
    <div className={styles.imagediv}>
        {imageURL ? (
          <img src={imageURL} alt={blog.title} className={styles.image} />
        ) : (
          <p>Loading image...</p>
        )}
    </div>
    <h3>{blog.description}</h3>
    <p>{blog.content}</p>
    </div>
  )
}

export default Blog
