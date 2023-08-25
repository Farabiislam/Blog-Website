import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Menu from "../Components/Menu";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import { AuthContext } from "../context/AuthContext";
const SinglePost = () => {
  const [post, setPost] = useState({});

  const Navigate = useNavigate();
  
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  
  console.log(postId);
  
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/posts/${postId}`
        );
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      Navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="img" />

        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={"/write?edit=2"} state={post}>
                <img src={Edit} alt="edit" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="image" />
            </div>
          )}
        </div>

        <h1>{post.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc), }}></p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default SinglePost;
