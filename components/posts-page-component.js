import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { goToPage, user as authorizedUser } from "../index.js";
import { addLike, removeLike } from "../api.js";
import { getToken } from "../index.js";

export function renderPostsPageComponent({ appEl, posts = [], onPostsChange = () => {} }) {


  const handleCheckIsLiked = (isLiked, array = [], userName) => {
    //Костыль, потому что бек работает некорректно
    if (isLiked) {
      return true;
    }
    return array.map(({name}) => name).includes(userName)
  }

  const getLikeList = (array) => {
    if (!!array?.length) {
      if (array.length > 1) {
        return `${array[0]?.name} и еще ${array.length - 1}`
      }
      return `${array[0]?.name}`
    }
    return ''
  }

  const render = () => {
    const appHtml = `
      <div class="page-container">
        <div class="header-container"></div>
        <ul class="posts">
        ${
          posts?.length === 0 
          ? 'Список постов пуст' 
          : posts.map(({
              createdAt,
              description,
              imageUrl,
              likes,
              isLiked,
              user,
              id,
            }) => (
              `
                <li class="post">
                  <div class="post-header" data-user-id="${user.id}">
                      <img src="${user.imageUrl}" class="post-header__user-image">
                      <p class="post-header__user-name">${user.name}</p>
                  </div>
                  <div class="post-image-container">
                    <img class="post-image" src="${imageUrl}">
                  </div>
                  <div class="post-likes">
                    <button data-post-id="${id}" data-is-liked="${handleCheckIsLiked(isLiked, likes, authorizedUser.name)}" class="like-button">
                      <img src="./assets/images/like${handleCheckIsLiked(isLiked, likes, authorizedUser.name) ? "" : "-not"}-active.svg">
                    </button>
                    <p class="post-likes-text">
                      Нравится: <strong>${getLikeList(likes)}</strong>
                    </p>
                  </div>
                  <p class="post-text">
                    <span class="user-name">${user.name}</span>
                    ${description}
                  </p>
                  <p class="post-date">
                  ${dateFns.formatDistanceToNow(createdAt)}
                  </p>
                </li>
              `
            )).join("")
        }
        </ul>
      </div>
    `;
    
    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    for (let userEl of document.querySelectorAll(".post-header")) {
      userEl.addEventListener("click", () => {
        goToPage(USER_POSTS_PAGE, {
          userId: userEl.dataset.userId,
        });
      });
    }
  
    for (let likeButtonElement of document.querySelectorAll('.like-button')) {
      likeButtonElement.addEventListener('click', (event) => {

        event.stopPropagation();
        
        if (!authorizedUser) {
          alert('Пожалуйста, зарегестрируйтесь или войдите в аккаунт');
          return;
        }
        
        const postId = likeButtonElement.dataset.postId
        const token = getToken()

        if ( likeButtonElement.dataset.isLiked === 'true' ) {
          removeLike({ token, postId }).then(({ post }) => onPostsChange(post))
        } else {
          addLike({ token, postId }).then(({ post }) => onPostsChange(post))
        }
      });
    }
  }

  render();
}
