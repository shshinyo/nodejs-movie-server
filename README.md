# Node.js movie server 

Solution of task contains tree docker images :

1. Auth server image which run in a seperate container.
  1. run it by go inside auth-server dir .
  2. run command `docker compose up` will run on port 3000.

1. movies Server and monogdb runs both inside one container.
  1. run this images by =>  go inside movies-server dir .
  2. run command `docker compose up` will run movies server on port 4000.
  3. mongo server will run in default port 27027.

# API Docs
 
1. you can find Apis Docs Following this Link http://localhost:4000/explorer/ 
  1. to Test add movie or get movies :-
    1. get a valid token from auth server using
       `  curl --location --request POST '0.0.0.0:3000/auth' \
          --header 'Content-Type: application/json' \
          --data-raw '{
         "username": "basic-thomas",
         "password": "sR-_pcoow-27-6PAwCD8"
        }'` 
     2. register JWT Token in swagger ui    
  
# Test Cases 
1. To Run Test cases.
  1. clone Repository.
  2. npm i
  3. run Auth Server.
  4. go to movies-server dir
  5. run command `npm run test`
