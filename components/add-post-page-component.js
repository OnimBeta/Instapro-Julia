export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <form>
        <label for="description">Описание:</label>
        <textarea id="description" name="description"></textarea>
        <label for="imageUrl">URL изображения:</label>
        <input type="url" id="imageUrl" name="imageUrl" />
        <button class="button" id="add-button">Добавить</button>
      </form>
      <button class="button" id="add-button">Добавить</button>
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
