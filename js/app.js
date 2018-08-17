(function () {
  'use strict';

  let movies = [];

  const renderMovies = function () {
    console.log('test')
    $('#listings').empty();

    for (let movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

  
      

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };
  //let moviesArray= [ ];

  const searchBtn = document.getElementsByClassName('btn-large waves-effect waves-light')[0];
  searchBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    inputValid();
  })


  // searching the value of input field
  let inputValue = document.getElementById('search')
  function inputValid() {
    movies = [];
    fetch(`https://omdb-api.now.sh/?s=${inputValue.value}`)
      .then(response => response.json())
      .then((data) => {
        if (inputValue.value != '') {

          for (let i = 0; i < data.Search.length; i++) {
            let movie = {
              id: '',
              poster: '',
              title: '',
              year: ''
            }
            movie.id = data.Search[i].imdbID;
            movie.poster = data.Search[i].Poster;
            movie.title = data.Search[i].Title;
            movie.year = data.Search[i].Year;

            fetch(`http://www.omdbapi.com/?i=${movie.id}&apikey=efabd8b9`)
              .then(response => response.json())
              .then((data) => {
                movie.plot = data.Plot;
                renderMovies();
                movies.push(movie);
                inputValue.value = '';
              })
              
          }
        } else {
          alert('Give a proper movie name');
        }
      })
  }







  // ADD YOUR CODE HERE
})();
