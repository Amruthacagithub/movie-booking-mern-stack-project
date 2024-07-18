import React from 'react'
import { Card, CardContent, Typography, CardActions, Button, Link} from "@mui/material";

const MovieItem = ({title, releaseDate, posterUrl, id}) => {
  return (
    <Card sx={{ width: 250, height: 500, borderRadius: 2, margin:2,  ":hover":{ boxShadow: "10px 10px 20px #ccc"} }}>
    <img
        height={"70%"}
        width={"100%"}
        src={posterUrl}
        alt={title}
    />
    <CardContent >
      <Typography gutterBottom variant="h6" padding={0} component="div">
        {title}
      </Typography>
      <Typography variant="body2" padding={0} color="text.secondary">
        {new Date(releaseDate).toDateString()}
      </Typography>
    </CardContent>
    <CardActions>
      <Button LinkComponent={Link} to={`/booking/${id}`} sx={{margin: "auto"}}  size="large">Book</Button>
    </CardActions>
  </Card>
  )
}

export default MovieItem
