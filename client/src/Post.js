import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({_id,title, category, cover, content,createdAt,author}) {

  return(
    <>
    <div className="post">
      <div className='image'>
        <Link to={`post/${_id}`}>
          <img src={'http://localhost:8080/'+cover} alt='' />
        </Link>
      </div>
      <div className="mainContent">
        <p className="blogCategory">Category &#8226; {category}  </p>
        <Link to={`post/${_id}`}>
          <h2 className="blogTitle">{title}</h2>
        </Link>
        
        <p className="blogContent">
          {content.length > 50 ? `${content.substring(3, 60)}...` : 
            <div  dangerouslySetInnerHTML={{__html:content}}/>}
        </p>
        {/* <div className="blogContent" dangerouslySetInnerHTML={{__html:content}}/> */}
        <div>
          <p className="author"> 
            {author.username} &#8226;&nbsp;
            {/* <br/> <span>views, likes, comments</span>  */}
            <time>{format(new Date(createdAt), 'MMM d yyy, H:mm')}</time>
          </p>
        </div>
      </div>
    </div>
    <hr/>
    </>
  );
}