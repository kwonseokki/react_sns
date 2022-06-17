import './App.css';
import { Header, HeaderContents, TitleLogo, HeaderIcons} from './css/component.js';
import { Card, PostBox} from './pages/pages.js';
import { LoginPage } from './pages/login';
import tempData from './temp/temp.js';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';



function App() {
  let [isLogin, setIsLogin] = useState(true);
  let [postStep , setPostStep] = useState(0);
  let [postData, setPostData ] = useState(tempData);
  // 0글작성X / 1사진 및 필터선택 / 2 글입력 => 완료시 다시0으로

  let navigator = useNavigate();
  useEffect(()=>{
    if(isLogin== false) {
     navigator('/login');
    }
  },[isLogin])
  
  return (
    <div className="App">
      <Routes>
    <Route path='*' element={<div>
    </div>}></Route>
        <Route path='/' element={
          <div>
          
      {/* 헤더영역 */}
     <div>
        <Header bg="#fff">
      <HeaderContents display="flex" rule="space-between" align="center">
       <TitleLogo f_s="1.5rem">seokstagram</TitleLogo>
        <div>검색바</div>

       <HeaderIcons>
         <span onClick={()=>{setPostStep(1)}}> 
           <i class="fi fi-ss-add document"></i>
           </span>
       <span>  <i class="fi fi-ss-comment-heart"></i></span>
      
        </HeaderIcons>
      </HeaderContents>
      </Header>
    
      </div>  
      
      {/* 헤더 끝 */}
          <div className='container'>
    {
      postData.map((json, idx)=>{
        return (
          <Card postData={postData} setPostData={setPostData} idx={idx}/>
        )
      
      })
    }
      </div>
   {postStep != 0 ? <PostBox postStep={postStep} setPostStep={setPostStep} postData={postData} setPostData={setPostData} tempData={tempData}></PostBox> : null }
    </div>}>
    </Route>

        <Route path='/login' element={<LoginPage setIsLogin={setIsLogin} navigator={navigator}></LoginPage>}></Route>
      </Routes>


    
    </div>
  );
}

export default App;
