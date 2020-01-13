window.onload = () => {
    const filePath = window.location.pathname;
    const rootPath = filePath.split('/').slice(0, -1).join('/');

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const movieDetailsUrl = `https://ndr2l4ex5h.execute-api.eu-west-1.amazonaws.com/dev/movies?id=${ id }`;
    fetch(movieDetailsUrl)
        .then(res => res.json())
        .then(movie => {
            const movieTitle = document.getElementById('movie-title');
            movieTitle.innerText = movie.title;

            const grid = document.getElementById('movie-details-grid');

            const movieImg = document.createElement('img');
            movieImg.src = movie.poster || `${ rootPath }/assets/placeholder-image.png`;
            grid.appendChild(movieImg);

            const movieDesc = document.createElement('div');
            movieDesc.className = 'movie-description';

            const descHeader = document.createElement('h3');
            descHeader.textContent = 'Description';
            movieDesc.appendChild(descHeader);

            const descContent = document.createElement('p');
            descContent.textContent = movie.description || 'No description available';
            movieDesc.appendChild(descContent);

            const actorsHeader = document.createElement('h3');
            actorsHeader.textContent = 'Actors';
            movieDesc.appendChild(actorsHeader);

            const actorsContent = document.createElement('p');
            actorsContent.textContent = (movie.actors && movie.actors.join(', ')) || 'No actors available';
            movieDesc.appendChild(actorsContent);

            const backButton = document.createElement('a');
            backButton.className = 'back-button';
            backButton.textContent = 'Back to movies';
            backButton.href = `${ rootPath }/index.html`;

            movieDesc.appendChild(backButton);

            grid.appendChild(movieDesc);
        })
}