Spotter App
===========
Spotter app is a cordova application. Initial setup was done using yoeoman ionic-generator. 

How to run 
===========
First install all dependencies

    $ npm i & bower i
 
Use grunt to run 

    $ grunt serve

To deploy on Android:-
	
	// plugins with variables cannot be added to package.json
	grunt plugin:add:plugin.google.maps --variable API_KEY_FOR_ANDROID="API_KEY_HERE"	
	grunt run:android
   
Code organization
=================
Application tend to fallow Angular best practices for directory structre [Google Doc](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub)

Backend Integration
===================

Application use rest api. Currently api is under development and appiary.com is used for design and serving mock responses. 

Documentation can be found here [http://docs.spotters.apiary.io/](http://docs.spotters.apiary.io/)

Mock api server [http://private-anon-4d6f1cc83-spotters.apiary-mock.com](http://private-anon-4d6f1cc83-spotters.apiary-mock.com)





   
