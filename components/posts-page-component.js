import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { getPosts } from "../api.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  const render = () => {
    getPosts({ posts })
      .then((response) => {
        if (response.json) {
          return response.json();
        } else {
          throw new Error("Invalid response format");
        }
      })
      .then((data) => {
        const appHtml = `
      <div class="page-container">
        <div class="header-container"></div>
        <ul class="posts">`;

        data.forEach((post) => {
          const postHtml = `
        <li class="post">
          <div class="post-header" data-user-id="${post.userId}">
            <img src="${post.userImage}" class="post-header__user-image" />
            <p class="post-header__user-name">${post.userName}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}" />
          </div>
          <div class="post-likes">
            <button data-post-id="${post.id}" class="like-button">
              <img src="./assets/images/like-not-active.svg" />
            </button>
            <p class="post-likes-text">Нравится: <strong>${
              post.likesCount
            }</strong></p>
          </div>
          <p class="post-text">
            <span class="user-name">${post.userName}</span>
            ${post.text}
          </p>
          <p class="post-date">
            ${formatDistanceToNow(new Date(post.createdAt))}
          </p>
        </li>`;

          appHtml += postHtml;
        });

        appHtml += `
      </ul>
    </div>
  `;

        appEl.innerHTML = appHtml;

        const likeButtons = document.querySelectorAll(".like-button");
        likeButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const postId = parseInt(button.dataset.postId);
            likePost(postId)
              .then((updatedPost) => {
                const postElement = document.querySelector(
                  `.post[data-post-id="${postId}"]`
                );
                if (postElement) {
                  const likeButton = postElement.querySelector(".like-button");
                  likeButton.textContent =
                    updatedPost.likesCount > 0 ? "Лайк" : "Не лайк";
                  likeButton.dataset.likesCount = updatedPost.likesCount;
                }
              })
              .catch((error) => {
                console.error("Error fetching posts:", error);
              });
          });
        });
      });
  };
}

console.log("Актуальный список постов:");
