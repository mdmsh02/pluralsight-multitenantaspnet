Note From Peter Kellner Regarding Initializing EF. (December 2015)

Sencha Licensing is such that you need to download your own sencha library. to make this app work, simply load the directory ./SenchaLibs here with the version of Sencha you plan on using (I used 6.01) and expand all those files.  Then, make sure to point at that directory with your -sdk flag of your Sencha CMD runs.

Also, you will need to run the scofolding yourself to fill out the /ext directories in each tenant.  I've had to delete all but the apps folder again because of licensing issues.






Note For All Modules:

I've found that EF is a little picky about how it wants to initialize
the Sql Server Express database which is in the directory /AppData.

It's important that you don't simply delete the database files but that you do that
through the menu choice on VS View/Sql Server objects.  Drill into databases
and then right click and remove the dbmultitenant database and make sure to click
checkbox "close connections".

This will delete those two files in the AppData directory and new files will be created
when the project is run. If you have issues, I suggest making sure to stop the asp.net 
web server (IIS Express) and let VS restart it. That might help.