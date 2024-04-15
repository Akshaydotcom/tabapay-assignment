# Tabapay-UI Project Part-6 #

## Description ##
Add-on from Part 5, Used fetch API to get data from backend server.
Added basic APIs using Node and Express, to be served locally.

## Installation ##

### Frontend Installation ###
Since this project is built using Vite, please run the following commands after navigating to frontend folder:
1. npm install
2. cd ./tabapay-ui/
3. npm run dev

Open Browser with the url given by last command.

To check production, run "npm run build"

### Backend Installation ###
Please run the following commands after navigating to backend folder:
1. npm init
2. npm install express
3. node index.js

Also, please make sure that the Backend Server is Up and running when checking the Webpage. 

### Note ###
1. Also, if the need arises, we could use pagination on top of the existing responsive page in case of more categories, and/or more textual information. 
   This could be done by using an API to get data from the server, thus allowing us to limit the number/size of the response.

2. Depending on the relation between the categories of text, we could group them first, and then show different categories in the each group. 
   We could try different Tabs for different Groups or Use a similar Tree View with the group headings as the first level of nodes, so to speak.