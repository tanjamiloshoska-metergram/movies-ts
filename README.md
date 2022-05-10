# TASK

## Prerequisites

Clone the repository and create your own branch named "name-surname".\
Finish the tasks on that branch and push once you are finished.\
Use https://www.postman.com/ to test the APIs

## Node.js API

Create node.js express project and make the APIs mentioned bellow.\
Note - Do not use "Express application generator" to generate the project\
Use the movies.json file to read, write, delete and edit the movies as required.\

### Get all movies

API to return all the movies from movies.json file.\
Extend the API to accept query string parameters to filter and sort the movies

#### Filter by Genre

Return all movies that have the specified genre.\
example: ?genre=Action

#### Filter by Actor

Return all movies where the specified actor is staring.
example: ?actor=Will Smith

#### Sort by IMDB rating

Return ONLY the title and IMDB rating sorted by IMDB rating. Be able to accept ASC and DESC sort.\
example: ?imdbSort=ASC

### Get specific movie

API to return specific movie by imdbID

### Get movies data

API to return the following data:\
**totalLengthOfAllMovies** - Use reduce to calculate the total length to watch all the movies. Format: string - ("xxx min")\
**imdbUrls** - Array of strings which will contain the imdb url of each movie created using imdbID.\
example of imdb url: https://www.imdb.com/title/tt0076759/ \
**totalImdbVotes**: Total imdbVotes for all movies - Format: number - example: 12345678\
**allLanguagues**: Array of strings containing ISO codes of all languages used in the movies.

### Add new movie

API to add new movie to the movies.json file

#### Bonus

If you have time, take a look at https://joi.dev/ and validate the input.

### Edit existing movie

API to edit existing movie in movies.json file based on imdbID.\
Note - You are not allowed to edit the imdbID

### Delete existing movie

API to delete movie from the movies.json file