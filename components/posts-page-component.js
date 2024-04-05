import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { goToPage } from "../index.js";
import { getPosts } from "../api.js";
import { getToken } from "../index.js";

export function renderPostsPageComponent({ appEl }) {
  const postItem = ({
    createdAt,
    description,
    imageUrl,
    likes,
    isLiked,
    user,
    id,
  }) => `
  <li class="post">
    <div class="post-header" data-user-id="${user.id}">
        <img src="${user.imageUrl}" class="post-header__user-image">
        <p class="post-header__user-name">${user.name}</p>
    </div>
    <div class="post-image-container">
      <img class="post-image" src="${imageUrl}">
    </div>
    <div class="post-likes">
      <button data-post-id="${id}" class="like-button">
        <img src="./assets/images/like${isLiked ? "" : "-not"}-active.svg">
      </button>
      <p class="post-likes-text">
        Нравится: <strong>${likes.length}</strong>
      </p>
    </div>
    <p class="post-text">
      <span class="user-name">${user.name}</span>
      ${description}
    </p>
    <p class="post-date">
    ${dateFns.formatDistanceToNow(createdAt)}
    </p>
  </li>`;

  getPosts({ getToken: getToken() }).then((posts) => {
    const appHtml = `
    <div class="page-container">
      <div class="header-container">
      </div>
      <ul class="posts">
        ${(posts ?? [])?.map((post) => postItem(post)).join("")}
      </ul>
    </div>`;

    appEl.innerHTML = appHtml;
    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });
  });

  console.log("Актуальный список постов:");

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}

// const initLikesListeners = ({ ?comments }, { ?renderComments }) => {
  const likeButtonsElements = document.querySelectorAll('.like-button');
  for (const likeButtonElement of likeButtonsElements) {
      likeButtonElement.addEventListener('click', (event) => {
          event.stopPropagation();
          if (!isAuth) {
              alert('Пожалуйста, зарегестрируйтесь или войдите в аккаунт');
              return;
          }
          const index = likeButtonElement.dataset.index;
          const post = posts[index];
          post.likes = post.isLiked
              ? post.likes - 1
              : post.likes + 1;
          post.isLiked = !post.isLiked;
          renderComments({ posts });
      });
  }
// };
