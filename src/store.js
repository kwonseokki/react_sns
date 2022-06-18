import { configureStore, createSlice } from '@reduxjs/toolkit'

const likeList = createSlice({
    name : "likeList",
    initialState : {
        likeFeed : [],
    }, reducers : {
        addLikeList(state, action) {
           const copy = JSON.parse(JSON.stringify(action.payload));
           state.likeFeed.push(copy);
        }
    }

})
export const { addLikeList } = likeList.actions;
const newPost = createSlice({
      name : "newPost",
      initialState : {
      id : 0,  
      name: "",
      postImage:"",
      userImage: "data:image/jpeg;base64,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",
      likes: 0,
      liked:false,
      comments : []
    },
    reducers : {
        setObj(state, action){
            let obj = action.payload
            switch(obj.type) {
                case "picture":
                state.postImage=obj.postImage;
                break;
                case "filter":
                state.filter=obj.filter; 
                break;
                case "post":
                state.content=obj.content;
                break;
                case "id":
                state.id=obj.id;
                break;
                case "name":
                state.name=obj.name; 
                break;
            }
        }
    }
});


export const { setObj } = newPost.actions;

export default configureStore({
    reducer: { 
        newPost : newPost.reducer,
        likeList : likeList.reducer
        // isOpenComment : isOpenComment.reducer
     }
  }) 

export {}