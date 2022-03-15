const electron = require('electron');
const url = require('url');
const path = require('path');

var child = require('child_process').execFile;
var Notepadpath = "C:\\Windows\\notepad.exe";

var paintpath = "C:\\Windows\\System32\\mspaint.exe";


const {app, BrowserWindow,Menu} = electron;

let mainWindow;
app.on('ready',function(){
    mainWindow = new BrowserWindow({});

    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname, 'index.html'),
        protocol:'file:',
        slashes:true
    }));

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);

}); 

const mainMenuTemplate = [ {
    label:'File',
    submenu:[ {
        label:'Notepad',
        accelerator:process.platform == 'darwin' ? 'Command+C':'Ctrl+N',
        click(){
            child(Notepadpath , function(err ,data)  {
                if(err){
                    console.error(err);
                    return;
                }
                console.log(data.toString());
            });
        }
    },
    {
        label:'Paint',
        accelerator:process.platform == 'darwin' ? 'Command+P':'Ctrl+P',
        click(){
            child(paintpath , function(err ,data)  {
                if(err){
                    console.error(err);
                    return;
                }
                console.log(data.toString());
            });
        }

    },
      {
        label:'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q':'Ctrl+Q',
        click(){
            app.quit();
        }

    }


    ]
}

];
