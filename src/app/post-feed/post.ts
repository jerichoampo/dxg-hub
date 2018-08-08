export class Post {
    constructor(
        public post_id: string,
        public title: string,
        public body: string,
        public user_id: string,
        public date_posted: string
    ) {}
}
