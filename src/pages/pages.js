
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { filters } from '../temp/filter.js';
import { setObj, setOpenComment } from '../store.js';
import { dayFormat } from '../js/dayFormat.js';
import {OuterBox, UserInput} from '../css/component.js';



let BoxHeader = styled.div`
    width:100%;
    display: flex;
    justify-content:${props => props.flex_j_c};
    align-items: center;
    padding:10px;
    border: ${props => props.bd}
`;

let UserHeaderImg = styled.img`
    background:url(${props => props.img}) center center no-repeat;
    width:${props=>props.w};
    height:${props=>props.h};
    border-radius:50%;
`;

let UserImage = styled.div`
    width:100%;
    height:500px;
    max-height:700px;
    min-height:300px;
    background:url(${props=>props.image});
    background-size:cover;
`;

let PostInfo = styled.div`
    height:60px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:20px;
`
let PostText = styled.div`
    display:flex;
    padding:0 20px;
    flex-direction: column;
    align-items: flex-start;
`
let UserComment = styled.div`
    width:100%;
    height:50px;
    border-top:1px solid lightgrey
`
let UserCommentBtn = styled.button`
    width:20%;
    height:50px; 
    background:none;
    border:none;
    &:hover {background:skyblue; color:#fff}
`;

let PostOverlay = styled.div`
    width:100%;
    height:100vh;
    background:rgba(0,0,0,0.8);
    position:fixed;
    z-index:9999;
    top:0;
    left:0;
`;

let InnerBox = styled.div`
    width:${props => props.w};
    height:${props => props.h};
    position:${props => props.ps};
    top:${props => props.ps_t};
    left:${props => props.ps_l};
    display:${props => props.dp || "block"};
    background:${props => props.bg || "#fff"};
    transform:${props => props.tf};
    max-width:${props => props.max_w};
    overflow:hidden;
`;

let InnerList = styled.li`
    width:${props => props.w};
    height:${props => props.h};
    margin-top:10px;
    background:url('${props => props.bg}')center center;
    background-size:cover
`

// Card 시작

const Card = ({postData, setPostData, idx})=> {
    let [isOpen , setIsOpen] = useState(false);
    
    useEffect(()=>{
      
    })

    // CommentBox 시작
    const CommentBox = ({userPost, setIsOpen, setPostData, idx}) => {
        console.log(idx);
        return (
            <PostOverlay className='comment-overlay' style={{background:"rgba(0,0,0,0.4)"}} onClick={(e)=>{
                e.preventDefault();
                console.log(e.target.classList);
                if(e.target.classList.contains('comment-overlay')) {
                    setIsOpen(false);
                }
                return;
            }}>
            <InnerBox  w="80%" h="700px" ps="relative" ps_t="50%" ps_l="50%" tf="translate(-50%, -50%)" max_w="925px;" style={{borderRadius:"20px"}}>
               
            <InnerBox w="70%" h="700px" ps="absolute"  style={{background:`url(${userPost.postImage})center center no-repeat`, backgroundSize:"cover"}}> 
              
                </InnerBox>

                <InnerBox w="30%" h="700px" ps="absolute" ps_l="70%" ps_t="0%" bg="#fff" dp="flex"> 
       <div style={{padding:"5px"}}>
                   <InnerBox w="100%" h="50px"  ps_l="0" ps_t="0" dp="flex" style={{alignItems:"center"}}> 
                  
                   <UserHeaderImg img={userPost.userImage} w="35px" h="35px"></UserHeaderImg><span>{userPost.name}</span>
                  
                   </InnerBox>
                   <InnerBox w="100%" h="150px" ps_l="0" ps_t="0" > 
                {userPost.content}
                   </InnerBox>
                   {/* 댓글존 */}
                   <InnerBox w="100%" h="430px">
                       <ul>
                {userPost.comments.map((getComment, i)=>{
          
                   
                  
                    return (
                        
                        <li>
                            <InnerBox dp="flex" style={{alignItems:"center"}}>
                            {/* <UserHeaderImg img={searchId.userImage} w="35px" h="35px"></UserHeaderImg>&nbsp;&nbsp;
                            <span style={{fontSize:"0.8rem"}}>{searchId.name}</span> */}
                            </InnerBox>
                            <p style={{textAlign:"left", padding:"10px"}}>{getComment.comment}</p>
                            </li>
                    )
                })}
                </ul>
                   </InnerBox>
                   <UserComment>
            <input id="input-commnet" style={{border:"none", width:"80%", height:"50px", fontSize:"1.2rem"}}></input>
         {/* 댓글입력 */}
        <UserCommentBtn onClick={()=>{
           const userInput = document.getElementById('input-commnet').value;
           const addNewComment = [...postData]; 
           addNewComment[idx].comments.push({name:"user", comment:userInput});
         
           setPostData(addNewComment);
            console.log(postData);
        }}>게시</UserCommentBtn>
        </UserComment>
                   </div>
                
                </InnerBox>
            </InnerBox>
            </PostOverlay>
        )
    }

    // CommentBox:댓글박스

    return (
       <OuterBox w="100%" m="0 0 10px 0" bg="#fff">
     {isOpen == true ?   <CommentBox idx={idx} userPost={postData[idx]} setPostData={setPostData} setIsOpen={setIsOpen}></CommentBox> : null} 
            <BoxHeader flex_j_c="space-between">
                <div style={{display:"flex", alignItems:"center"}}>
            <UserHeaderImg img={postData[idx].userImage} w="50px" h="50px"></UserHeaderImg>
                &nbsp;<span>{postData[idx].name}</span>
                </div>
                <span>{postData[idx].date}</span>
            </BoxHeader>
            <UserImage image={postData[idx].postImage} className={postData[idx].filter}> </UserImage>

            <div>
            <PostInfo>
                <span>
                <i class="fi fi-bs-heart"></i>
                </span>
                <span>
                <i class="fi fi-rs-comments"></i>
                </span>
                </PostInfo>
            <PostText>
                <span>{postData[idx].likes} Likes</span><br/>
                <span>{postData[idx].content}</span><br/>
                <span style={{fontSize:"0.9rem", color:"gray"}} onClick={()=>{
                   setIsOpen(true);
                }}>댓보기</span>
            
            </PostText>
            </div>
        <UserComment>
            <input style={{border:"none", width:"80%", height:"50px", fontSize:"1.2rem"}}></input>
         
        <UserCommentBtn>게시</UserCommentBtn>
        </UserComment>
        </OuterBox>
    )
}

// Card.js 끝

// PostBox:글발행 컴포넌트
const PostBox = ({postStep, setPostStep, postData, setPostData}) => {
    let [isFile , setIsFile] = useState(false);
    let dispatch = useDispatch();
   
    let newPost = useSelector((state)=>{
        return state.newPost;
    })
    return (
        <div>
             <PostOverlay >
                <InnerBox w="80%" h="700px" ps="relative" ps_t="50%" ps_l="50%" tf="translate(-50%, -50%)" max_w="925px;" style={{borderRadius:"20px"}}>
            <BoxHeader flex_j_c="space-between" bd="1px solid lightgrey">
                <span onClick={()=>{
                    setPostStep(--postStep);
                }}>{postStep == 2 ?<span>이전</span> : <span>취소</span>}</span>
                <span>{postStep == 1 ? <span>사진선택</span> : <span>글쓰기</span> }</span>
                <span onClick={()=>{
                    setPostStep(++postStep);
                    if(postStep == 3) {
                        setPostStep(0);
                    }
                }}>{postStep == 2 ? <span onClick={()=>{
                    const copyNewPost = JSON.parse(JSON.stringify(newPost));
                    const addNewPost = [ copyNewPost, ...postData];
                    setPostData(addNewPost);
                }}>완료</span> : <span onClick={()=>{
                   if(isFile !== true) {
                       alert("사진을 등록해주세요.");
                       setPostStep(--postStep);
                   }
                   const postLengths = postData.length;
                   dispatch(setObj({type:"id", id:postLengths}));
                   dispatch(setObj({type:"name", name:"user"}));
                }}>다음</span>}</span>
                </BoxHeader>
                <PostStepComponent postStep={postStep} isFile={isFile} setIsFile={setIsFile} dispatch={dispatch}>

                </PostStepComponent>
                </InnerBox>
            </PostOverlay>
        </div>
       
    )
}

// PostBox:글발행 컴포넌트


const PostStepComponent = ({postStep, isFile, setIsFile, dispatch}) => {
let [fade, setFade] = useState("end");
let [fakeState, setFakeState] = useState(0);
useEffect(()=>{
    setTimeout(()=>{setFade("end")},100);
    return ()=>{
        setFade('');
    }
}, [fakeState])   
let newPost = useSelector((state)=>{
    return state.newPost;
})
    if(postStep == 1) {
        return (
            <div>
                {isFile == true ? <div style={{position:"relative"}}>
                    <InnerBox w="60%" h="657px" ps="absolute" className={newPost.filter} style={{background:`url(${newPost.postImage})center center`, backgroundSize:`cover`}}> 
                   <span className={`selected-filter start ${fade}`} >{newPost.filter}</span>
                </InnerBox>
                <InnerBox w="39%" h="657px" ps="absolute" ps_l="60%" ps_t="0%" bg="#000" dp="flex" style={{flexWrap:"wrap", justifyContent:"space-around", overflowY:"scroll"}}> 
               {
                   filters.map((filterName)=>{
                       return (
                           <ul>
                           <InnerList w="100px" h="100px"  className={`${filterName} filter-box`} bg={newPost.postImage}
                           onClick={()=>{
                               dispatch(setObj({type:"filter", filter:filterName}));
                               if(fakeState == 0) {
                                setFakeState(true);
                               } else {
                                setFakeState(false);
                               }
                              
                           }}> <p className='filter-name'>{filterName}</p></InnerList>
                           </ul>
                       )
                   })
               }
                </InnerBox>
                </div> 
                :  <InnerBox w="100%" h="657px" ps="relative">
                <InnerBox id="drop-zone" w="90%" h="90%" ps="absolute" ps_t="50%" ps_l="50%" tf="translate(-50%, -50%)"
                style={{borderRadius:"20px", border:"10px  dotted #58ACFA", display:"flex", alignItems:"center", justifyContent:"space-around"}}
                onDragEnter={(e)=>{
                    e.preventDefault();
                    const dropZone = document.getElementById('drop-zone');
                    dropZone.style.backgroundColor = 'skyblue';
                   
                }}
                onDragOver={(e)=>{
                    e.preventDefault();
                }}
                onDragLeave={(e)=>{
                    e.preventDefault();
                    const dropZone = document.getElementById('drop-zone');
                    dropZone.style.backgroundColor = '#fff';
                }}
                onDrop={(e)=>{
                    e.preventDefault();
                    const dropZone = document.getElementById('drop-zone');
                    const fileDatas = e.dataTransfer.files;
                    const url = URL.createObjectURL(fileDatas[0]);
                    console.log(url)
                    if(fileDatas.length > 1) {
                        alert("중복파일 등록은 준비중입니다.");
                        return
                    }
                    dropZone.style.backgroundColor = '#fff';
                    dropZone.innerHTML=fileDatas[0].name;
                    dispatch(setObj({type:"picture", postImage:url}));
                    setIsFile(true);
                }}>
                   <span><i class="fi fi-br-picture"></i> 파일을 드롭해주세요
                  </span>
                   </InnerBox>
                    </InnerBox>}
               
            </div>
        )
    }

    else if(postStep == 2) {
        return (
            <div>
             <InnerBox w="70%" h="657px" ps="absolute" className={newPost.filter} style={{background:`url(${newPost.postImage})center center`, backgroundSize:`cover`}}> 
                   
                   </InnerBox>
                   <InnerBox w="30%" h="657px" ps="absolute" ps_l="70%" > 
                   <div style={{padding:"5px"}}>
                   <InnerBox w="100%" h="50px"  ps_l="0" ps_t="0" dp="flex" style={{alignItems:"center"}}> 
                  
                   <UserHeaderImg img={newPost.userImage} w="35px" h="35px"></UserHeaderImg><span>{newPost.name}</span>
                  
                   </InnerBox>
                   </div>
                   <InnerBox w="100%" h="150px" ps_l="0" ps_t="0" > 
                  <textarea onChange={(e)=>{
                      let inputVal =  e.target.value;
                      dispatch(setObj({type:"post", content:inputVal}));
                  }} style={{width:"100%", height:"100%", border:"none"}}></textarea>
                   </InnerBox>
                   </InnerBox>
            </div>
        )
    }
}



export { Card, PostBox}