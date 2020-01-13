window.onload = () => {
    const filePath = window.location.pathname;
    const rootPath = filePath.split('/').slice(0, -1).join('/');

    const allMoviesUrl = 'https://ndr2l4ex5h.execute-api.eu-west-1.amazonaws.com/dev/movies';
    fetch(allMoviesUrl)
        .then(res => res.json())
        .then(movies => {
            const movieList = document.getElementById('movielist');

            movies && movies.forEach(movie => {
                const root = document.createElement('li');
                root.className = 'movielist-item';

                const movieHeader = document.createElement('h4');
                movieHeader.className = 'movielist-item-title';
                movieHeader.innerText = movie.title;
                root.appendChild(movieHeader);

                root.addEventListener('click', () => {
                    window.location.href = `${ rootPath }/movie.html?id=${ movie.id }`
                })

                movieList.appendChild(root);
            });
        })
};