import React, { useEffect, useState } from 'react';
import Post from './Post';
import Share from './Share';

function Feeds() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/post');
      const result = await response.json();
      // console.log("posts",result);
      setPosts(result);
    } catch (error) {
      console.log(error);
    }
  }

  return  <div className="feed">
  <div className="feedWrapper md:w-1/2 mx-3 md:mx-auto">
    <Share getPosts={() => getPosts()}/>
    <div className='p-1'>
        {
          posts.map((data, i) => (
            <div key={i}>
              <Post {...data}/>
            </div>
          ))
        }
    </div>
  </div>
</div>
}

export default Feeds;
