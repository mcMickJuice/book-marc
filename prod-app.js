var webServer = require('./webServer')

webServer.start(process.env.PORT || 3000, () => console.log('prod-app server started'))