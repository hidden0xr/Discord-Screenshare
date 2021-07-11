const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

class Video {

}

class Stream extends Video {
    constructor(token) {
        super()
        const client_url = `file://${__dirname}/client/index.html`
        const chrome_options = new chrome.Options()
        //chrome_options.addArguments('--headless')
        chrome_options.addArguments('--no-sandbox')
        chrome_options.addArguments('--window-size=1920,1080')
        chrome_options.addArguments('--disable-web-security')
        chrome_options.addArguments('--disable-dev-shm-usage')
        chrome_options.addArguments('-–allow-file-access-from-files')
        chrome_options.addArguments('--autoplay-policy=no-user-gesture-required')
        console.log("Opening page...")
        this.driver = new webdriver.Builder().forBrowser('chrome').setChromeOptions(chrome_options).build()
        this.driver.get(client_url)
        this.driver.executeScript(`localStorage.setItem("token", '"${token}"')`)
    }

    open_guild() {
        console.log("Opening guild...")
        this.driver.executeScript(`document.querySelector('[data-list-item-id="guildsnav___${this.guild_id}"]').click()`)
    }

    is_full() {
        this.driver.executeScript(`return document.querySelector("[data-list-item-id='channels___${this.channel_id}']").innerHTML.includes("Voice (Locked)")`)
            .then(result => {
                return result
            })
    }

    is_locked() {
        this.driver.executeScript(`return document.querySelector("[data-list-item-id='channels___${this.channel_id}']").innerHTML.includes("Voice (Locked)")`)
            .then(result => {
                return result
            })
    }

    scroll() {
        this.driver.executeScript(`
            var c_inject = document.getElementById("channels");
            if( c_inject.scrollTop === (c_inject.scrollHeight - c_inject.offsetHeight))
                c_inject.scroll(0, 0)
            else
                c_inject.scroll(0, c_inject.scrollTop + 250)
        `)
    }

    join() {
        console.log("Joining voice channel...")
        this.scroll()

        if (this.is_locked()) {
            console.log("Channel is locked")
            return false
        }

        this.driver.executeScript(`document.querySelector("[data-list-item-id='channels___${self.channel_id}']").click()`)

        if (this.is_full()) {
            console.log("Channel is full")
            return false
        }

        console.log("Joined")
    }

    start() {
        this.driver.executeScript(`document.querySelector('[aria-label="Share Your Screen"]').click()`)
    }

    stop() {
        this.driver.close()
        this.driver.quit()
    }
}

exports.Stream = Stream