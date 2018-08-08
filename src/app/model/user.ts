export class User {

    constructor(
        public uid: string,
        public email: string,
        public dateCreated: string,
        public dateUpdated: string,
        public displayName: string = "",
        public status: string = 'newbie'
    ) {}
}
