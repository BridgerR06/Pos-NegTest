import { expect } from '@wdio/globals'
import UserPage from '../pageobjects/user.page.js'
import SecurePage from '../pageobjects/secure.page.js'


describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        for (const username of UserPage.Credentials.username) {
            await UserPage.open()
            console.log('URL:', await browser.getUrl())
            await browser.saveScreenshot('./screenshots/fileName.png')
            await UserPage.login(username, UserPage.Credentials.password)
          
            await expect(browser).toHaveUrl(expect.stringContaining('inventory'))
        }
    })
     it('should block the locked out user', async () => {
      await UserPage.open()
      await UserPage.login('locked_out_user', UserPage.Credentials.password)
     await expect(UserPage.errorMessage).toBeDisplayed()
        await expect(UserPage.errorMessage).toHaveText(expect.stringContaining('Epic sadface: Sorry, this user has been locked out.'))
  })
    it('should fail to login with invalid credentials', async () => {
        for (const username of UserPage.Credentials.username) {
            await UserPage.open()
            console.log('URL:', await browser.getUrl())
            await browser.saveScreenshot('./screenshots/fileName.png')
            await UserPage.login(username, UserPage.Credentials.negpassword)
            await expect(UserPage.errorMessage).toBeDisplayed()
            await expect(UserPage.errorMessage).toHaveText(expect.stringContaining('Epic sadface: Username and password do not match any user in this service'))
            await expect(browser).not.toHaveUrl(expect.stringContaining('inventory'))
        }
    })
    
})