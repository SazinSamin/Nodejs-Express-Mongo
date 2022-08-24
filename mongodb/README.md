# Mongodb & Mongoose  
[installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)  
### As mongodb still don't have build for ubuntu 22.04, so we get error of dependency problem for libssl1.1, so download libssl from repo  
- wget https://ubuntu.pkgs.org/20.04/ubuntu-main-amd64/libssl1.1_1.1.1f-1ubuntu2_amd64.deb.html  
### install  
- sudo dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb  
### start the server  
- sudo systemctl start mongod  
### get server status  
- sudo systemctl status mongod  
### stop the server    
- sudo systemctl stop mongod

