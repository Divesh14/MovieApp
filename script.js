// 234317f32bbc837ca5490bec2952408b
// https://api.themoviedb.org/3/movie/550?api_key=234317f32bbc837ca5490bec2952408b

const APIKEY =  'api_key=234317f32bbc837ca5490bec2952408b'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + APIKEY
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchUrl = BASE_URL + "/search/movie?" + APIKEY

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const btn = document.getElementById('btn');

const getMovies = (url) =>{
    fetch(url).then(res => res.json()).then(data => showMovies(data.results))
}
getMovies(API_URL);

const showMovies = (data) =>{

    main.innerHTML = '';

    data.forEach((movie) =>{
        let {id,overview,title,poster_path,vote_average} = movie;
        if(poster_path == null)
        {
            poster_path = '/5bFK5d3mVTAvBCXi5NPWH0tYjKl.jpg'
        }
        console.log(movie);
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie')
        movieEl.innerHTML = `<img src="${IMG_URL+poster_path}" alt="img">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>`

        main.appendChild(movieEl);
    })
}


const getColor = (vote) =>{
    if(vote >= 8) return 'green'
    else if(vote >=5) return 'orange'
    else return 'red'
}

form.addEventListener('submit',function(e){
    e.preventDefault();
    const value = search.value;
    if(value)
    {
        getMovies(searchUrl+'&query='+value)
    }
    else{
        getMovies(API_URL)
    }
})

btn.addEventListener('click',function(){
    getMovies(API_URL)
})