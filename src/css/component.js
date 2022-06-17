import styled from 'styled-components';

let Header = styled.header`
    width:100%;
    height:60px;
    position:fixed;
    background:${props => props.bg};
    z-index:100;
    border-bottom:1px solid lightgray;
`;

let HeaderContents = styled.div`
    width:100%;
    height:60px;
    max-width:925px;
    min-width:321px;
    margin:0 auto;
    display:${props => props.display};
    justify-content:${props => props.rule};
    align-items:${props => props.align};
    padding:10px;
`;
// 타이틀로고
let TitleLogo = styled.div`
    font-family: 'Dancing Script', cursive;
    font-size:${props => props.f_s};
`;
// 인풋 컴포넌트
let UserInput = styled.input`
    border: none;
    background: ${props => props.bg};
    padding: ${props => props.p};
    border-radius: 10px;
`

let HeaderIcons = styled.div`
    font-size:1.5rem;
    letter-spacing:5px
`;

let OuterBox = styled.div`
    width:${props => props.w};
    height:${props => props.h};
    margin:${props => props.m};
    background:${props => props.bg};
    border:1px solid lightgrey;
    overflow:hidden;
`;


export { Header, HeaderContents, TitleLogo, HeaderIcons, OuterBox, UserInput}