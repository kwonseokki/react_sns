import { useDispatch, useSelector } from 'react-redux';
import { filters } from '../temp/filter.js';
import { setObj } from '../store.js';
import { ModalBox, PostionBox, CircleImg, FlexBox, PostOverlay, InnerList } from '../css/style.js'
import { useEffect, useState } from 'react';
// PostBox:글발행 컴포넌트
const PostBox = ({ postStep, setPostStep, postData, setPostData }) => {
    // 사진업로드 여부
    let [isFile, setIsFile] = useState(false);
    let dispatch = useDispatch();
    let newPost = useSelector((state) => {
        return state.newPost;
    })
    return (
        <div>
            <PostOverlay bg="rgba(0,0,0,0.4)">
                <ModalBox w="80%" h="80vh" ps="relative" ps_t="50%" ps_l="50%" tf="translate(-50%, -50%)" style={{ borderRadius: "20px", maxWidth:"925px"}}>
                    <FlexBox j_c="space-between" a_i="center" bg="#fff" style={{ padding: "10px" }}>
                        {/* postStep상태에 따라서 모달창 상단 변경 */}
                        <span onClick={() => {
                            setPostStep(--postStep);
                        }}>{postStep == 2 ? <span>이전</span> : <span>취소</span>}</span>

                        <span>{postStep == 1 ? <span>사진선택</span> : <span>글쓰기</span>}</span>
                        <span onClick={() => {
                            // 글발행 완료시 postStep 0으로 초기화
                            setPostStep(++postStep);
                            if (postStep == 3) {
                                setPostStep(0);
                            }
                        }}>{postStep == 2 ? <span onClick={() => {
                            const copyNewPost = JSON.parse(JSON.stringify(newPost));
                            const addNewPost = [copyNewPost, ...postData];
                            setPostData(addNewPost);
                        }}>완료</span> : <span onClick={() => {
                            if (isFile !== true) {
                                alert("사진을 등록해주세요.");
                                setPostStep(--postStep);
                            }
                            const postLengths = postData.length;
                            const getAcount = JSON.parse(localStorage.getItem('acount'));
                            const getName = getAcount.id;

                            dispatch(setObj({ type: "id", id: postLengths }));
                            dispatch(setObj({ type: "name", name: getName }));
                        }}>다음</span>}</span>
                    </FlexBox>
                    {/* 스텝별 컨텐츠 변경  */}
                    <PostStepComponent postStep={postStep} isFile={isFile} setIsFile={setIsFile} dispatch={dispatch}>

                    </PostStepComponent>
                </ModalBox>
            </PostOverlay>
        </div>

    )
}


// 스텝별로 컨텐츠 변경

const PostStepComponent = ({ postStep, isFile, setIsFile, dispatch }) => {
    let [fade, setFade] = useState("end");
    let [fakeState, setFakeState] = useState(0);
    useEffect(() => {
        setTimeout(() => { setFade("end") }, 100);
        return () => {
            setFade('');
        }
    }, [fakeState]);
    let newPost = useSelector((state) => {
        return state.newPost;
    });
    // step 1 사진등록
    if (postStep == 1) {
        return (
            <div>
                {isFile == true ? <FlexBox>
                    <PostionBox w="60%" h="657px" className={newPost.filter} bgMode bg={newPost.postImage}>
                        <span className={`selected-filter start ${fade}`} >{newPost.filter}</span>
                    </PostionBox>
                    <FlexBox style={{ width: "40%", height: "657px", overflowY: "scroll" }} bg="#000" f_w="wrap" j_c="space-around">
                        {
                            filters.map((filterName) => {
                                return (
                                    <ul>
                                        <InnerList w="100px" h="100px" className={`${filterName} filter-box`} bg={newPost.postImage}
                                            onClick={() => {
                                                // 새로운 글정보에 filter정보 입력
                                                dispatch(setObj({ type: "filter", filter: filterName }));
                                                if (fakeState == 0) {
                                                    setFakeState(true);
                                                } else {
                                                    setFakeState(false);
                                                }

                                            }}> <p className='filter-name'>{filterName}</p></InnerList>
                                    </ul>
                                )
                            })
                        }
                    </FlexBox>
                </FlexBox>
                    : <PostionBox w="100%" h="657px" ps="relative" bg="#fff">
                        <PostionBox id="drop-zone" w="90%" h="90%" ps="absolute" ps_t="50%" ps_l="50%"
                            style={{ borderRadius: "20px", border: "10px  dotted #58ACFA", display: "flex", alignItems: "center", justifyContent: "space-around", transform: "translate(-50%, -50%)" }}
                            onDragEnter={(e) => {
                                e.preventDefault();
                                const dropZone = document.getElementById('drop-zone');
                                dropZone.style.backgroundColor = 'skyblue';
                            }}
                            onDragOver={(e) => {
                                e.preventDefault();
                            }}
                            onDragLeave={(e) => {
                                e.preventDefault();
                                const dropZone = document.getElementById('drop-zone');
                                dropZone.style.backgroundColor = '#fff';
                            }}
                            onDrop={(e) => {
                                e.preventDefault();
                                const dropZone = document.getElementById('drop-zone');
                                const fileDatas = e.dataTransfer.files;
                                const url = URL.createObjectURL(fileDatas[0]);
                                // 중복파일 등록불가
                                if (fileDatas.length > 1) {
                                    alert("중복파일 등록은 준비중입니다.");
                                    return
                                }
                                dropZone.style.backgroundColor = '#fff';
                                dropZone.innerHTML = fileDatas[0].name;
                                // 이미지url정보 등록
                                dispatch(setObj({ type: "picture", postImage: url }));
                                setIsFile(true);
                            }}>
                            <span><i class="fi fi-br-picture"></i> 파일을 드롭해주세요
                            </span>
                        </PostionBox>
                    </PostionBox>}

            </div>
        )
    }
    // step2 글발행
    else if (postStep == 2) {
        return (
            <PostionBox ps="relative">
                <PostionBox w="70%" h="657px" ps="absolute" bgMode bg={newPost.postImage} className={newPost.filter}>

                </PostionBox>
                <PostionBox w="30%" h="657px" ps="absolute" ps_l="70%" bg="#fff">
                    <div style={{ padding: "5px" }}>
                        <FlexBox a_i="center">

                            <CircleImg img={newPost.userImage} w="35px" h="35px"></CircleImg>
                            <span>{newPost.name}</span>
                        </FlexBox>
                    </div>
                    <PostionBox w="100%" h="150px" ps_l="0" ps_t="0">
                        <textarea onChange={(e) => {
                            let inputVal = e.target.value;
                            dispatch(setObj({ type: "post", content: inputVal }));
                        }} style={{ width: "100%", height: "100%", border: "1px solid lightgrey" }}></textarea>
                    </PostionBox>
                </PostionBox>
            </PostionBox>
        )
    }
}

export { PostBox }