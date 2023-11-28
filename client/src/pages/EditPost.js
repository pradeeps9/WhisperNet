import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setCategory(postInfo.category);
          setContent(postInfo.content);
        });

    })
  }, []);

  function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('category', category);
    data.set('content', content);
    data.set('id', id);
    if(files?.[0]){
      data.set('file', files?.[0]);
    }

    fetch('http://localhost:8080/post', {
      method : 'PUT',
      body : data,
      credentials : 'include',
    }).then(response=>{
      if(response.ok){
        setRedirect(true);
        console.log('redirected.');
      }
    });

    // console.log(response.ok)
    // if(response.ok){
    //   alert('updated');
    //   setRedirect(true);
    // }
     
  }
  
  if(redirect){
    return <Navigate to={'/post/'+id}/>
  }

  return(
    <form onSubmit={updatePost}>
      <input 
        type="title" 
        placeholder={'Title'} 
        value={title}
        onChange={ev=> setTitle(ev.target.value)} />

      <input 
        type="category" 
        placeholder={'Category'} 
        value={category}
        onChange={ev=> setCategory(ev.target.value)} />

      <input 
        type="file" 
        onChange={ev => setFiles(ev.target.files)} />

      <Editor onChange={setContent} value={content} />
      <button style={{marginTop: '5px'}}>Update post</button>
    </form>
  );
}