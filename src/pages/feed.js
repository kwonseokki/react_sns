import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ModalBox, PostionBox, SpanText, CircleImg, FlexBox, PostOverlay, OuterBox, UserCommentBtn } from '../css/style.js'
import { addLikeList } from '../store.js';

/*  피드컴포넌트 */

const Feed = ({ postData, setPostData, idx }) => {
    let dispatch = useDispatch();
    let [isOpen, setIsOpen] = useState(false);
    // CommentBox 시작
    const CommentBox = ({ userPost, setIsOpen, setPostData, idx }) => {
        return (
            <PostOverlay className='comment-overlay' bg="rgba(0,0,0,0.8)" onClick={(e) => {
                e.preventDefault();
                if (e.target.classList.contains('comment-overlay')) {
                    setIsOpen(false);
                }
                return;
            }}>
                {/* 댓글모달창 */}
                <ModalBox ps="relative" ps_t="50%" ps_l="50%">
                    {/* 사진 BOX */}
                    <PostionBox w="70%" h="700px" ps="absolute" bgMode bg={userPost.postImage}>
                    </PostionBox>
                    {/* 유저정보 댓글 */}
                    <PostionBox w="30%" h="700px" ps="absolute" ps_l="70%" ps_t="0%" bg="#fff" dp="flex">
                        <div style={{ padding: "5px" }}>
                            {/* 작성한 유저정보 */}
                            <FlexBox w="100%" h="50px" j_c="flex-start" a_i="center">
                                <CircleImg img={userPost.userImage} w="35px" h="35px"></CircleImg>
                                <SpanText>{userPost.name}</SpanText>
                            </FlexBox>
                            {/* 유저작성글 */}
                            <PostionBox w="100%" h="150px" ps_l="0" ps_t="0" >
                                {userPost.content}
                            </PostionBox>
                            {/* 댓글존 */}
                            <PostionBox w="100%" h="430px" style={{ overflowY: "scroll" }}>
                                <ul>
                                    {userPost.comments.map((getComment, i) => {
                                        return (

                                            <li>
                                                <FlexBox dp="flex" a_i="center">
                                                </FlexBox>

                                                <span>{getComment.name}님</span>
                                                <p style={{ textAlign: "left", padding: "10px" }}>{getComment.comment}</p>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </PostionBox>

                            <PostionBox w="100%" h="50px">
                                <input id="input-commnet" style={{ border: "none", width: "80%", height: "50px", fontSize: "1.2rem" }}></input>
                                {/* 댓글입력 */}
                                <UserCommentBtn onClick={() => {
                                    const userInput = document.getElementById('input-commnet').value;
                                    const addNewComment = [...postData];
                                    const getAcount = JSON.parse(localStorage.getItem('acount'));
                                    const getName = getAcount.id;
                                    addNewComment[idx].comments.push({ name: getName, comment: userInput });
                                    setPostData(addNewComment);
                                }}>게시</UserCommentBtn>
                            </PostionBox>
                        </div>

                    </PostionBox>
                </ModalBox>
            </PostOverlay>
        )
    }

    // CommentBox:댓글박스

    return (
        // 피드
        <OuterBox w="100%" mg="0 0 10px 0" bg="#fff">
            {/* isOpen == true CommnetBox컴포넌트 생성 */}
            {isOpen == true ? <CommentBox idx={idx} userPost={postData[idx]} setPostData={setPostData} setIsOpen={setIsOpen}></CommentBox> : null}
            {/* 피드상단 유저이미지/유저정보/날짜 */}
            <FlexBox j_c="space-between" a_i="center" style={{ padding: "10px" }}>
                <FlexBox a_i="center">
                    <CircleImg img={postData[idx].userImage} w="40px" h="40px"></CircleImg>
                    &nbsp; <SpanText>{postData[idx].name}</SpanText>
                </FlexBox>
                <SpanText>{postData[idx].date}</SpanText>
            </FlexBox>
            {/* 피드중단 피드사진 */}
            <PostionBox h="60vh" bgMode bg={postData[idx].postImage} className={postData[idx].filter}> </PostionBox>
            {/* 피드하단 좋아요 및 글정보 */}
            <div>
                <FlexBox a_i="center" style={{ height: "60px", padding: "20px" }}>
                    <SpanText onClick={() => {
                        const getPost = [...postData];
                        if (getPost[idx].liked == false) {
                            getPost[idx].liked = true;
                            getPost[idx].likes++;
                            dispatch(addLikeList(getPost[idx]));
                        } else if (getPost[idx].liked == true) {
                            getPost[idx].liked = false;
                            getPost[idx].likes--;
                        }
                        setPostData(getPost);
                    }}>
                        <i class="fi fi-bs-heart"></i>
                    </SpanText>
                    <SpanText>
                        <i class="fi fi-rs-comments"></i>
                    </SpanText>
                </FlexBox>
                {/* 글본문 */}
                <FlexBox style={{ height: "60px", textAlign: "left", paddingLeft: "20px" }} f_d="column">
                    <SpanText>{postData[idx].likes} Likes</SpanText>
                    <p>{postData[idx].content}</p>
                    <SpanText f_s="0.8rem" c="gray" onClick={() => {
                        setIsOpen(true);
                    }}>댓보기</SpanText>

                </FlexBox>
            </div>
            <PostionBox>
                <input style={{ border: "none", width: "80%", height: "50px", fontSize: "1.2rem" }}></input>
                <UserCommentBtn>게시</UserCommentBtn>
            </PostionBox>
        </OuterBox>
    )
}

// Card.js 끝



export { Feed }