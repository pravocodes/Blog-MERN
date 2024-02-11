import React, { useEffect, useState } from "react";
import UserMenu from "../../Components/UserMenu";
import axios from "axios";
import { useAuth } from "../../Context/authContext";
import { Link } from "react-router-dom";
import SingleUserBlog from "./SingleUserBlog";

function Blogs() {
  const [blog, setBlog] = useState([]);
  const { auth } = useAuth();

  const [imageURL, setImageURL] = useState("");
  useEffect(() => {
    // console.log(auth.user._id);
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `/api/blogs/getuserblog/${auth?.user._id}`
        );
        // console.log(response.data.userBlogs);
        setBlog(response.data.userBlogs);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchBlog(); // Call fetchBlog after defining it
  }, []);
  // useEffect(() => {
  //   const fetchImageURL = async () => {
  //     try {
  //       const response = await axios.get(
  //         `/api/blogs/getblogphoto/${auth?.user._id}`,
  //         {
  //           responseType: "arraybuffer",
  //         }
  //       );
  //       const imageBlob = new Blob([response.data], { type: "image/jpeg" });
  //       const imageUrl = URL.createObjectURL(imageBlob);
  //       setImageURL(imageUrl);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  //   fetchImageURL();
  // }, []);

  const handleDelete = (deletedBlogId) => {
    // Update state to remove the deleted blog
    setBlog((prevBlogs) =>
      prevBlogs.filter((blog) => blog._id !== deletedBlogId)
    );
  };

  return (
    <div className="d-flex " style={{ gap: "2rem" }}>
      <div className="col-md-3">
        <UserMenu />
      </div>
      <div className="container">
        <h1 className="display-4 text-center mb-4">My Blogs</h1>
        <div className="row">
          {blog.map((b) => (
            <SingleUserBlog key={b._id} {...b} handleDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
