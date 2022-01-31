import React, {useState} from "react";

function Share({getPosts}) {
  const [media,setMedia] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [searchedGif, setSearchedGif] = useState("");
  const [Gif, setGif] = useState("");
  let API_KEY = "tsB4Oc0HDH3z1bxu0eRnHnZ29HIb9hbM";
  const searchGif = async() => {
    let value = searchedGif;
    console.log(value)
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=20&q=${value}`);
      const result = await response.json();
      console.log(result);
      setGifs(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    let mediaUrl = "";
    alert("Success, Please wait for the response");
    if(media){
      mediaUrl = await imageUpload();
    }
    let data = {
      name: "Anonumous",
      [e.target.title.name]: e.target.title.value,
      [e.target.picture.name]: mediaUrl,
      gif: Gif
    }
    handleReset();
    try {
      console.log("e",data);
      const res =  await fetch(`https://public-post.vercel.app/api/post`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      })
      const res2 = await res.json();
      getPosts();
      console.log("success", res2);
    } catch (error) {
      console.log("error+",error);
    }
  }

  const imageUpload = async ()=>{
    const data =  new FormData()
    data.append('file',media)
    data.append('upload_preset',"gurukripa")
    data.append('cloud_name',"cwmohit")
    const res = await fetch("https://api.cloudinary.com/v1_1/cwmohit/image/upload",{
      method:"POST",
      body:data
    })
    const res2  = await res.json()
    return res2.url
  }

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    setMedia("");
    setGif("");
    setIsOpen(false);
  };

  console.log(isOpen)

  return (
    <form onSubmit={onSubmit} className="input-share-container border border-2 p-2 rounded-md shadow-indigo-500/40">
      <div className="flex">
        <input
          placeholder="what is in your mind?"
          className="py-4 px-1 border-none outline-none w-full"
          name="title"
          required
        />
        <button type="submit" className="px-1 text-gray-600 font-sans">Post</button>
      </div>
      <img className="responsive-img w-1/2 mb-2" src={media?URL.createObjectURL(media):""} />
      <img className="responsive-img w-1/2 mb-2" src={Gif}/>
      <div className="bottom-container flex space-x-5 text-gray-400">
            <div className="flex items-center">
               <img className="w-8" src="https://cdn3.iconfinder.com/data/icons/file-20/100/file_9-512.png" alt="upload"/>
               <div>
                {/* <h3 className="cursor-pointer">Pictures</h3> */}
                <input type="file" 
                    accept="image/*"
                    placeholder="select"
                    onChange={(e)=>setMedia(e.target.files[0])}
                    name="picture"
                  />
               </div>
            </div>
          
            <div className="flex items-center">
               <img className="w-8" src="https://cdn3.iconfinder.com/data/icons/file-20/100/file_9-512.png" alt="upload"/>
               <h3 className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>GIF</h3>
            </div>
      </div>

      {
        isOpen && <>
          <div className="modal py-2 w-1/2 ml-auto">
            <div className="modal-content flex">
              <input onChange={(e) => setSearchedGif(e.target.value)} className="py-2 px-1 border-none outline-none w-full" placeholder="Search GIF"/>
              <button type="button" onClick={() => searchGif()} className="px-1 text-gray-600 font-sans">Search</button>
            </div>
             <div className="grid grid-cols-4 gap-3 max-h-44 overflow-auto" >
               {
                 gifs.map((data, i) => (
                   <img onClick={() => setGif(data?.images?.downsized?.url)} className="cursor-pointer" key={i} src={data?.images?.downsized?.url} alt={data?.title}/>
                 ))
               }
             </div>
          </div>
        </>
      }
    </form>
  );
}

export default Share;
