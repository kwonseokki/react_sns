// 포스트정보 더미데이터
export default [
    { 
      id:0,
      name: "Kim Hyun",
      userImage: "https://placeimg.com/100/100/arch",
      postImage: "https://placeimg.com/640/480/arch",
      likes: 36,
      date: "May 15",
      liked: false,
      content: "더미 데이터 내용1 ",
      filter: "perpetua",
      comments : [{name:"John Doe", comment:"John의 댓글"}, {name:"Minny", comment:"Minny의 댓글"}]
    },
    {
      id:1,
      name: "John Doe",
      userImage: "https://placeimg.com/200/200/people",
      postImage: "https://placeimg.com/640/480/people",
      likes: 20,
      date: "Apr 20",
      liked: false,
      content: "더미 데이터 내용2",
      filter: "clarendon",
      comments : [{name:"John Doe", comment:"John의 댓글2"}]
    },
    {
      id:2,
      name: "Minny",
      userImage: "https://placeimg.com/100/100/animals",
      postImage: "https://placeimg.com/640/480/animals",
      likes: 49,
      date: "Apr 4",
      liked: false,
      content: "더미 데이터 내용3",
      filter: "lofi",
      comments : [{name:"Minny", comment:"John의 댓글3"}]
    },
  
  ]