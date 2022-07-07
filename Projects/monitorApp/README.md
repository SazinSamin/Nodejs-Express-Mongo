add user to database:  
POST: localhost:3000/user  
{  
    "firstName": "Ishtihaq",  
    "lastName" : "Ahmed",  
    "phone" : "01771760301",  
    "password": "enemy",  
    "toaString": true  
}  

Read data from database:
GET: localhost:3000/user?phone=01771760301  

Update data to database:  
PUT: localhost:3000/user?phone=01771760301  
{  
    "firstName": "Ishtihaq",  
    "lastName" : "Hossain",  
    "phone" : "01771760301",  
    "password": "enemy",  
    "toaString": true  
}

Delete data from the database:  
DELETE: localhost:3000/user?phone=01771760301  


Generate & store token in database  
POST: localhost:3000/token  
{  
    "phone" : "01771760301",  
    "password": "enemy"  
}  

Get existing token from database  
GET: localhost:3000/token?id=i9mabzh6wj2s9rgc  

Extend token expiration time  
PUT: localhost:3000/token  
{  
    "id" : "i9mabzh6wj2s9rgc",  
    "extend": true  
}  
   