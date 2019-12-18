import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
    director: "",
    id: "",
    metascore: "",
    stars: ["Coming ", "Soon!"],
    title: "",
}

const UpdateMovieForm = props => {
    const [movie, setMovie] = useState(initialMovie);

    // console.log(props);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then((response) => {
                // console.log("initial GET response on UpdateMovieForm is ", response);
                setMovie(response.data);
            })
            .catch(err => console.log(err.response));
    }, [props.match.params.id]);

    const handleChanges = (event) => {
        event.persist();
        let value = event.target.value;
        if (event.target.name === "id" || event.target.name === "metascore") {
            value = parseInt(value, 10);
        }

        setMovie({
            ...movie,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then((response) => {
                // console.log(response);
                props.history.push("/");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={handleChanges}
                    placeholder=""
                    value={movie.title}
                />
                <div className="baseline" />

                <input
                    type="text"
                    name="director"
                    onChange={handleChanges}
                    placeholder=""
                    value={movie.director}
                />
                <div className="baseline" />

                <input
                    type="number"
                    name="metascore"
                    onChange={handleChanges}
                    placeholder=""
                    value={movie.metascore}
                />
                <div className="baseline" />

                <button className="md-button form-button">Update</button>
            </form>
        </div>
    )
}

export default UpdateMovieForm;