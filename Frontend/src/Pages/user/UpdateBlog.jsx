import React, { useEffect, useState } from "react";
import UserMenu from "../../Components/UserMenu";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import axios from "axios";

function UpdateBlog() {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { auth } = useAuth();

  const { id } = useParams();

  useEffect(() => {
    const fetchImageURL = async () => {
      try {
        const blogresponse = await axios.get(`/api/blogs/getsingleblog/${id}`);
        const response = await axios.get(`/api/blogs/getblogphoto/${id}`, {
          responseType: "arraybuffer",
        });
        const imageBlob = new Blob([response.data], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(imageBlob);
        setPhoto(imageUrl);
        const data = blogresponse.data.blog[0];
        setTitle(data.title);
        setContent(data.content);
        setDescription(data.description);
        setCategory(data.category);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchImageURL();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("title", title);
      productData.append("content", content);
      productData.append("userId", auth?.user._id);
      productData.append("description", description);
      productData.append("category", category);
      productData.append("photo", photo);

      const { data } = await axios.post(
        `/api/blogs/updateblog/${id}`,
        productData
      );

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
        <h1 className="d-flex justify-content-center mb-5">Update Blog</h1>
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
              {"Upload Photo"}
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
                  src={photo}
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
            <button className="btn btn-primary" onClick={handleUpdate}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateBlog;
