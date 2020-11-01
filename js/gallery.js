document.addEventListener("DOMContentLoaded", initialiser);

function initialiser(evt) {

    //Masonry gallery
    let elem = document.querySelector('.grid');
    let msnry = new Masonry(elem, {
        // options
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
        // ,horizontalOrder: true
    });

    // création de la galerie Design
    dataDesign.forEach(createGallery);
    dataPhoto.forEach(createGallery);
    dataVideo.forEach(createGallery);

    // GALLERY

    const itemsDesign = document.querySelectorAll('.grid-item[data-type="design"]');
    const itemsPhoto = document.querySelectorAll('.grid-item[data-type="photo"]');
    const itemsVideo = document.querySelectorAll('.grid-item[data-type="video"]');

    const mediaViewer = document.getElementById("mediaViewer");
    let arrowLeft = document.getElementById("arrow-left");
    let arrowRight = document.getElementById("arrow-right");

    // Variables
    var curImageIndex = 0;
    var curImageTab = 0;

    // mediaViewer
    mediaViewer.addEventListener("click", function() {
        mediaViewer.style.display = "none";
        mediaViewer.childNodes[9].pause();
    });
    mediaViewer.style.display = "none";

    // Click sur les items de grid
    for (let a = 0; a < itemsDesign.length; a++) {
        itemsDesign[a].addEventListener("click", function() {
            curImageIndex = a;
            curImageTab = dataDesign;
            showMedia(curImageIndex, curImageTab);
        });
    }
    for (let a = 0; a < itemsPhoto.length; a++) {
        itemsPhoto[a].addEventListener("click", function() {
            curImageIndex = a;
            curImageTab = dataPhoto;
            showMedia(curImageIndex, curImageTab);
        });
    }
    for (let a = 0; a < itemsVideo.length; a++) {
        itemsVideo[a].addEventListener("click", function() {
            curImageIndex = a;
            curImageTab = dataVideo;
            showMedia(curImageIndex, curImageTab);
        });
    }

    // click sur les flèches
    // Flèche gauche : -
    arrowLeft.addEventListener("click", e => {
        curImageIndex--;
        showMedia(curImageIndex, curImageTab);
        event.stopPropagation();
    });
    // Flèche gauche : +
    arrowRight.addEventListener("click", e => {
        curImageIndex++;
        showMedia(curImageIndex, curImageTab);
        event.stopPropagation();
    });

    // GALLERY NAV OBSERVATION
    const galToObserve = document.querySelectorAll(".gallerySection");
    const navIcons = document.querySelectorAll(".galleryNav i");

    for (let a = 0; a < navIcons.length; a++) {
        navIcons[a].style.visibility = "hidden";
    }

    let observer = new IntersectionObserver(function(entries) {
        for (let i = 0; i < galToObserve.length; i++) {
            if (entries[0].isIntersecting && entries[0].target == galToObserve[i]) {
                navIcons[i].style.visibility = "visible";
            } else {
                navIcons[i].style.visibility = "hidden";
            }
            if (!entries[0].isIntersecting) {
                navIcons[i].style.visibility = "hidden";
            }
        }
    }, {
        threshold: [0.4]
    });

    for (let a = 0; a < galToObserve.length; a++) {
        observer.observe(galToObserve[a]);
    }
}

function createGallery(element, index, tableau) {
    let galleryToCreate = document.querySelector('#' + tableau[index].type + ' .grid');

    if (tableau == dataVideo) {
        galleryToCreate.innerHTML += '<div class="grid-item ' + dataVideo[index].width + '" data-type="' + dataVideo[index].type + '" data-video="' + dataVideo[index].videoSource + '">' +
            '<img src="' + dataVideo[index].source + '" alt="' + dataVideo[index].name + '"></div>';
    } else {
        galleryToCreate.innerHTML += '<div class="grid-item ' + tableau[index].width + '" data-type="' + tableau[index].type + '">' +
            '<img src="' + tableau[index].source + '" alt="' + tableau[index].name + '"></div>';
    }
}

function showMedia(index, tableau) {
    let arrowLeft = document.getElementById("arrow-left");
    let arrowRight = document.getElementById("arrow-right");

    if (index - 1 < 0) {
        arrowLeft.style.visibility = "hidden";
    } else if (index + 1 == tableau.length) {
        arrowRight.style.visibility = "hidden";
    } else {
        arrowLeft.style.visibility = "visible";
        arrowRight.style.visibility = "visible";
    }

    let gridItems = document.querySelectorAll(".grid-item");

    curMediaIndex = index;
    mediaViewer.style.display = "flex";

    if (tableau == dataVideo) {
        mediaViewer.childNodes[7].style.display = "none"; // cacher l'image
        mediaViewer.childNodes[9].style.display = "block"; // afficher la vidéo
        mediaViewer.childNodes[9].childNodes[1].src = dataVideo[index].videoSource;
        mediaViewer.childNodes[9].load();
        mediaViewer.childNodes[9].play();
    } else {
        mediaViewer.childNodes[9].style.display = "none"; // cacher la vidéo
        mediaViewer.childNodes[7].style.display = "block"; // afficher l'image
        mediaViewer.childNodes[7].src = tableau[index].source;
        mediaViewer.childNodes[7].alt = tableau[index].name;
    }
    mediaViewer.childNodes[11].innerHTML = tableau[index].name;
}
