 function fetching() {
   const query = document.querySelector("#Entermovie").value.trim();
   const resultDiv = document.getElementById("result");
   if (!query) {
     resultDiv.innerHTML = '<p class="empty">Type something to search.</p>';
     return;
   }
   const URL = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;
   fetch(URL)
     .then(function (response) {
       return response.json();
     })
     .then(function (data) {
       if (!Array.isArray(data) || data.length === 0) {
         resultDiv.innerHTML = '<p class="empty">No results found.</p>';
         return;
       }
       const cards = data.map(function (item) {
         const show = item.show || {};
         const name = show.name || "Untitled";
         const image = (show.image && (show.image.medium || show.image.original)) || "";
         const summary = (show.summary || "").replace(/<[^>]*>?/gm, "");
         const safeSummary = summary ? summary : "No description available.";
         const genres = Array.isArray(show.genres) ? show.genres : [];
         const chips = genres.length
           ? genres.map(function (g) { return '<span class="chip">' + g + '</span>'; }).join("")
           : '<span class="chip">N/A</span>';
         const imageTag = image ? '<img class="card-media" src="' + image + '" alt="' + name + ' poster" />' : '';
         return (
           '<article class="card">' +
             imageTag +
             '<div class="card-body">' +
               '<h3 class="card-title">' + name + '</h3>' +
               '<p class="card-summary">' + safeSummary + '</p>' +
               '<div class="chips">' + chips + '</div>' +
             '</div>' +
           '</article>'
         );
       });
       resultDiv.innerHTML = cards.join("");
     })
     .catch(function () {
       resultDiv.innerHTML = '<p class="empty">Something went wrong. Please try again.</p>';
     });
 }
