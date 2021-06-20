const { app, BrowserWindow } = require ("electron")
const path = require ("path")

function crearNuevaVentana () {

    const win = new BrowserWindow({
        width: 800,
        height: 600,
      })
    win.loadFile("Bookshelf.html")

}

app.whenReady().then( () => { crearNuevaVentana() 

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length===0) { crearNuevaVentana()}
 
    }
    )
}
)

app.on("window-all-closed", () => {
    if (process.platform !=="darwin") { app.quit() }
}
)