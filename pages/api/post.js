import initDB from "../../utils/initDB";
import Post from "../../modals/Post";
initDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
       try {
        const posts  = await Post.find().sort({'_id':-1});;
        return res.status(200).json(posts);
       } catch (error) {
        console.log("hey get",error);
        return res.status(500).json({error: error});
       }
      break;
    case "POST":
        try {
            const { name, title, picture, gif } = req.body;
            if (!name && !title) {
            return res
                .status(422)
                .json({ error: "please fill all the required fields" });
            }
            const newPost = await new Post({
            name,
            title,
            picture,
            gif,
            }).save();
            return res.status(200)
            .json({ success: "post created" });
        } catch (error) {
            console.log("hey",error);
            return res.status(500).json({error: error});
        }
      break;
  }
}
