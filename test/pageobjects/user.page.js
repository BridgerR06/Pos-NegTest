import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class UserPage extends Page {
    /**
     * define selectors using getter methods
     */
    Credentials = {
    username:["standard_user", "problem_user", "performance_glitch_user", "error_user", "visual_user"],
    lockeduser: "locked_out_user",
    password: "secret_sauce",
    negpassword: "secret_sauce123"
        //I ran a neg test with PW "secret_sauce123" and it failed as expected, so I know the correct PW is "secret_sauce
    };
    get errorMessage() { 
        return $('[data-test="error"]')
    }
    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('input[type="submit"]');
    }
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
    open () {
        return super.open('');
    }
}

export default new UserPage();
