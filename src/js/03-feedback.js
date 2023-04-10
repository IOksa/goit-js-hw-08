import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const refs={
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
}

const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

populateTextarea();

/*
 * - Останавливаем поведение по умолчанию
 * - Убираем сообщение из хранилища
 * - Очищаем форму
 */
function onFormSubmit(evt) {
    evt.preventDefault();
  
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);

    console.log("formData= ", formData);
  
}

/*
 * - Получаем значение поля
 * - Сохраняем его в хранилище
 */
function onInput(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem(STORAGE_KEY,  JSON.stringify(formData));
}

/*
 * - Получаем значение из хранилища
 * - Если там что-то было, обновляем DOM
 */
function populateTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
   
    if(savedMessage){
        if (JSON.parse(savedMessage).email) {
          formData.email=JSON.parse(savedMessage).email;
          refs.input.value=formData.email;
        }
        if (JSON.parse(savedMessage).message) {
          formData.message=JSON.parse(savedMessage).message;
          refs.textarea.value = formData.message;
        }
      }
}