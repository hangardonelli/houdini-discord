# houdini-discord
A Houdini administration utility for Discord
###### Allowing you to manage, ban players, obtain information from the servers for CPPS with houdini-asyncio!

At this time, although the application is functional and usable without problems, there are some issues to close.
 1. Change flat queries to parameterized queries
 2. Fully translate the code into English (because initially this was created for a spanish cpps) 
 3. Add more administration commands

###### Why?
Currently, I know that there are other similar tools but that they need to be installed as houdini modules or plugins, so their modification entails restarting the cpps and the obligation to write them in Python


##### Features
- ✅ 5 min configuration!
- ✅ Its not a houdini plugin
- ✅ Easy to modify 💪
- ✅ Uses Discord server roles as privileges 
- ✅ Multi-Account detector
- ✅ Commands Like ban, add items, coins, furnitures, playercard info, online players in a server and more!



### Requirements:
This bot requires your houdini credentials and you are also going to need a discord bot token with administration privileges (8). 
- Discord Bot Token
- Server IP 
- Redis Port (note that if your houdini instance is running in docker-compose the port is probably not the default for redis. In that case use `docker ps` to check
- PostgreSQL credentials for READ/WRITE/Exec functions and stored procedures
- List of CPPS servers (name and ids)



### How to install?
Download the repository and install all dependencies with
 `npm install`
 
Once you are done configuring the config.json file, the bot can be run by typing `npm start`
 
