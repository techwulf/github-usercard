import axios from 'axios';
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3 (line 34).
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

axios.get('https://api.github.com/users/techwulf')
  .then(res => {
    document.querySelector('.cards').appendChild(githubCard(res));
  })
  .catch(err => {console.error(err)});
/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'
];
for(const user of followersArray){
  axios.get(`https://api.github.com/users/${user}`)
    .then(res => {
      document.querySelector('.cards').appendChild(githubCard(res));
    })
    .catch(err => {console.error(err)});
}

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function githubCard(res){
  const data = res.data;
  const card = document.createElement('div');
  card.classList.add('card');
  const usrimg = document.createElement('img');
  usrimg.src = data['avatar_url'];
  card.appendChild(usrimg);
  const info = document.createElement('div');
  info.classList.add('card-info');
  card.appendChild(info);
  const user = document.createElement('h3');
  user.classList.add('name');
  user.innerText = data.name;
  info.appendChild(user);
  const username = document.createElement('p');
  username.classList.add('username');
  username.innerText = data.login;
  info.appendChild(username);
  const location = document.createElement('p');
  location.innerText = `Location: ${data.location}`;
  info.appendChild(location);
  const profile = document.createElement('p');
  profile.innerHTML = ``+
    `Profile: <a href="${data['html_url']}">${data['html_url']}</a>`;
  info.appendChild(profile);
  const followers = document.createElement('p');
  followers.innerText = `Followers: ${data.followers}`;
  info.appendChild(followers);
  const following = document.createElement('p');
  following.innerText = `Following: ${data.following}`;
  const bio = document.createElement('p');
  bio.innerText = `Bio: ${data.bio}`;
  info.appendChild(bio);
  return card;
}
/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
