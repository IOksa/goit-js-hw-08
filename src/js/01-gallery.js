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

containerGallery.addEventListener('click', onGalleryItemClick);

let instance;

function createGalleryMarkup(gallery){
 return gallery.map(({preview, original, description})=>{
    return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}" download>
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
    `;
  })
  .join("");
}

function onGalleryItemClick (event){
    event.preventDefault();

    const isImageGalleryEl=event.target.classList.contains('gallery__image');
    if(!isImageGalleryEl){
        return;
    }
    
    openGalleryItemInModal(event.target.dataset.source);
}

function openGalleryItemInModal(src){
  instance = basicLightbox.create(`
    <img src="${src}" width="800" height="600">
`,{
  onShow: (instance) => {
    window.addEventListener('keydown', onEscKeyPress)
  },
  onClose: (instance) => {
    window.removeEventListener('keydown', onEscKeyPress)}
  });

  instance.show();
 // window.addEventListener('keydown', onEscKeyPress);
  
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;
  
  if (isEscKey) {
    //window.removeEventListener('keydown', onEscKeyPress);
    instance.close();
  }
}