# Welcome to CODEMMANDOS.js

Codemmandos.js is designed to streamline JavaScript development within [HTA's](https://docs.microsoft.com/en-us/previous-versions/ms536495(v=vs.85))  (HTML Applications). The beauty of writing JS within a HTA is that now the developer can access, read, write, and move files within their local system. Typically these actions are only possible with languages such as python and java. Fortunately, the Codemmandos library extends from [VBA (Visual Basic for Applications) methods](https://docs.microsoft.com/en-us/office/vba/language/reference/user-interface-help/opentextfile-method) to bring that capability to JS written within an HTA.

## General Notes
	1. File manipulation (codemmando commands) are only valid within a HTA.
	2. HTAs run on an older internet explorer engine so JavaScript ES6 is not fully supported.
	3. Pass FilePaths arguments in a double quote String. ("C:\\Users\\JohnDoe\\Documents")
	4. FilePaths can be passed as absoulte paths or relative to the projects root directory
		4a. Absolute filepath: ("C:\\Users\\JohnDoe\\Documents")
		4b. Relative from project root: ("code\\scripts")
	5. When writing Filepaths, be sure to use two backslashes ex: ("C:\\Users\\JohnDoe")

##  File System Object Commands (file manipulation) 

### createFile
	codemmandos.createFile(filePath, willOverwrite);
**willOverwrite** is optional and is **true** by **default** .  A **true** value indicates that an existing file can be overwritten.
 
	 codemmandos.createFile("C:\\Users\\JohnDoe\\Documents\\fileName.txt");

### writeToFile
	codemmandos.writeToFile(filePath, fileContent, createFile);
  **createFile** is optional and is **false** by **default**. If set to **true** a new file will be created if the filePath does not exist   

    codemmandos.writeToFile("C:\\Users\\JohnDoe\\Documents\\fileName.txt", "This text content will be inserted");

### appendToFile
	codemmandos.appendToFile(filePath, fileContent, createFile);
  **createFile** is optional and is **false** by **default**. If set to **true** a new file will be created if the filePath does not exist   
 
    codemmandos.appendToFile("C:\\Users\\JohnDoe\\Documents\\fileName.txt", " more text to add");

### fileExists
	codemmandos.fileExists(filePath);
Returns **true** if the file exists and **false** is the file does not exist.  
 
    codemmandos.fileExists("C:\\Users\\JohnDoe\\Documents\\fileName.txt");
    
### deleteFile
	codemmandos.deleteFile(filePath, willForce);
 **willForce** is optional. If not set the value will **default** to **false**. If set to true, the command WILL delete read-only files.  
 
    codemmandos.deleteFile("C:\\Users\\JohnDoe\\Documents\\fileName.txt");
    
### moveFile
	codemmandos.moveFile(sourceFilePath, destinationFilePath);
 Permissions required.
 
    codemmandos.moveFile("C:\Users\JohnDoe\Documents\file.txt", "C:\\Users\\JohnDoe\\Documents\\SubFolder\\file.txt");

### copyFile
	codemmandos.copyFile(sourceFilePath, destinationFilePath, willOverwrite);
 **willOverwrite** is optional and is **true** by default. A **true** value indicates that an existing file will be overwritten. 
 
    codemmandos.copyFile("C:\Users\JohnDoe\Documents\file.txt", "C:\\Users\\JohnDoe\\Documents\\SubFolder\\file.txt", false);

### getFile
	codemmandos.getFile(filePath);
Returns a file object. 
 
    codemmandos.getFile("C:\\Users\\JohnDoe\\Documents\\SubFolder\\file.txt");
### getFileName
	codemmandos.getFileName(filePath);
 Returns the fileName of the file object.
 
    codemmandos.getFileName("C:\\Users\\JohnDoe\\Documents\\file.txt");
    
 ### readAll
	codemmandos.readAll(filePath);
 Reads an entire TextStream file and returns the resulting string.
 Note: For large files, using the  **ReadAll**  method wastes memory resources. Other techniques should be used to input a file, such as reading a file line-by-line.
 
    codemmandos.readAll("C:\\Users\\JohnDoe\\Documents\\file.txt");
 ### readLine
	codemmandos.readLine(filePath);
 Reads an entire line (up to, but not including, the newline character) from a **TextStream** file and returns the resulting string.
 
 Note: For large files, using the  **ReadAll**  method wastes memory resources. Other techniques should be used to input a file, such as reading a file line-by-line.
 
    codemmandos.readLine("C:\\Users\\JohnDoe\\Documents\\file.txt");
### createFolder
	codemmandos.createFolder(folderPath);

Creates a folder at the provided folderPath
 
    codemmandos.createFolder("C:\\Users\\JohnDoe\\Documents\\NewFolder");
### getFolder
	codemmandos.getFolder(folderPath);
 Returns a folder object.   
 
    codemmandos.getFolder("C:\\Users\\JohnDoe\\Documents\\NewFolder");
### deleteFolder
	codemmandos.deleteFolder(folderPath, willForce);
**willForce** is optional and is **false** by default. If set to **true**, the command WILL delete read-only folders.    
 
    codemmandos.deleteFolder("C:\\Users\\JohnDoe\\Documents\\TargetFolder");
### moveFolder
	codemmandos.moveFolder(sourceFolderPath, destinationFolderPath);

Move a folder's location.

    codemmandos.moveFolder("C:\\Users\\JohnDoe\\Documents\\TargetFolder","C:\\Users\\JohnDoe\\Documents\\AnotherFolder");

### getParentFolderName
	codemmandos.getParentFolderName(folderPath);
 Returns the parent folder name. 

    codemmandos.getParentFolderName("C:\\Users\\JohnDoe\\Documents\\SubFolder");
### folderExists
	codemmandos.folderExists(folderPath);
 Returns **true** if the folder exist and **false**  if the folder does not exist.

    codemmandos.folderExists("C:\\Users\\JohnDoe\\Documents\\TargetFolder");
    
  ### loopOver
	codemmandos.loopOver(folderPath, callback);
 Iterate over the files in a **folderPath**. Define a callback function to perform an action on each item(file) in the folderPath.

    // write the text: "all files in folder with have this text" in every file within 'TargetFolder'
    
    codemmandos.loopOver("C:\\Users\\JohnDoe\\Documents\\TargetFolder", 
		function(file){
			codemmando.writeToFile(file.path,
			 "all files in folder with have this text",
			  true)}
			)
    
## Shorthands

There are also a few shorthands includes in codemmandos.js to simplify repetitive commands. 
|                |Standard                               |Shorthand                    |
|----------------|-------------------------------       | -----------------------------|
|Query Selector  |`document.querySelector('#my-div');`  |`QS('#my-div');`              |
| console.log    |`console.log('hello');`               |`CL('hello'); or CLOG('world');` 
