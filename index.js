const { app, BrowserWindow, globalShortcut } = require("electron");

const createWindow = () => {
	const mainWindow = new BrowserWindow(
		{
			width: 800,
			height: 600,
			webPreferences: {
				webviewTag: true,
				plugins: true
			},
			icon: './icon.ico',
			title: 'Container para utilizar flash embarcado em um site'
		}
	);

	mainWindow.removeMenu();

	mainWindow.loadFile('index.html');

	globalShortcut.register(
		'F5',
		() => {
			mainWindow.reload();
		}
	);
};

app.commandLine.appendSwitch('ppapi-flash-path', 'pepflashplayer.dll');
app.commandLine.appendSwitch('ppapi-flash-version', '29.0.0.171');

app.whenReady().then(createWindow);

app.on(
	'will-quit',
	() => {
		globalShortcut.unregisterAll();
	}
);

app.on(
	'window-all-closed',
	() => {
		if (process.platform !== 'darwin') {
			app.quit();
		}
	}
);

app.on(
	'activate',
	() => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	}
);
