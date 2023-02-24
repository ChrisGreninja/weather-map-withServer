# Weather Map running on Node 
https://tan-different-clam.cyclic.app/

Created a desktop web application which uses express.js to use API to show weather data   
ps: works only in full view    

### Used API:
Open Weather API

### Used Libraries: 
leaflet.js 

### Methods Used: 
 - Created an HTML page to hold map and weather data container.
 - Node is used to run the html page
 - Created a script file to retrieve information from user to get their latitude and longitude
 - Used a js library to create a map
 - Got location data from user, sent it to back-end, apply data on API to get realtime data of the particular location and sent it back to client side script file
 - Used the values from the aquired JSoN file to update it in the weather data container as well as use the data to show location in the map
 - Aquired library functions to get location values when the map is clicked
 - These values were then given to the back-end again.

### How to use files:
- Copy all files
- Run terminal in the folder which contains these files and use 'npm i'
- After node modules are installed, you can run the back.js file using node
