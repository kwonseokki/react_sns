interface feed {
    id: number;
    name: string;
    userImage: string;
    postImage: string;
    likes: number;
    date: string;
    liked: boolean;
    content: string;
    filter: string;
    comments : [{name:string; comment:string}],
}

interface feedList extends Array<feed> {}

export { feedList }