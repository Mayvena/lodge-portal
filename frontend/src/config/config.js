const config = {
    LOGIN_URL       : "/login",
    REGISTER_URL    : "/register",
    LIST_FILES_URL  : "/files",
    TRANSLATIONS_URL: "/translations",
    HEADERS         : "{ headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://192.168.0.111:1234/' }, withCredentials: false }",

    USER_REGEX      : "/^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/",
    PWD_REGEX       : "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/",
}

export default config;