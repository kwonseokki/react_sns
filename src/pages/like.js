import { useSelector } from 'react-redux';
import { OuterBox, PostionBox, FlexBox, SpanText } from '../css/style.js'



const LikePage = () => {
    let likeLists = useSelector((state)=> {
        return state.likeList.likeFeed;
    })
    return (
        <PostionBox ps="absolute" bg="#fff" w="300px" h="300px" ps_r="0" style={{ maxHeight: "300px", overflowY: "scroll" }}>
            <OuterBox onClick={()=>{
                console.log(likeLists);
            }} pd="10px" style={{ border: "none" }} >
                <ul>
                    {
                        likeLists.map((likefeed) => {
                            return (
                                <li style={{ marginBottom: "5px" }}>
                                    <FlexBox style={{ height: "50px" }}>
                                        <img src={likefeed.postImage}></img>
                                        <SpanText f_s="0.7rem" pd="5px">{likefeed.name}님의 게시물을 좋아요를 눌렀습니다.</SpanText>
                                    </FlexBox>
                                </li>
                            )
                        })
                    }
                </ul>
            </OuterBox>
        </PostionBox>
    )
}

export { LikePage }