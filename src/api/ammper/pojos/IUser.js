class ILogin {
    username;
    password;

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}


class IUser {
    username;
    firstName;
    lastName;
    loggedIn;

    constructor(username=null, firstName=null, lastName=null, loggedIn=false) {
        this.username = username;
        this.firstName = firstName;
        this.last_name = lastName;
        this.loggedIn = loggedIn;
    }
}

export {ILogin, IUser};
