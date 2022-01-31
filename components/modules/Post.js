import React from 'react';

function Post({
    title,
    picture,
    gif
}) {
  return <div className='post-container border my-2 w-full p-1'>
     <div className='p-2'>
         {title}
     </div>
     <div className='w-full'>
         {picture && <img src={picture} alt={title}/>}
         {gif && <img src={gif} alt={title}/>}
     </div>
  </div>;
}

export default Post;
