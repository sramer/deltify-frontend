
# Delitfy

A simple spotify like CRUD Application


## About
- This application is divided into two repositories. [Deltify - Backend](https://github.com/sramer/Deltify) and [deltify-frontend](https://github.com/sramer/deltify-frontend).
- This application uses `Evan Millers Bayesian approach` alogrithm for calculating the average rating of the song.
- Artist rating can be calulated by `(sum of avg rating of all aritst songs) / (sum of avg rating of all songs)`. 
## Tech Stack

**Client:** Next.js, TailwindCSS, AWS S3.

**Server:** Node, Express, MongoDB


## Features

- View top 10 songs and top 10 artists
- Give ratings to the song
- Add a new song
- Add an artist


## Install and Run Locally (Deltify - Backend)

Get the [Deltify](https://github.com/sramer/Deltify) repository and using the terminal, navigate to the project folder.

```bash
  git clone https://github.com/sramer/Deltify
```

Go to the project directory

```bash
  cd Deltify
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```
The server will starts at [localhost:8000](http://localhost:8000)

## Install and Run Locally (deltify-frontend)

Get the [deltify-frontned](https://github.com/sramer/deltify-frontend) repository and using the terminal, navigate to the project folder.

```bash
  git clone https://github.com/sramer/deltify-frontend
```

Go to the project directory

```bash
  cd deltify-frontend
```

Install dependencies

```bash
  npm install
```

Start the development server

```bash
  npm run dev
```
The server will starts at [localhost:3000](http://localhost:3000)


## Environment Variables for Deltify Backend application

This application uses Mongodb database, You'll need to create a new instance for this application and connect it with your own credentials. Create a file named `.env` in the project root folder and add the below information.

`DB_CONNECT = <mondodb-connection key>`

## Environment Variables for deltify-frontend application

This project uses AWS S3 for the image storage, you will need to create a S3 bucket in your AWS account and connect it with your deltify-frontend application. Create a file named `.env.local` in the project root folder and add the below information.

`NEXT_PUBLIC_ACCESS_KEY = <AWS Access key>`
`NEXT_PUBLIC_SECRET_ACCESS_KEY = <AWS Secret access key>`
`NEXT_PUBLIC_S3_BUCKET = <S3 Bucket Name>`
`NEXT_PUBLIC_REGION = <AWS region>`


## API Reference

#### Get all songs

```http
  GET /songs
```
#### POST a new song

```http
  POST /songs
```
| Fields | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string` | **Required**. Name of the song |
| `dateOfRelease`| `string` | **Required**. Release date of the song|
| `artists`    | `[string]` | **Required**. Artists of the song |
| `cover`    | `string` | **Required**. URL of the cover image |

#### PATCH song rating

```http
  PATCH /songs/:id/:rating
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of song to update|
| `rating`  | `string` | **Required**. rating for songs    |

#### Get all artists

```http
  GET /artists
```
#### POST a new artist

```http
  POST /artists
```
| Fields | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string` | **Required**. Name of the artist |
| `dateOfBirth`| `string` | **Required**. Artist DOB|
| `bio`    | `string` | **Required**. Artist bio |


## Screenshots
#### Home
![Home](https://deltify-images.s3.ap-south-1.amazonaws.com/deltify-home.png)
#### Add song
![Add song](https://deltify-images.s3.ap-south-1.amazonaws.com/add-song.png)
#### Add artist
![Add artist](https://deltify-images.s3.ap-south-1.amazonaws.com/add-artist.png)

## Appendix

- Link for Evan Miller Bayesian Approach [algorithm.](https://www.evanmiller.org/ranking-items-with-star-ratings.html)


