# radionoise_backend

# radionoise_rest api

* Common Response

    HTTP 200: Success
    
    HTTP 400: Params Missing
    
    HTTP 401: Bad Request
    
    HTTP 404: not found
  
    HTTP 500: DB error
 
* POST /auth/signup

> Param

    id : user id [String]
    
    passwd : user passwd [String]
    
    name : user name [String]

>  Response

    HTTP 200 : user

    HTTP 400 : param missing or null or already exist
    
    HTTP 500 : server err
    
* POST /auth/signin

> Param

    id : user id [String]
    
    passwd : user passwd [String]

>  Response

    HTTP 200 : user name and user token

    HTTP 400 : param missing or null or already exist
    
    HTTP 500 : server err
    
     
* GET /auth/auto/:token

> Param

    token : user token [String]

>  Response

    HTTP 200 : user

    HTTP 400 : param missing or null

    HTTP 404 : user not found (incorrect token)


* GET /user

> Param

    No param

>  Response

    HTTP 200 : all user
    
* GET /user/:id

> Param

    id : user id [String]

>  Response

    HTTP 200 : user

    HTTP 400 : param missing or null

    HTTP 404 : user not found (incorrect token)
    
* PUT /setting

> Param

    name : user name [String]

>  Response

    HTTP 200 : file 

    HTTP 400 : param missing or null

    HTTP 404 : user not found (incorrect token)

# radionoise_socket api

* backend socke.on message : send message

> Param

    msg : massage [String]

> u must make socket.on(massage)
