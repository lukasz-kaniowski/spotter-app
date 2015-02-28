Spotter App
===========
Spotter app is a cordova application. Initial setup was done using yoeoman ionic-generator. 

How to run 
===========
First install all dependencies

    $ npm i & bower i
 
Use grunt to create and build platforms

	// must run first to create cordova folders
    $ grunt serve

To deploy on Android and iOS
=============================

	grunt platform:add:ios
	grunt platform:add:android
	
	// when moving to production, make sure to modify android and ios api keys in package.json for the google maps sdk - step 3 and 4 of the following tutorial 
	https://github.com/wf9a5m75/phonegap-googlemaps-plugin/wiki/Tutorial-for-Mac
	
	// plugins must be installed after adding the platforms - this script will add them to all installed platforms
	grunt installplugins
	
	// running on a platform
	grunt run:android
	grunt run:ios	
	
	// if you wish to start over completely, make sure to delete both plugins and platforms folders
   
Using Genymotion for android testing
====================================

Genymotion devices can be used as real devices, not virtual ones.
in order to do that, do the following:
1- Check that adb is running on Genymotion using custom android SDK tools
http://stackoverflow.com/questions/5092542/adb-server-is-out-of-date/26763766#26763766

2- Genymotion does not currently come with Google Play Services, which are required for both Location and Maps.
This guide explains the steps to install Google Apps (GApps)
http://www.techrepublic.com/article/pro-tip-install-google-play-services-on-android-emulator-genymotion/
GApps download from here https://www.androidfilehost.com/?fid=23311191640114013

Test was done on Genymotion using Nexus 5 - 4.4.4 API 19 - with GApps for 4.4.4    
   
   
Code organization
=================
Application tend to fallow Angular best practices for directory structre [Google Doc](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub)

Backend Integration
===================

Application use rest api. Currently api is under development and appiary.com is used for design and serving mock responses. 

Documentation can be found here [http://docs.spotters.apiary.io/](http://docs.spotters.apiary.io/)

Mock api server [http://private-fb018-spotters.apiary-proxy.com](http://private-fb018-spotters.apiary-proxy.com)





   
