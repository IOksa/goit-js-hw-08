// Add imports above this line
import { galleryItems } from './gallery-items';

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

// Change code below this line

console.log(galleryItems);

const containerGallery=document.querySelector('.gallery');

const galleryMarkup=createGalleryMarkup(galleryItems);

containerGallery.insertAdjacentHTML("beforeend", galleryMarkup);

let gallery = new SimpleLightbox('.gallery a', {captionDelay: 250, showCounter: false});

function createGalleryMarkup(gallery){
 return gallery.map(({preview, original, description})=>{
    return `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" title="${description}" />
        </a>
    </li>
    `;
  })
  .join("");
}

