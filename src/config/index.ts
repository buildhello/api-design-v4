import merge from "lodash.merge";

//make sure NODE_ENV is set, if has never been set, default to development
process.env.NODE_ENV = process.env.NODE_ENV || "development";

//you could have a staging environment on your local machine (you can switch between staging and local to test before deploy to production or production/staging)
//default staging to local
const stage = process.env.STAGE || "local";

let envConfig;

if (stage === "production") {//if you're running in the cloud on a live server get production config
envConfig = require("./prod").default;//use require, since server may not have modules or typescript configured
} else if (stage === "staging") {
envConfig = require("./staging").default;
} else if (stage === "testing") {
envConfig = require("./testing").default;
} else {
envConfig = require("./local").default;
}

/* switch syntax
switch: (stage){
case: "production"
envConfig = require("./prod").default;
break;
case: "staging"
envConfig = require("./staging").default;
break;
case: "testing"
envConfig = require("./testing").default;
break;
default:
envConfig = require("./local").default;
}
*/

//all the environment variables we want in our app
const defaultConfig = {
    stage, //will always be whatever stage is
    env: process.env.NODE_ENV, 
    port: 3001,
    secrets: {
        dbUrl: process.env.DATABASE_URL,
        jwt: process.env.JWT_SECRET},
    logging: false,
};

export default merge(defaultConfig, envConfig);
