const PATH = "./data.json"
const fs = require('fs');

class Post{

    get(){
        return this.readData();
    }
    getIndividualPost(postId){
        const posts = this.readData();
        const foundPost = posts.find((post) => post.id == postId);
        return foundPost;
    }
    add(newPost){
        //
        const currentPosts = this.readData();
        //unshift add element at the beginning of an array and extend its size
        currentPosts.unshift(newPost)
        this.storeData(currentPosts);
    }
    readData(){
        let rawdata = fs.readFileSync(PATH);
        let posts = JSON.parse(rawdata);
        return posts;
    }
    storeData(rawdata){
        let data = JSON.stringify(rawdata);
        fs.writeFileSync(PATH,data)
    }

}
module.exports = Post;