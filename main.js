/*
esercizio di oggi: Social Posts
nome repo: js-social-posts
Descrizione
Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
Nel file js avete un array di oggetti che rappresentano ciascun post.
Ogni post contiene le informazioni necessarie per stampare la relativa card:
id del post (numero progressivo da 1 a n),
nome autore,
foto autore,
data in formato americano (mm-gg-yyyy),
testo del post,
immagine (non tutti i post devono avere una immagine),
numero di likes.
Milestone 1 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
Milestone 2 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
BONUS
1. Formattare le date in formato italiano (gg/mm/aaaa)
2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
*/

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];



// Definizione elemento contenitore dei post
const eleContainer = document.getElementById('container');



// Esecuzione della funzione che genera la visualizzazione dei post
allPostsGenerator();



// Definizione della funzione che genera la visualizzazione dei post
function postGenerator(i) {
    // generazione dell'elemento post
    let elePost = document.createElement('div');
    elePost.classList.add('post');
    eleContainer.append(elePost);
    // generazione header del post
    let elePostHeader = document.createElement('div');
    elePostHeader.classList.add('post__header');
    elePost.append(elePostHeader);
    let elePostMeta = document.createElement('div');
    elePostMeta.classList.add('post-meta');
    elePostHeader.append(elePostMeta);
    // immagine dell'autore
    let elePostMetaIcon = document.createElement('div');
    elePostMetaIcon.classList.add('post-meta__icon');
    if (posts[i].author.image == null) {
        let eleProfilePic = document.createElement('div');
        eleProfilePic.classList.add('profile-pic', 'profile-pic-default');
        eleProfilePic.innerHTML = `<span>${InitialsNameAuthor()[i]}</span>`;
        elePostMetaIcon.append(eleProfilePic);
    } else {
        elePostMetaIcon.innerHTML = `<img class="profile-pic" src="${posts[i].author.image}" alt="${posts[i].author.name}">`;
    }
    elePostMeta.append(elePostMetaIcon);
    // nome dell'autore e data pubblicazione
    let elePostMetaData = document.createElement('div');
    elePostMetaData.classList.add('post-meta__data');
    elePostMetaData.innerHTML = `
                    <div class="post-meta__author">${posts[i].author.name}</div>
                    <div class="post-meta__time">${transformDateFormat()[i]}</div>
                    `;
    elePostMeta.append(elePostMetaData);
    // generazione contenuto del post
    let elePostContent = document.createElement('div');
    elePostContent.classList.add('post__text');
    elePostContent.innerHTML = `${posts[i].content}`;
    elePost.append(elePostContent);
    // Generazione, SE PRESENTE, dell'immagine del post
    if (posts[i].media != '') {
        let elePostImage = document.createElement('div');
        elePostImage.classList.add('post__image');
        elePostImage.innerHTML = `<img src="${posts[i].media}" alt="">`;
        elePost.append(elePostImage);
    }
    // generazione footer del post
    let elePostFooter = document.createElement('div');
    elePostFooter.classList.add('post__footer');
    elePost.append(elePostFooter);
    let elePostLikes = document.createElement('div');
    // Bottone Mi Piace
    elePostLikes.classList.add('likes', 'js-likes');
    elePostFooter.append(elePostLikes);
    let elePostLikesCta = document.createElement('div');
    elePostLikesCta.classList.add('likes__cta');
    elePostLikes.append(elePostLikesCta);
    let eleLikeButton = document.createElement('a');
    eleLikeButton.classList.add('like-button', 'js-like-button');
    eleLikeButton.href = '#';
    eleLikeButton.dataset.postid = posts[i].id;
    eleLikeButton.innerHTML = `<i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
    <span class="like-button__label">Mi Piace</span>`;
    elePostLikesCta.append(eleLikeButton);
    eleLikeButton.addEventListener('click', addRemoveLike);
    // Contatore Mi Piace
    let elePostLikesCounter = document.createElement('div');
    elePostLikesCounter.classList.add('likes__counter');
    elePostLikesCounter.innerHTML = `Piace a <b id="like-counter-1" class="js-likes-counter">${posts[i].likes}</b> persone`;
    elePostLikes.append(elePostLikesCounter);
}



// Definzione della funzione che genera tutti i post contenuti nell'array
function allPostsGenerator() {
    for (let i = 0; i <= posts.length - 1; i++) {
        postGenerator(i);
    }
}



// Definizione della funzione che genera un array con le iniziali degli autori dei post
function InitialsNameAuthor() {

let arrInitials = [];
    for (let i = 0; i < posts.length; i++) {
        let arrNameSurname = posts[i].author.name.split(' ');
        let Initials = arrNameSurname[0][0] + arrNameSurname[1][0];
        arrInitials.push(Initials);
    };
// console.log(arrInitials);
return arrInitials;
}



// Funzione che converte la data dal formato YYYY-MM-DD al formato DD-MM-YYYY
function transformDateFormat() {

let arrItalianDateFormat = [];
    for (let i = 0; i < posts.length; i++) {
        let arrYyyyMmDd = posts[i].created.split('-');
        // console.log(arrYyyyMmDd);
        let italianDateFormat = arrYyyyMmDd[2] + '/' + arrYyyyMmDd[1] + '/' + arrYyyyMmDd[0]
        // console.log(italianDateFormat);
        arrItalianDateFormat.push(italianDateFormat);
    };
// console.log(arrItalianDateFormat);
return arrItalianDateFormat;
}



// Funzione per applicare e rimuovere il like
function addRemoveLike(event) {
// Evito che al click sul bottone la pagina torni all'inizio
event.preventDefault();

let likesCounter = parseInt(this.parentNode.parentNode.parentNode.querySelector('.js-likes-counter').textContent);
const arrIDwithLike = [];

    if (!this.classList.contains('like-button--liked')) {
    this.classList.add('like-button--liked');
    likesCounter++;
    this.parentNode.parentNode.parentNode.querySelector('.likes__counter').innerHTML = `Piace a <b id="like-counter-1" class="js-likes-counter">${likesCounter}</b> persone`;
    } else {
    this.classList.remove('like-button--liked');
    likesCounter--;
    this.parentNode.parentNode.parentNode.querySelector('.likes__counter').innerHTML = `Piace a <b id="like-counter-1" class="js-likes-counter">${likesCounter}</b> persone`;
    }
}