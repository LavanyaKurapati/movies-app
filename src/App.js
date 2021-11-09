import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Movies from './Movies';
import NotFound from './NotFound';
import './App.css';

class App extends Component{

  state={
    moviesArray:[],
    searchInput:"",
    isLoading:false
  }

  componentDidMount(){
    this.getMovies()
  }

  getMovies=async()=>{
    const url="https://api.themoviedb.org/3/trending/all/week?api_key=9b85f81f57c69697be71fc31106873d3";
    //const url="https://api.themoviedb.org/3/movie/top_rated?api_key=9b85f81f57c69697be71fc31106873d3&language=en-US"
    const response = await fetch(url);
    const fetchedData = await response.json();
    this.setState({moviesArray:fetchedData.results})
  }

  onChangeValue=(event) =>{
    this.setState({searchInput:event.target.value})
  } 

  onSubmitSearch = async(event)=>{
    event.preventDefault()
    const {searchInput}=this.state

    this.setState({isLoading:true})
    const apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=9b85f81f57c69697be71fc31106873d3&query="
  
    const response = await fetch(`${apiUrl}${searchInput}`);
    
    const fetchedData = await response.json();
    this.setState({moviesArray:fetchedData.results, searchInput:'', isLoading:false})
  }

  loaderView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#FFFFFF" height={50} width={50} />
    </div>
  )

  successView = () => {
    const{moviesArray}=this.state;
    return(
      <>
      {moviesArray.length === 0 ? <NotFound/> : 
          <div className="list-container">
            {moviesArray.map(eachMovie => (
            <Movies key={eachMovie.id} movie={eachMovie}/>
        ))}
          </div>
       }
      </>
    )
  }

  render(){
    const {isLoading, searchInput}=this.state
    return(
      <>
        <h1>Movies App</h1>
        <div className="main-container">
          <form onSubmit={this.onSubmitSearch} className="form-container">
            <BsSearch className="search-icon" />
            <input type="search" onChange={this.onChangeValue} placeholder="Search a movie.." className="search-input" value={searchInput} required />
          </form>
        {isLoading ? (this.loaderView()) : (this.successView())} 
        </div>
      </>
    )
  }
}

export default App;
