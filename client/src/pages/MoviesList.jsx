import React, { Component } from 'react'
import api from '../api'


class MoviesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllMovies().then(movies => {
            this.setState({
                movies: movies.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { movies } = this.state
        console.log('TCL: MoviesList -> render -> movies', movies)

   

        return (
       <>
  


<ul>
{ movies.map(movie=> <li>{movie.name}</li>)}
</ul>
</>
        )
    }
}

export default MoviesList


