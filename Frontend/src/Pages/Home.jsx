import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import axios from "axios";
import SingleBlog from "../Components/SingleBlog";
import { useAuth } from "../Context/authContext";

function Home() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get("/api/blogs/getblog");
        setBlog(response.data.blog);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchBlog(); // Call fetchBlog after defining it
  }, []);

  // console.log(blog);

  return (
    <div className={styles.HomePage}>
      {/* <div className={styles.container}> */}
      <h1 className={styles.heading} style={{ marginBottom: "3rem" }}>
        Top Blogs
      </h1>
      <div className={styles.blogs}>
        {blog.map((b) => (
          <SingleBlog key={b._id} {...b} />
        ))}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Home;
