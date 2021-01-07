import { Post } from '../models/post.js'

const renderBlog = (req, res) => {
  Post.find((err, posts) => {
    res.render('blog.ejs', { path: "Blog", posts: posts })
    // res.json({"posts": posts});
  })

};
export const newPost = (req, res) => {
  
  const postRecibido = new Post({ title: req.body.title, body: req.body.body })
  postRecibido.save((err) => {
    res.redirect('/blog')
  })
}

export const renderNewPost = (req, res)=>{
  const cookie = req.get('Cookie')
  console.log(cookie)
  res.render('new-post.ejs', {path:"New Post"})
}

export const detail = (req, res)=>{
  Post.findById(req.params.id, (err, post)=>{
    res.render('post-detail.ejs', {path:"Post Detail", post:post})
    console.log(post)
  })
}


export default { renderBlog, newPost, renderNewPost, detail }
