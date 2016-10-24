var menubar = require('menubar')

var mb = menubar({
  preloadWindow: true,
  alwaysOnTop: false,
  transparent: true,
  width: 350
})

mb.on('ready', function ready () {
  console.log('app is ready')
})
