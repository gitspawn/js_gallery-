// Создай галерею с возможностью клика по ее элементам и просмотра
// полноразмерного изображения в модальном окне.
// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения. +
// Открытие модального окна по клику на элементе галереи. +
// Подмена значения атрибута src элемента img.lightbox__image. +
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]. +
// Очистка значения атрибута src элемента img.lightbox__image. +
// Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение,
// мы не видели предыдущее.

// Дополнительно
// Следующий функционал не обязателен при сдаче задания,
// но будет хорошей практикой по работе с событиями.
// Закрытие модального окна по клику на div.lightbox__overlay. +
// Закрытие модального окна по нажатию клавиши ESC. +

// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

// <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//   >
//     <img
//       class="gallery__image"
//       src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//       data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//       alt="Tulips"
//     />
//   </a>
// </li>

import gallery from "./gallery-items.js";
let refs = {
  ul: document.querySelector(".js-gallery"),
  lightBox: document.querySelector('.js-lightbox'),
  lightBoxImage: document.querySelector('.lightbox__image'),
  lightBoxCloseButton: document.querySelector('button[data-action="close-lightbox"]'),
  lightBoxOverlay: document.querySelector('.lightbox__overlay'),
}
let images = []
let index = 0

// Generate the gallery
gallery.forEach(img => {
  let li = `
  <li class="gallery__item">
    <a
      class="gallery__link"
      href="${img.original}"
    >
      <img
        class="gallery__image"
        src="${img.preview}"
        data-source="${img.original}"
        alt="${img.description}"
      />
    </a>

  </li>
  `
  images.push(img.original)
  refs.ul.insertAdjacentHTML("beforeend", li);
})

// Events
refs.ul.addEventListener('click', open)
refs.lightBoxCloseButton.addEventListener('click', close)
refs.lightBoxOverlay.addEventListener('click', close)

function open (evt){
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') return
  index = images.indexOf(evt.target.dataset.source)
  window.addEventListener('keydown', keyAction)
  imgUpdate(index)
  refs.lightBox.classList.add('is-open')
}

// lightBoxImage update
let imgUpdate = idx => refs.lightBoxImage.src = images[idx]

// Close button
function close () {
  refs.lightBox.classList.remove('is-open')
  refs.lightBoxImage.src = ''
  window.removeEventListener('keydown', keyAction)
}

// Key actions
function keyAction(evt) {
  if (evt.code === 'Escape') close()
  if (evt.code === 'ArrowLeft'){
    index -= 1
    index < 0 ? index = images.length - 1 : index
  }
  if (evt.code === 'ArrowRight'){
    index += 1
    index === images.length ? index = 0 : index
  }
  console.log(index)
  imgUpdate(index)
}
