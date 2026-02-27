// pages live here until it gets too big — then split by feature
const BASE = 'https://the-internet.herokuapp.com'

const credentials = {
  admin: { user: 'tomsmith', pass: 'SuperSecretPassword!' }
}

export const loginPage = (t) => ({
  goto: () => t.goto(`${BASE}/login`),
  loginAs: async (role) => {
    const { user, pass } = credentials[role]
    await t.type('#username', user)
    await t.type('#password', pass)
    const nav = t.waitForNav()
    await t.waitAndClick('button[type=submit]')
    await nav
  },
  isLoggedIn: () => t.exists('#flash.success'),
  errorMessage: () => t.getText('#flash')
})

export const securePage = (t) => ({
  isAt: async () => (await t.url()).includes('/secure'),
  heading: () => t.getText('h2'),
  logout: async () => {
    await t.waitAndClick('a[href="/logout"]')
    await t.waitFor('#username')
  }
})
