import axios from "axios";
import {useState} from "react";
import styled from 'styled-components';
import MovieComponent from './components/MovieComponent';
import MovieInfoComponent from './components/MovieInfoComponent';

export const API_KEY = "1f41542d";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
background-color: black;
color: white;
align-items: center;
padding: 10px;
font-size: 25px;
font-weight: bold;
 box-shadow: 0 3px 6px 0 #555;

`;
const AppName = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;
const MovieIamge = styled.img`
width: 48px;
height: 48px;
margin: 15px;
`;
const SearchBox = styled.div`
display: flex;
flex-direction: row;
padding: 10px 10px;
background-color: white;
border-radius: 6px;
margin-left: 20px;
width: 50%;
background-color: white;
align-items: center;
`;
const SearchIcon = styled.img`
width: 32px;
height: 32px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 30px;
gap: 24px;
justify-content: space-evenly;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;


function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
  updateMovieList(response.data.Search)
};
  const onTextChange=(event) =>{
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <container>
      <Header>
        <AppName>
          <MovieIamge src="/Logo-movie.png" />
        Movie-Geek
        </AppName>
        <SearchBox>
          <SearchIcon src="/search-icon.jpg" />
          <SearchInput placeholder='Search Movie'
          value={searchQuery}
           onChange={onTextChange} />
        </SearchBox>
        </Header>
        {selectedMovie && (
           <MovieInfoComponent
            selectedMovie={selectedMovie} 
            onMovieSelect= {onMovieSelect}
            />
            )}
        <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="/Logo-movie.png" />
        )}
      </MovieListContainer>
    </container>
  );
}

export default App;

