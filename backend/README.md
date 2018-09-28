## Nodebot-Api
This part of the repo is for the backend, uses Express, Socket.io, Jsonwebtoken, Mongoose and MongoDb. Mocha and Supertest for tests.

### Endpoints
Base | Sub | Type | Permission | Description 
--- | --- | --- | --- | ---
`/auth` | `/login` | `POST` | Any | Login endpoint, requires email and password
`/auth` | `/register` | `POST` | Any | Register endpoint, requires name, username, email password
`/auth` | `/me` | `GET` | Any | "Who Am I" endpoint, requires valid token in headers as `x-access-token`
`/users` | `/` | `GET` | Admin | Get all users, requires token
`/users` | `/:userId` | `GET` | Admin | Get user by id, requires token
`/users` | `/` | `POST` | Admin | Register new user, requires name, username, email, password and token
`/users` | `/:userId` | `PUT` | Admin/Same user as :userId | Updates user with new userData, requires token
`/users` | `/:userId/permissions` | `PUT` | Admin | Makes user admin, requires token
`/users` | `/:userId` | `DELETE` | Admin | Deletes the user, requires token
`/users` | `/search` | `POST` | Admin | Returns users matching the query, search can be made for name, username or email, requires token
`/robots` | `/` | `GET` | Any | Returns all robots, requires token
`/robots` | `/` | `POST` | Admin | Register a new robot
`/robots` | `/:robotId` | `PUT` | Admin | Updates robot
`/robots` | `/:robotId` | `DELETE` | Admin | Deletes robot


### Security
Uses jsonwebtokens for security and bcrypt for hashing passwords
