import React, { useEffect, useState } from 'react'
import { Box, Typography, Button} from "@mui/material";
import MovieItem from './Movies/MovieItem';
import { Link } from 'react-router-dom';
import { getAllMovies } from '../api-helpers/api-helpers';


const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
   getAllMovies()
   .then((data) => setMovies(data.movies))
   .catch((err) => console.log(err))
  //  console.log(movies);
  },[])
  

  return (
    <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2} >

        {/* first box */}
        <Box margin={"auto"} width={"80%"} height={"50vh"} padding={2}>
            <img
               src="https://asianwiki.com/images/e/ee/Train_To_Busan-fp.jpg"
               alt='Brahmastra'
               width={"100%"}
               height={"100%"}
            />
        </Box>

         {/* heading  */}
         <Box padding={5} margin={"auto"} >
            <Typography variant='h4' textAlign={"center"}> Latest Releases</Typography>
         </Box>

         {/* Cards */}
         <Box display={"flex"} width={"80%"} margin={"auto"} justifyContent={"center"} flexWrap={"wrap"}>
            {movies && movies.slice(0,4).map((movie,index) => <MovieItem id={movie.id} title={movie.title} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate} key={index}/>)}
         </Box>

        {/* last button */}
        <Box display="flex" padding={5} margin="auto">
            <Button LinkComponent={Link} to="/movies" variant="outlined" sx={{ margin:"auto", color: "#2b2d42" }} >
                View All Movies
            </Button>
        </Box>
    </Box>
  )
}

export default HomePage
