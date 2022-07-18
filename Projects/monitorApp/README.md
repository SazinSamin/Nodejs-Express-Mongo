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
  
Delete a token:  
DELETE: localhost:3000/token?id=8sfo8daaybglhil3  

Token authentication  
GET: localhost:3000/user?phone=01771760304  
on header add corresponding token  
token: 3ypq4d6b4m7yf3b  


Add Check data to the database  
POST: localhost:3000/check  
  
add token data to header  
token: 5y19p3lhyqolomgm  

add other data to header body:  
{  
    "protocols": "http",  
    "url": "google.com",  
    "method": "GET",  
    "successCode": [200, 201],  
    "timeoutSeconds": 2  
}  

Get Check data from the database:  
POST: localhost:3000/check?id=8fpggw65rj522sdg   

Upadte Check data to the database:
PUT: localhost:3000/check  
  
add token to the header file:  
token: fzb4lm39j28w8n0d  

add data to be updated to the header body:  
{  
    "id":"6le3hw5hmsfpez3h",  
    "protocols": "https"  
}  

delete check data from database & user's file:  
DELETE: localhost:3000/check?id=ozrdfk0j2nc958h2  

Add token to the header file also
token: fzb4lm39j28w8n0d
