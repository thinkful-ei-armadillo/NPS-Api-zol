'use strict';
/*global $*/

function formatQueryParams(params){
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

function diplayResults(responseJson){
  console.log(responseJson);
  const resultStr = [];

  for (let i=0; i<responseJson.data.length; i++){
    resultStr.push(`<li>
                        <a href="${responseJson.data[i].url}"><h3>${responseJson.data[i].fullName}</h3></a>
                        <p>${responseJson.data[i].description}</p>
                        <hr>
                    </li>`);  
  }

  $('.js-park-list').html(resultStr.join(''));
  $('#js-result').removeClass('hidden');
}

function getParks(query){
  const searchURL = 'https://api.nps.gov/api/v1/parks';

  const params = {
    stateCode: query,
    limit: 10,
    api_key: 'Wl82SXvMrkHjvnB6xiMqdmg9vx4e4yorCox5RKxa'
  };

  const queryStr = formatQueryParams(params);
  const url = `${searchURL}?${queryStr}`;
//   console.log(url);

  fetch(url)
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => diplayResults(responseJson))
    .catch(e => {
      $('#js-error-message').text(`Something went wrong: ${e.message}`);
    });
}

function searchForm(){
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const searchTerm = $('.js-states').val();
    $('.js-states').val('');
    getParks(searchTerm);
  });
}

$(searchForm);