 function fetching() {
   let movie = document.querySelector("#Entermovie").value.trim();
    const URL = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(movie)}`;
    let promised_response = fetch(URL)
    .then(function(resolved_response){
        return resolved_response.json();
    })
    .then(function(resolved_data ) {
         const resultDiv = document.getElementById("result");
            if (resolved_data.length === 0) {
                resultDiv.innerHTML = "<p>No results found.</p>";
                return;
            }
     const json_response = resolved_data;
      let name = json_response[0]["show"]["name"];
            let description = json_response[0]["show"]["summary"] ;
            let genres = json_response[0]["show"]["genres"];
            let genresList = genres.length ? genres.join(", ") : "N/A";
            resultDiv.innerHTML = `<p><strong>Name:</strong> ${name}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Genres:</strong> ${genresList}</p>`;

    });
  
 }
