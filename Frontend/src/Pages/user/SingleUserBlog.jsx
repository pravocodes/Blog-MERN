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
  handleDelete,
}) {
  const [imageURL, setImageURL] = useState("");

  // console.log("inside signle blog");

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

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`api/blogs/deleteblog/${_id}`);
      handleDelete(_id);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="col-md-4 mb-4" key={_id} style={{ display: "flex" }}>
      <div
        className="card"
        style={{ width: "100%", display: "flex", flexDirection: "column" }}
      >
        <img
          src={imageURL}
          className="card-img-top"
          alt="Blog Image"
          style={{ flex: "1 1 auto", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
          </div>
          <div className="d-flex justify-content-between mt-auto pt-4">
            <Link to={`/blog/${_id}`} className="btn btn-primary">
              Read More
            </Link>
            <Link className="btn btn-danger" onClick={handleDeleteClick}>
              Delete
            </Link>
            <Link to={`update-blog/${_id}`} className="btn btn-success">
              Edit Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleUserBlog;
