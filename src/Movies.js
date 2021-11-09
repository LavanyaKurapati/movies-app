import {BsFillStarFill} from 'react-icons/bs'
import './Movies.css'


const Movies = (props) => {
    const{movie}=props
    const {title, poster_path, release_date, vote_average, name} = movie
    const noImage= "https://my-goodlife.com/img.php?imgsrc=&size=400x400";
    const imageUrl = poster_path === null ? noImage : `http://image.tmdb.org/t/p/w500${poster_path}`

    const movieTitle = title === undefined ? name === undefined ? 'Title not available' : name : title

    const getYear=(date) => {
        const year = new Date(date).getFullYear()
        return year
    }

    const ratingColor = (value) => {
        if(value >= 7){
            return 'green'
        }else if (value >= 4.5){
            return 'yellow'
        }else{
            return 'red'
        }
    }

    return(
        <div className="movie-item">
            <img src={imageUrl} alt={title} className="image"/>
            <div className="movie-text">
                <h1 className="title">{movieTitle}</h1>
                <div className={`rating-container ${ratingColor(vote_average)}`}>
                <p className="rating">{vote_average}</p>
                <BsFillStarFill/>
                </div>
            </div>
            {isNaN(getYear(release_date))  ? '' :<p className="release-date"><span>Year : </span>{getYear(release_date)}</p>}
            <div className="movie-overview">
                <h1>Overview: </h1>
                <p>{movie.overview}</p>
            </div>
        </div>
        
    )

}
export default Movies