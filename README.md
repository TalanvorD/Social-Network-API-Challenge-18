# Social-Network-API-Challenge-18

## Description

The backend for a social network RESTful API that utilizes MongoDB, Express.js and Mongoose.

Features include create, update, and delete User and Thought, create and delete Reaction to Thought, add and delete Friend to User.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)
- [Repository](#repository)

## Installation

Server runs from the CLI (npm run start), interact with the server using GET/POST/PUT/DELETE HTTP methods using a client such as Insomnia.

There is a seed file that can be used to populate the DB using the command npm run seed in the CLI.

## Usage

### API Routes

User routes: /api/users

GET all users

POST a new user using a JSON body

Example JSON body
```
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```

/api/users/:userId

GET a single user by its _id and populated thought and friend data

PUT to update a user by its _id

DELETE to remove user and thoughts associated with that user by its _id

/api/users/:userId/friends/:friendId

POST to add a new friend to a user's friend list

DELETE to remove a friend from a user's friend list

---

Thought routes: /api/thoughts

GET to get all thoughts

POST to create a new thought using a JSON body

Example JSON body
```
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
}
```

/api/thoughts/:thoughtId

GET to get a single thought by its _id

PUT to update a thought by its _id

DELETE to remove a thought by its _id

/api/thoughts/:thoughtId/reactions

POST to create a reaction stored in a single thought's reactions array field using a JSON body

Example JSON body
```
{
  "reactionBody": "Here's a cool reaction...",
	"username": "lernantino"
}
```

DELETE to pull and remove a reaction by the reaction's reactionId value

## License

[MIT License](https://spdx.org/licenses/MIT.html)

## Contributing

MongoDB [https://www.mongodb.com/](https://www.mongodb.com/) Database to store our User and Thought document collections

mongoose [https://mongoosejs.com/](https://mongoosejs.com/) ORM interact with the MongoDB database

express [https://expressjs.com/](https://expressjs.com/) Web framework for Node.js

Node.js [https://nodejs.org/en](https://nodejs.org/en) Runtime enviroment for JavaScript applications

## Tests

Try/catch calling to find errors. Validates are used on mongoose models to restrict invalid inputs (mainly email key).

## Questions

For any questions:

Find me on [github](https://github.com/talanvord)!

Send me an [email](mailto://talanvor_divine@yahoo.com)!

## Repository

[https://github.com/TalanvorD/Social-Network-API-Challenge-18](https://github.com/TalanvorD/Social-Network-API-Challenge-18)

## Screenshot

![screenshot](https://raw.githubusercontent.com/TalanvorD/Social-Network-API-Challenge-18/main/Social-Media-API-Challenge-18.jpg)

## Video demonstration

[https://drive.google.com/file/d/1RuMkq-kMgQoOWokbiAnQpVNIxgPE3cfQ/view?usp=sharing](https://drive.google.com/file/d/1RuMkq-kMgQoOWokbiAnQpVNIxgPE3cfQ/view?usp=sharing)
