Assignments :


1.  WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date. This is a very basic assignment and totally along the lines of what we covered in the session

2.  GOTO  http://api.openweathermap.org => “subscribe” current weather data ==> get api key for Free version ==> create new account and Verify your emailId( Must verify to avoid issues) => go to My APi keys under your account name(top right corner) or https://home.openweathermap.org/api_keys => save the key/appid somewhere. Now proceed further.

 # API KEY  === b2fb6920f70517bed1938b0ea5b62fc0,


Create API's to do the following:
Get weather of London from  http://api.openweathermap.org/data/2.5/weather?q=London&appid=<useYourOwnAppId>  
(NOTE: must use HTTP infront of the url else axios will attempt to hit localhost and give error  ..also use HTTP only and not HTTPS)
then change the above to get the temperature only( of London)
Sort the cities     [ "Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]   in order of their increasing temperature
Result should look something like this
 
                   [
                   {city:"London", temp: 280},
                   {city:"Moscow", temp: 290},
                   {city:"Bangalore", temp: 301.2},
                   .......
                   ]

3. Axios POST request assignment Statement:
Step1: Get all the memes at Postman (https://api.imgflip.com/get_memes)
Step 2 : Pick a memeId you want (Eg 129242436) for the POST request (from the result from  above )
Assignment: Create a Post request API (https://api.imgflip.com/caption_image) with only query params. Following are the params (copy username and password exactly as given below OR incase you find error in using this username password due to too many people trying to access it, then create your own account and plz do share username password on your group so that others can use it too- be kind and helpful):
    
           template_id <meme_id>
           text0 <text you want as a caption>
           text1 <optional>
           username chewie12345
           password meme@123

Return a response with a body like this
            
           "data": {
                   "url": "https://i.imgflip.com/5mvxax.jpg",
                   "page_url": "https://imgflip.com/i/5mvxax"
               }


