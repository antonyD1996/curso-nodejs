import  Post  from "../models/post.js";

export const list = async (req, res) => {
  try {
    const list = await Post.list();
    return res.send({ status: "success", posts: list });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", message: "Something went wrong" });
  }
};
export const newPost = async (req, res) => {
  const post = new Post(req.body.title, req.body.body, req.userId);
  try {
    const savedPost = await post.save();
    return res.send({ status: "success", message: savedPost });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", message: "Something went wrong" });
  }
};

export const detail = async (req, res) => {
  try {
    const { found, post } = await Post.findById(req.params.id);

    if (!found)
      return res
        .status(404)
        .send({
          status: "error",
          message: `Post with id ${req.params.id} not found`,
        });
    return res.send({ status: "success", post: post });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", message: "Something went wrong" });
  }
};

export const deletePost = (req, res) => {
  return res.json({});
};

export const updatePost = (req, res) => {
  return res.json({});
};

export default { list, newPost, detail, deletePost, updatePost };
