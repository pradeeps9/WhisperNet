import { useEffect, useState } from "react";
import Post from "./Post";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  console.log(search);

  useEffect(()=>{
    fetch('http://localhost:8080/post').then(response=>{
      response.json().then(posts=>{
        // console.log(posts);
        setPosts(posts);
      });
    });
  }, []);

  return(
    <>
      <form className="search">
        <label id="searchCategory">Search by company name or by technology</label>
        <input 
          id="searchCategory" 
          className='searchbar' 
          placeholder='search'
          value={search}
          onChange={e=>setSearch(e.target.value)}
          ></input>
        {/* <button className="searchbtn">Go</button> */}
      </form>
      <div className="posts">
        {posts.length > 0 && posts.filter(post=>{
          return search.toLowerCase === '' ? post : post.category.toLowerCase().includes(search);
        }).map(post => (
            <Post {...post}/>
          ))}
      </div>
    </>
  );
}
