import { renderUploadImageComponent } from "./upload-image-component.js";
import { renderHeaderComponent } from "./header-component.js";
import { getToken } from '../index.js'

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {

  const render = () => {
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
        <div class="form">
          <h3 class="form-title">Добавить пост</h3>
          <div class="form-inputs">

            <div class="upload-image-container"></div>

            <label>
              Опишите фотографию:
              <textarea id="description" class="input textarea" rows="4"></textarea>
            </label>

            <button class="button" id="add-button">Добавить</button>
          </div>
       </div>
      </div>    
  `;

    appEl.innerHTML = appHtml;
    let imageUrl = "";

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    renderUploadImageComponent({
      element: document.querySelector(".upload-image-container"),
      onImageUrlChange: (imgUrl) => {
        imageUrl = imgUrl;
      },
    });

    document.getElementById("add-button").addEventListener("click", () => {

      const description = document.getElementById("description")?.value;

      if (!description) {
        alert("Не заполнено описание фото");
      } else if (!imageUrl) {
        alert("Не указано фото");
      } else {
        onAddPostClick({
          token: getToken(),
          description,
          imageUrl,
        });
      }
    });
  };

  render();
}
