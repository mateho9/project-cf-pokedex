let pokemonRepository = (function () {
    //pokemon array
    let pokemonList = [];
    //change limit to 1126 later
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1126';
    //function to add pokemon to the list
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    //funtion to return the pokemon list
    function getAll() {
        return pokemonList;
    }

    //added spacing so its easier to read for now
    function addListItem(pokemon) {
        let list = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#pokemonModal");
        button.innerHTML = pokemon.name;
        button.classList.add('btn-primary');
        listItem.appendChild(button);
        list.appendChild(listItem);
        button.addEventListener('click', function () {
            loadDetails(pokemon).then(pokemon => showModal(pokemon));
        })
    }   

    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }

      function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
          return item;
        }).catch(function (e) {
          console.error(e);
        });
      }

      function showModal(item) {
        // showModal function
        let modalTitle = $('.modal-title'); // modalTitle
        let modalBody = $('.modal-body'); // modalBody
  
        let pokemonName = $('<h2>' + item.name + '</h2>');
  
        let pokemonHeight = $('<p>' + 'Height: ' + item.height + '</p>');
  
        let pokemonWeight = $('<p>' + 'Weight: ' + item.weight + '</p>');
  
        let pokemonAbilities = $('<p>' + 'Abilities: ' + item.abilities + '</p>');
  
        let pokemonImage = $('<img class=\'pokemon-modal-image\'>');
        pokemonImage.attr('src', item.imageUrl); // pokemon image attribute loaded from 'item.imageUrl'
  
        modalTitle.empty(); // clears the modalTitle after display
        modalBody.empty(); // clears the modalBody after display
  
        modalTitle.append(pokemonName); // pokemonName is displayed as the title in the modal
        modalBody.append(pokemonImage); // pokemonImage is displayed in the body of the modal
        modalBody.append(pokemonHeight); // pokemonHeight is displayed in the body of the modal
        modalBody.append(pokemonWeight); // pokemonWeight is displayed in the body of the modal
        modalBody.append(pokemonAbilities); // pokemonDetails are displayed in the body of the modal
      }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
       
    };
})();

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
});