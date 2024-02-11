import React, { useState, useEffect } from "react";
import styles from "./SingleBlog.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function SingleBlog({ _id, title, description, content, userId, category }) {
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const fetchImageURL = async () => {
      try {
        const response = await axios.get(`/api/blogs/getblogphoto/${_id}`, {
          responseType: "arraybuffer",
        });
        const imageBlob = new Blob([response.data], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageURL(imageUrl);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchImageURL();
  }, [_id]);

  return (
    <div className={styles.singleBlog}>
      <div className={styles.imgAndDesc}>
        {imageURL ? (
          <img src={imageURL} alt={title} className={styles.image} />
        ) : (
          <p>Loading image...</p>
        )}
        <div className={styles.headanddesc}>
          <h1 className={styles.heading}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <div className={styles.contentandreadmore}>
        <div className={styles.contentPreview}>
          {content.length > 100 ? `${content.substring(0, 100)}...` : content}
        </div>
        <Link to={`/blog/${_id}`}>Read more...</Link>
      </div>
    </div>
  );
}

export default SingleBlog;
