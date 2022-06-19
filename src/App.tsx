import './App.css';
import { Header, HeaderContents, TitleLogo, HeaderIcons } from './css/component.js';
import { Feed } from './pages/feed.tsx';
import { PostBox } from './pages/post.js'
import { LoginPage } from './pages/login.tsx';
import { LikePage } from './pages/like.js';
import tempData from './temp/temp.js';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { feedList } from './pages/interface.tsx'

function App() {
  let [isLogin, setIsLogin] = useState<boolean>(true);   // 로그인상태 
  /*  글발행 단계
  0글작성X / 1사진 및 필터선택 / 2 글입력 => 완료시 다시0으로
  */
  let [postStep, setPostStep] = useState<number>(0);
  let [dispLike, setDispLike] = useState<boolean>(false);
  // 피드목록 더미데이터
  let [postData, setPostData] = useState<feedList>(tempData);

  let navigator = useNavigate();
  useEffect(() => {
    // 로그인상태 체크
    if (isLogin == false) {
      navigator('/login');
    }
  }, [isLogin])

  return (
    <div className="App">
      <Routes>
        <Route path='*' element={<div>존재하지 않는 페이지</div>}></Route>
        {/* 루트페이지 */}
        <Route path='/' element={
          <div>
            {/* 헤더영역 */}
            <div>
              <Header bg="#fff">
                <HeaderContents display="flex" rule="space-between" align="center">
                  <TitleLogo f_s="1.5rem">seokstagram</TitleLogo>
                  <HeaderIcons>
                    <span onClick={() => { setPostStep(1) }}>
                      <i className="fi fi-ss-add document"></i>
                    </span>
                    <span style={{ position: "relative" }} onClick={() => {

                      if (dispLike == false) {
                        setDispLike(true);
                      }
                      else {
                        setDispLike(false);
                      }

                    }}
                    >  <i className="fi fi-ss-comment-heart"></i>
                      {dispLike == true ? <LikePage></LikePage> : null}
                    </span>
                  </HeaderIcons>
                </HeaderContents>
              </Header>

            </div>

            {/* 헤더 끝 */}
            <div className='container'>
              {
                postData.map((json: object, idx: number) => {
                  return (
                    <Feed postData={postData} setPostData={setPostData} idx={idx} />
                  )

                })
              }


            </div>
            {/* postStep > 0 PostBox컴포넌트 렌더링 */}
            {postStep != 0 ? <PostBox postStep={postStep} setPostStep={setPostStep} postData={postData} setPostData={setPostData} ></PostBox> : null}
          </div>}>

        </Route>
        {/* 로그인 페이지 */}
        <Route path='/login' element={<LoginPage setIsLogin={setIsLogin} navigator={navigator}></LoginPage>}></Route>
        {/* 좋아요 목록 페이지 */}

      </Routes>
    </div>
  );
}

export default App;
