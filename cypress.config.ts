import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    requestTimeout: 30000,
    defaultCommandTimeout: 30000,
    viewportWidth: 375,
    viewportHeight: 667,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1",

    env: {
      mobileViewportWidthBreakpoint: 414,
    },
  },
});
