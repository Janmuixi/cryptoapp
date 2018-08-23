const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios');
const notifyBtn = document.getElementById('notifyBtn')
const ipc = electron.ipcRenderer

notifyBtn.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({ 
        frame: false, 
        transparent: true,
        alwaysOnTop: true,
        width: 400, 
        height: 200 
    })
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
})

var price = document.querySelector('h1')
var targetPriceVal;
var targetPrice = document.getElementById('targetPrice')


function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
        const cryptos = res.data.BTC.USD
        price.innerHTML = '$'+cryptos.toLocaleString('en')
    })
}
getBTC();
setInterval ( getBTC, 30000 );

ipc.on('targetPriceVal', function (event, arg) {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en')
})