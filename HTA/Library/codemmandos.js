// GLOBAL VARIABLES
var forReading = 1;
var forWriting = 2;
var forAppending = 8;

// File System Object (FSO) - set up
var GLOBAL = {};
GLOBAL["System"] = {};
GLOBAL["System"]["Shell"] = new ActiveXObject("WScript.Shell");
GLOBAL["System"]["FSO"] = new ActiveXObject("Scripting.FileSystemObject");
var FSO = GLOBAL["System"]["FSO"];
GLOBAL["System"]["File"];

GLOBAL["App"] = {};
GLOBAL["App"]["Directory"] = location.href
	.split("/")
	.slice(0, -2)
	.join("\\")
	.replace("file:\\\\\\", "")
	.replace(/%20/g, " ");
var appDirectory = GLOBAL["App"]["Directory"];

// Shorthands
// Query Selector
var qs, qS, QS;
qs =
	qS =
	QS =
		function (selector) {
			return document.querySelector(selector);
		};

var qsAll, qsA;
qsAll,
	(qsA = function (selector) {
		return document.querySelectorAll(selector);
	});

//console.log
var clog, CLOG, CL, cl;
clog =
	CLOG =
	CL =
	cl =
		function (text) {
			return console.log(text);
		};

// File System Object Commands
//    FSO documentation: https://docs.microsoft.com/en-us/office/vba/language/reference/user-interface-help/opentextfile-method
//    Objective: abstract the FSO away from the user.
//    NOTE: Using alerts instead of return. New users may not have their console.log opened.
// 	  CODEMMANDOS aliases
//    test
var codemmandos, codemmando, CODEMMANDOS, CODEMMANDO;

codemmandos =
	codemmando =
	CODEMMANDOS =
	CODEMMANDO =
		{
			createFile: function (filePath, willOverwrite) {
				//files are overwriteable by default or if not defined
				// Optional argument
				if (typeof willOverwrite === undefined) willOverwrite = true;

				if (!FSO.FileExists(filePath)) {
					FSO.CreateTextFile(filePath, willOverwrite);
				} else {
					FSO.CreateTextFile(filePath, willOverwrite);
					cl("File: " + filePath + "was overwitten.");
				}
			},
			writeToFile: function (filePath, fileContent, createFile) {
				// stop the command the file does not exist and
				// Optional Argument
				if (createFile === undefined) createFile = false;
				if (!FSO.FileExists(filePath) && !createFile) {
					alert("File at: " + filePath + " does not exist and createFile was not set or was set to false.");
				}

				var file = FSO.OpenTextFile(filePath, forWriting, createFile);
				file.Write(fileContent);
				file.Close();
			},
			appendToFile: function (filePath, fileContent, createFile) {
				if (FSO.FileExists(filePath)) {
					// Optional argument
					// createFile will default to false
					if (createFile === undefined) createFile = false;

					var file = FSO.OpenTextFile(filePath, forAppending, createFile);
					file.Write(fileContent);
					file.Close();
				} else {
					alert("File at: " + filePath + " does not exist. Create a file before appending to it.");
				}
			},
			fileExists: function (filePath) {
				return FSO.FileExists(filePath);
			},
			deleteFile: function (filePath, willForce) {
				// Optional argument
				// force - Optional second arg that WILL delete read-only files. default is false
				if (typeof willForce === undefined) willForce = false;

				FSO.DeleteFile(filePath, willForce);
			},
			moveFile: function (sourceFilePath, destinationFilePath) {
				// Permissions required
				if (FSO.FileExists(sourceFilePath)) {
					FSO.MoveFile(sourceFilePath, destinationFilePath);
				}
			},
			copyFile: function (sourceFilePath, destinationFilePath, willOverwrite) {
				// Optional argument
				if (typeof willOverwrite === undefined) willOverwrite = true;

				FSO.CopyFile(sourceFilePath, destinationFilePath, willOverwrite);
			},
			getFile: function (filePath) {
				return FSO.GetFile(filePath);
			},
			getFileName: function (filePath) {
				return FSO.GetFileName(filePath);
			},
			readAll: function (filePath) {
				// Note: use readLine for large files as not to waste memory resources

				filePath = this.removeLeadingBackSlashIfPresent(filePath);
				file = FSO.OpenTextFile(filePath, forReading);
				var fileContent = file.ReadAll();
				file.Close();
				return fileContent;
			},
			readLine: function (filePath) {
				//Note: more memory efficient than readAll

				filePath = this.removeLeadingBackSlashIfPresent(filePath);
				file = FSO.OpenTextFile(filePath, forReading);
				var fileLineContent = file.ReadLine();
				file.Close();
				return fileLineContent;
			},
			createFolder: function (folderPath) {
				if (!FSO.FolderExists(folderPath)) {
					FSO.CreateFolder(folderPath);
				} else {
					console.log(folderPath + " already exists.");
				}
			},
			getFolder: function (folderPath) {
				return FSO.GetFolder(this.removeLeadingBackSlashIfPresent(folderPath));
			},
			deleteFolder: function (folderPath, willForce) {
				// Optional argument
				// force - Optional arg that WILL delte read-only folders
				if (typeof willForce === undefined) willForce = false;

				if (FSO.FolderExists(folderPath)) {
					FSO.DeleteFolder(this.removeLeadingBackSlashIfPresent(folderPath), willForce);
				} else {
					console.error(folderPath + " does not exist");
				}
			},
			moveFolder: function (sourceFolderPath, destinationFolderPath) {
				if (FSO.FolderExists(sourceFolderPath)) {
					FSO.MoveFolder(sourceFolderPath, destinationFolderPath);
				} else {
					alert(sourceFolderPath + " does not exist.");
				}
			},
			getParentFolderName: function (folderPath) {
				return FSO.GetParentFolderName(folderPath);
			},
			folderExists: function (folderPath) {
				return FSO.FolderExists(folderPath);
			},
			// Helpers
			addLeadingBackSlashIfMissing: function (fileName) {
				if (fileName[0] !== "\\") {
					return (fileName = "\\" + fileName);
				} else {
					return fileName;
				}
			},
			removeLeadingBackSlashIfPresent: function (fileName) {
				if (fileName[0] == "\\") {
					return fileName.slice(1);
				} else {
					return fileName;
				}
			},
			//Functions
			getUrlParameter: function (parameter) {
				var urlParameter = "";
				if (window.location.href.indexOf(parameter) > -1) {
					urlParameter = this.getUrlVars()[parameter];
				}
				if (urlParameter === undefined || urlParameter === null) {
					urlParameter = "";
				}
				return urlParameter;
			},
			getUrlVars: function () {
				var vars = {};
				var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
					vars[key] = value;
				});
				return vars;
			},
			loopOver: function (folderPath, callbackFunction) {
				var folderObj = this.getFolder(folderPath);
				var fileCollection = new Enumerator(folderObj.files);

				if (folderObj.files.count > 0) {
					for (; !fileCollection.atEnd(); fileCollection.moveNext()) {
						callbackFunction(fileCollection.item());
					}
				}
			},
		};

//createFile
// codemmandos.createFile("C:\\Users\\JohnDoe\\Documents\\My-folder\\fileName.txt");
// codemmandos.createFile(appDirectory + "\\code\\newFile.txt");
// codemmandos.createFile("fileAtProjectRoot.txt");
// writeToFile
// codemmandos.writeToFile("C:\\Users\\JohnDoe\\Documents\\My-folder\\fileName.txt", "I am the file content");
//appendToFile
// codemmandos.appendToFile("C:\\Users\\JohnDoe\\Documents\\My-folder\\fileName.txt", "This will be appended to the end of filenName.txt");
//fileExists
// codemmandos.fileExists("C:\\Users\\JohnDoe\\Documents\\My-folder\\fileName.txt");
//deleteFile
// codemmandos.deleteFile("C:\\Users\\JohnDoe\\Documents\\My-Folder\\ctf.js");
//moveFile
// codemmandos.moveFile('C:\Users\JohnDoe\Documents\My-Folder\\ctf.txt', "C:\\Users\\JohnDoe\\Documents\\ctf.txt");
// copyFile
// codemmandos.copyFile('C:\Users\JohnDoe\Documents\My-Folder\\ctf.txt', "C:\\Users\\JohnDoe\\Documents\\ctf.txt");
//codemmandos.copyFile('src.txt', "C:\\Users\\JohnDoe\\Documents\\Coding");
//getFile
// codemmandos.getFile('C:\\Users\\JohnDoe\\Documents\\My-Folder\\ctf.txt');
//getfileName
// codemmandos.getfileName('C:\\Users\\JohnDoe\\Documents\\My-Folder\\ctf.txt');
//createFolder
// codemmandos.createFolder("C:\\Users\\JohnDoe\\Documents\\My-Folder\\New-Folder");
//getFolder
//  codemmandos.getFolder("C:\\Users\\JohnDoe\\Documents\\My-Folder\\New-Folder");
//deleteFolder
// codemmandos.deleteFolder("C:\\Users\\JohnDoe\\Documents\\My-Folder\\New-Folder");
// codemmandos.createFolder("test-folder")
//moveFolder
// codemmandos.moveFolder("C:\\Users\\JohnDoe\\Documents\\Source-Folder", "C:\\Users\\JohnDoe\\Documents\\Coding\\Source-Folder")
//getParentFolderName
// codemmandos.getParentFolderName("C:\\Users\\JohnDoe\\Documents\\Coding");
//folderExists
//codemmandos.folderExists("C:\\Users\\JohnDoe\\Documents\\Coding");
//readAll
// codemmandos.readAll("rootFile.txt");
//readLine
//codemmandos.readLine("rootFile.txt");
