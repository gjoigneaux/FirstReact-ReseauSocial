import React, { useState } from "react";
import Avatar from 'react-avatar';
import ImageUploader from "react-images-upload";
import AuthService from "../../services/auth.service";
import userService from '../../services/user.service'
import './Post.scss';

const Post = () => {
  const currentUser = AuthService.getCurrentUser();
  const initialPostState = {
    idUSERS: currentUser.userId,
    username: currentUser.username,
    message: "",
  };
  const [post, setPost] = useState(initialPostState);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const [image, setImage] = useState('');
  const handleImageUpload = e => {
    setImage(e.target.files[0]);
  }


  const savePost = () => {
    if (image !== '') {
      if (post.message !== "") {
        var data = {
          idUSERS: currentUser.userId,
          username: currentUser.username,
          message: post.message,
        };
        userService.postmessagewithimage(data, image)
          .then(response => {
            setPost({
              data
            });
            console.log(response.data);
            console.log(data);
          })
          .catch(e => {
            console.log(data);
            console.log(e);
          });
        window.location.reload(true);
      }
      else {
        alert("Pas de message");
      }
    }
    else {
      if (post.message !== "") {
        var data = {
          idUSERS: currentUser.userId,
          username: currentUser.username,
          message: post.message,
        };
        userService.postmessage(data)
          .then(response => {
            setPost({
              data
            });
            console.log(response.data);
            console.log(data);
          })
          .catch(e => {
            console.log(data);
            console.log(e);
          });
        //window.location.reload(true);
      }
      else {
        alert("Pas de message");
      }
    }
  }


  return (
    <section className='post'>
      <article>
        <div className="entete">
          <Avatar className='avatar' name={currentUser.username} size="50" />
          <div className="entete_info">
            <div className="nom">{currentUser.username}</div>
          </div>
        </div>
        <textarea className='postMessage' name='message' value={post.message} onChange={handleInputChange} placeholder='Votre message' aria-label="Votre message" />
        <input
          type="file"
          accept=".jpeg,.jpg,.gif,.png"
          id="image"
          name="image"
          onChange={handleImageUpload}
        />
        <input type='submit' onClick={savePost} className='postMessageSubmit' value='Post' required />
      </article >
    </section >
  );
};

export default Post;

