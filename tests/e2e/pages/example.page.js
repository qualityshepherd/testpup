export const examplePage = (t) => ({
  goto: () => t.goto('https://example.com'),
  getTitle: () => t.eval(() => document.title),
  getHeading: () => t.getText('h1'),
  clickMore: async () => {
    const nav = t.waitForNav()
    await t.waitAndClick('a')
    await nav
  }
})
