export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
        <h3 class="form-title"> Вход в&nbsp;Instapro <h3>
          <div class="form-inputs">
            <input type="text" id="login-input" class="input" placeholder="Логин">
            <input type="password" id="password-input" class="input" placeholder="Пароль">
              <div class="form-error"></div>
          <button class="button" id="add-button">Добавить</button>
          </div>
       </div>
       </div>    
  `;

    appEl.innerHTML = appHtml;

    document.getElementById("add-button").addEventListener("click", () => {
      const description = document.getElementById("description").value;
      const imageUrl = document.getElementById("imageUrl").value;
      onAddPostClick({
        description,
        imageUrl,
      });
    });
  };

  render();
}
