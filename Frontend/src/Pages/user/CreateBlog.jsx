import React, { useState } from "react";
import UserMenu from "../../Components/UserMenu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import axios from "axios";

function CreateBlog() {
  const [title, setTitle] = useState();
  const [photo, setPhoto] = useState();
  const [content, setContent] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("title", title);
      productData.append("content", content);
      productData.append("userId", auth?.user._id);
      productData.append("description", description);
      productData.append("category", category);
      productData.append("photo", photo);

      const { data } = await axios.post(`/api/blogs/create`, productData);

      if (data?.success) {
        alert(data?.message);
        navigate("/dashboard/user/blogs");
      } else {
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
      // notyf.error("Something went wrong");
    }
  };

  return (
    <div className="d-flex " style={{ gap: "2rem" }}>
      <div className="col-md-3">
        <UserMenu />
      </div>
      <div className="col-md-8 pt-2 px-5" style={{ fontSize: "25px" }}>
        <h1 className="d-flex justify-content-center mb-5">Create Blog</h1>
        <div style={{ width: "80%", marginLeft: "60px" }}>
          <div className="mb-3">
            <input
              type="text"
              value={title}
              placeholder="Title"
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className="mb-3">
            <label className="btn btn-outline-secondary col-md-12">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          <div className="mb-3">
            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  height={"200px"}
                  className="img img-responsive"
                ></img>
              </div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={description}
              placeholder="Description"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={category}
              placeholder="Category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            ></input>
          </div>
          <div className="mb-3">
            <textarea
              type="text"
              value={content}
              placeholder="Content"
              className="form-control"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <button className="btn btn-primary" onClick={handleCreate}>
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
