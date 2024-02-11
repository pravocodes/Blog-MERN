import blogModel from "../Models/blogModel.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content, userId, description, category } = req.body;
    const photo = req.files ? req.files.photo : null;
    const updateFields = { title, content, userId, description, category };
    if (photo) {
      updateFields.photo = {
        data: photo.data,
        contentType: photo.mimetype,
      };
    }

    const blogcreation = new blogModel(updateFields);

    await blogcreation.save();

    return res.status(200).send({
      success: true,
      message: "Blog Created Successfully",
      blogcreation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Creating Blog",
      error,
    });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blog = await blogModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: blog.length,
      message: "AllBlogs ",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting blog",
      error: error.message,
    });
  }
};

export const getBlogPhoto = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log("ID:", id);
    const blog = await blogModel.findById({ _id: id }).select("photo");
    // console.log("Blog:", blog);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }
    if (!blog.photo || !blog.photo.data) {
      return res.status(404).send({
        success: false,
        message: "Photo not found for this blog",
      });
    }
    // console.log(blog);
    if (blog.photo.data) {
      //   console.log("hello");
      res.set("Content-type", blog.photo.contentType);
      return res.status(200).send(blog.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

export const getsingleBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await blogModel.find({ _id: id }).select("-photo");
    res.status(200).send({
      success: true,
      message: "Blog Found ",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting blog",
      error: error.message,
    });
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming userId is passed as a parameter in the route
    // console.log(userId);
    const userBlogs = await blogModel
      .find({ userId })
      .select("-photo")
      .sort({ createdAt: -1 }); // Assuming userId is the field name in the blogModel

    if (!userBlogs) {
      return res.status(404).send({
        success: false,
        message: "No blogs found for this user.",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User blogs retrieved successfully.",
      userBlogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving user blogs.",
      error,
    });
  }
};

export const updateBlogContent = async (req, res) => {
  try {
    const blogId = req.params.id; // Assuming blogId is passed as a parameter in the route
    const { title, content, description, category } = req.body;
    const photo = req.files ? req.files.photo : null;

    const updateFields = { title, content, description, category };
    if (photo) {
      updateFields.photo = {
        data: photo.data,
        contentType: photo.mimetype,
      };
    }

    const updatedBlog = await blogModel.findByIdAndUpdate(
      blogId,
      updateFields,
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found.",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Blog content updated successfully.",
      updatedBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating blog content.",
      error,
    });
  }
};

export const deleteBlogContent = async (req, res) => {
  try {
    const blogId = req.params.id;
    // console.log(blogId);

    const deletedBlog = await blogModel.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found.",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Blog content deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting blog content.",
      error,
    });
  }
};
