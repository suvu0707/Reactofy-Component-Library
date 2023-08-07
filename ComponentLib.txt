## Source

https://levelup.gitconnected.com/publish-react-components-as-an-npm-package-7a671a2fb7f

# How to Publish React components as an npm package

Step 1- Create and isolate components to publish.

- Inside src folder, delete everything besides App.js, app.css, and index.js.
- Create a folder with the name "lib", where we will be creating everything which later on we will be publishing as an npm.
- Inside lib folder, we need to create 2 things :-
  => create one folder by name "components" inside which we will be creating our component files.
  => and create one file by name index.js, through which we will be exporting our components.

Step 2- Creating and Exporting the Component

- Inside components folder, create a new file by name componentName.js.
- Add and export componentName.js file from index.js file.
  => import componentName.js from "./components/componentName.js";
  => export { componentName.js };

Step 3- Install Babel and build the dist folder.

- To install babel, first run the below 2 commands in your terminal in the root folder structure :-
  > npm install --save-dev @babel/core @babel/cli @babel/preset-env
  > npm install -save @babel/polyfill
- Now, in the root folder of our project add create a new file by name "babel.config.json" and add the below presets into it.

{
"presets": [
[
"@babel/env",
{
"targets": {
"edge": "17",
"firefox": "60",
"chrome": "67",
"safari": "11.1"
},
"useBuiltIns": "usage",
"corejs": "3.6.5"
}
],
"@babel/preset-react"
]
}

=> @babel/env tells the browser which versions it should target, and @babel/preset-react allows Babel to compile JSX.

- Now, go back to your package.json, and under scripts, replace the build script with the following one -
  > "build": "del /S /Q dist && set NODE_ENV=production && babel src/lib --out-dir dist --copy-files",
  > => This will copy the src/lib to a new folder called dist. This folder is invisible but will be added to your root folder after build.
- Now run> npm i
- Now, run the below command in your terminal to build the dist folder :-
  > npm run build

Step 4- Changing the package.json for publishing our component and it should look like below :-

"name": "namit-button", // the unique name that you want to keep for your package.
"version": "0.0.1", // it will show the version of your package.
"private": false, // make it false from true otherwise your package won't be published.
"description": "Testing React Component", // you can give the description about your package.
"author": "Namit Kumar Singh", // you can give your name here.
"keywords": ["react", "components", "ui"],
"main": "dist/index.js",
"module": "dist/index.js",
"files": [ "dist", "README.md" ],
"repository": {                                
"type": "git",
"url": "git+https://github.com/namit-button/npm-test.git"   
},

- description, author, keywords and repository are all optional fields that will give potential end users a better idea of the package.
- Again run> npm i

Step 5- Publish the component

- Run the below commands in your terminal to publish it.
  > npm login : username:suvu0707/password:lai@123456
  > npm publish

Step 6- Your're good to go with the new package to use.

## How to Work with NPM Packages locally Using .tgz Files

Step 1- Run the below command in your terminal after Step 4 of the above topic :-

> npm pack

- This will generate a .tgz file at the directory’s root with a structure like this: {name}-{version}.tgz
- In the directory of the project that you want to test your NPM package, just run an npm install with the path to your .tgz file.
  => Something like: npm install ../../my-package/my-package-1.1.0.tgz.
