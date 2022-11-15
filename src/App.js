
import Tmdb from "./tmdb";
import MovieRow  from "./components/MovieRow";
import Header from "./components/Header";
import FeaturedMovie from './components/FeaturedMovie';
import React, { useEffect, useState } from "react";
import './App.css';


function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      // Pegando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando Featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];

      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      setFeaturedData(chosenInfo);


    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () =>{
        if(window.scrollY > 10) {
          setBlackHeader(true);
        }else{
          setBlackHeader(false)
        }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  });


    return (
    <div className="page">
        <Header black={blackHeader}/>
        {featuredData &&
          <FeaturedMovie item={featuredData}/>
        }
        
        <section className="lists">
          {movieList.map((item, key)=>
          
              <MovieRow key={key} title={item.title} items={item.items}/>
          )}
         </section>

         <footer>
           Feito com <span role="img" aria-label="coração">🧡 Por Hugo Souza</span>
           Direitos de imagens para Netflix<br/>
           Dados extraidos do site Themoviedb.org
         </footer>
         {movieList.length <= 0 &&
             <div className="loading">
                <img src="https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2_w200.gif" alt="Carregando..."/>
             </div>
         }
        
    </div>
    );
}

export default App;
