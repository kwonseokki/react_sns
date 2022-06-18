import styled from 'styled-components';

let PostOverlay = styled.div`
    width:100%;
    height:100vh;
    background:${props => props.bg};
    position:fixed;
    z-index:9999;
    top:0;
    left:0;
`;

// flex박스
const FlexBox = styled.div`
  display:flex;
  flex-direction: ${props => props.f_d};
  justify-content: ${props => props.j_c};
  flex-wrap:${props => props.f_w};
  align-items: ${props => props.a_i};
  background:${props => props.bg}
`;

const OuterBox = styled.div`
    width:${props => props.w};
    height:${props => props.h};
    margin: ${props => props.mg};
    padding:${props => props.pd};
    background : ${props => props.bg};
    border:1px solid lightgrey;
    overflow:hidden
`

const PostionBox = styled.div`
    position:${props => props.ps};
    width:${props => props.w};
    height:${props => props.h};
    left:${props => props.ps_l};
    top:${props => props.ps_t};
    right:${props => props.ps_r};
    background  : ${props=> props.bgMode==true ? `url(${props.bg})` : props.bg };
    background-size:cover
`

const ModalBox = styled(PostionBox)`
    transform:translate(-50%, -50%);
    width:80%;
    height:700px;
    border-radius:20px;
    overflow:hidden
`;

const  SpanText = styled.span`
    font-size : ${props => props.f_s};
    color:${props => props.c};
    padding:${props=>props.pd}
`;



let CircleImg = styled.img`
    background:url(${props => props.img}) center center no-repeat;
    width:${props => props.w};
    height:${props => props.h};
    border-radius:50%;
`;

let InnerList = styled.li`
    width:${props => props.w};
    height:${props => props.h};
    margin-top:10px;
    background:url('${props => props.bg}')center center;
    background-size:cover
`;

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

export { PostionBox, UserComment, InnerList, UserCommentBtn,  ModalBox, SpanText, CircleImg, FlexBox, PostOverlay, OuterBox }