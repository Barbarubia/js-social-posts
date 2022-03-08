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

// Esecuzione funzione che genera la visualizzazione dei post
postGenerator();



// Definizione della funzione che genera la visualizzazione dei post
function postGenerator() {
    // generazione dell'elemento post
    let elePost = document.createElement('div');
    elePost.classList.add('post');
    eleContainer.append(elePost);
    // generazione header del post
    let elePostHeader = document.createElement('div');
    elePostHeader.classList.add('post__header');
    elePostHeader.innerHTML = `
                    <div class="post-meta">                    
                        <div class="post-meta__icon">
                            <img class="profile-pic" src="${posts[0].author.image}" alt="${posts[0].author.name}">                    
                        </div>
                        <div class="post-meta__data">
                            <div class="post-meta__author">${posts[0].author.name}</div>
                            <div class="post-meta__time">4 mesi fa</div>
                        </div>                    
                    </div>
                    `;
    elePost.append(elePostHeader);
    // generazione contenuto del post
    let elePostContent = document.createElement('div');
    elePostContent.classList.add('post__text');
    elePostContent.innerHTML = `${posts[0].content}`;
    elePost.append(elePostContent);
    // Generazione, SE PRESENTE, dell'immagine del post
    if (posts[0].media != null) {
        let elePostImage = document.createElement('div');
        elePostImage.classList.add('post__image');
        elePostImage.innerHTML = `<img src="https://unsplash.it/600/300?image=171" alt="">`;
        elePost.append(elePostImage);
    }
    // generazione footer del post
    let elePostFooter = document.createElement('div');
    elePostFooter.classList.add('post__footer');
    elePostFooter.innerHTML = `
                    <div class="likes js-likes">
                        <div class="likes__cta">
                            <a class="like-button  js-like-button" href="#" data-postid="1">
                                <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                                <span class="like-button__label">Mi Piace</span>
                            </a>
                        </div>
                        <div class="likes__counter">
                            Piace a <b id="like-counter-1" class="js-likes-counter">${posts[0].likes}</b> persone
                        </div>
                    </div> 
                    `;
    elePost.append(elePostFooter);
}
