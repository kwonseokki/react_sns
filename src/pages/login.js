import { OuterBox, TitleLogo, UserInput } from "../css/component";
const LoginPage = ({setIsLogin, navigator})=>{
    return (
  <div style={{background:"FAFAFA", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>            
      <OuterBox bg="#fff" w="30%" h="500px" m="0 20px" style={{minWidth:"321px", maxWidth:"400px"}}>
          
           
            </OuterBox>


            <OuterBox bg="#fff" w="30%" h="500px" m="0 20px" style={{minWidth:"321px", maxWidth:"400px"}}>
          <form name="login_validation" id="login-form">
          <TitleLogo f_s="2rem">seokstagram</TitleLogo>
         <UserInput bg="#FAFAFA" p="15px" type="text" name="id" placeholder="아이디를 입력해주세요."></UserInput>
          <UserInput bg="#FAFAFA" p="15px" type="password" name="pw" placeholder="비밀번호를 입력해주세요."></UserInput>
          
              
          <div onClick={(e)=>{
              e.preventDefault();
              const form = document.login_validation;
              console.log(form);
              const loginData = {}
              loginData.id = form.id.value;
              loginData.pw = form.pw.value;
              if(loginData.id == "test" && loginData.pw == 1234) {
                  setIsLogin(true);
                  navigator('/');
              } else {
                  form.id.value="";
                  form.pw.value="";
              }
          }}>
          <UserInput type="button" value="로그인" p="10px" bg="#B2DFFC" style={{width:"100%"}}  /> </div>
          </form>      
   
          </OuterBox>
            </div>

    )
}

export { LoginPage }