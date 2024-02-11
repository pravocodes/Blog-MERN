import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SingleUserBlog({
  _id,
  title,
  description,
  content,
  userId,
  category,
}) {
  const [imageURL, setImageURL] = useState("");

  console.log("inside signle blog");

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
    <div className="col-md-4 mb-4">
      <div className="card">
        <img src={imageURL} className="card-img-top" alt="Blog Image" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <div className="d-flex justify-content-between">
            <Link to={`/blog/${_id}`} className="btn btn-primary">
              Read More
            </Link>
            <Link to={`update-blog/${_id}`} className="btn btn-primary">
              Edit Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleUserBlog;
