import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center mx-3 ">
      <div className="list-group" style={{ fontSize: "20px" }}>
        <h1>User Panel</h1>
        <br />
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action "
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/blogs"
          className="list-group-item list-group-item-action"
        >
          Blogs
        </NavLink>
        <NavLink
          to="/dashboard/user/create-blog"
          className="list-group-item list-group-item-action"
        >
          Create New Blog
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
