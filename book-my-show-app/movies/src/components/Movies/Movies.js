import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../../api-helpers/api-helpers';
import MovieItem from './MovieItem';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
    .then((data) => setMovies(data.movies))
    .catch((err) => console.log(err))
  }, [])

  return (
    <Box margin={"auto"} marginTop={4}>

       {/* heading */}
       <Typography
          margin={"auto"}
          variant='h4'
          padding={2}
          width="40%"
          bgcolor={"#900C3F"}
          color={"white"}
          textAlign={"center"}
       >
          All Movies
       </Typography>

       {/* Container to contain movies  */}
       <Box
         width={"100%"}
         margin={"auto"}
         marginTop={5}
         display={"flex"}
         justifyContent={"flex-start"}
         flexWrap={"wrap"}
       >
        {movies && movies.map((movie, index) => <MovieItem key={index} id={movie.id} posterUrl={movie.posterUrl} title={movie.title} releaseDate={movie.releaseDate}/> )}
       </Box>

    </Box>
  )
}

export default Movies
