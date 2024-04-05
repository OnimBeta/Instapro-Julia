import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container">
  <div class="page-header">
      <h1 class="logo">instapro</h1>
      <button class="header-button add-or-login-button">
      <div title="Добавить пост" class="add-post-sign"></div>
      </button>
      <button title="Админ" class="header-button logout-button">Выйти</button>  
      
  </div>
  
</div>
      <div class="form">
        <h3 class="form-title">Добавить пост</h3>
          <div class="form-inputs">
            <div class="upload-image-container">
  <div class="upload-image">
      
            <label class="file-upload-label secondary-button">
                <input id="imageUrl" type="file" class="file-upload-input">
                Выберите фото
            </label>
          
      
  </div>
</div>
          <label>
            Опишите фотографию:
            <input type="textarea" id="description" class="input textarea" rows="4"></textarea>
            </label>
          <button class="button" id="add-button">Добавить</button>
          </div>
       </div>
       </div>    
  `;

    appEl.innerHTML = appHtml;
    let imgUrl = "";

    renderUploadImageComponent({
      element: document.querySelector(".upload-image-container"),
      onImageUrlChange: (imageUrl) => {
        imgUrl = imageUrl;
      },
    });

    document.getElementById("add-button").addEventListener("click", () => {
      const description = document.getElementById("description")?.value;
      console.log(document.getElementById("imageUrl"));
      const imageUrl = document.getElementById("imageUrl")?.value;
      console.log(document.getElementById("imageUrl")?.value);
      onAddPostClick({
        description,
        imageUrl: imgUrl,
      });
    });
  };

  render();
}
