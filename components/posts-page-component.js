import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { formatDistanceToNow } from "date-fns";
import ruLocale from "date-fns/locale/ru";

function createPostHtml(post) {
  return `
    <li class="post">
      <div class="post-header" data-user-id="${post.user.id}">
        <img src="${post.user.imageUrl}" class="post-header__user-image">
        <p class="post-header__user-name">${post.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${post.imageUrl}">
      </div>
      <div class="post-likes">
        <button data-post-id="${post.id}" class="like-button">
          <img src="${post.isLiked ? './assets/images/like-active.svg' : './assets/images/like-not-active.svg'}">
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${post.likesCount}</strong>
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>
        ${post.description}
      </p>
      <p class="post-date">
        ${formatDistanceToNow(new Date(post.createdAt), { locale: ruLocale })} назад
      </p>
    </li>`;
}

function getPostHtmls(posts) {
  return posts.map(createPostHtml).join('');
}

export function renderPostsPageComponent({ appEl, posts, userId }) {
  console.log("Актуальный список постов:", posts);

  const postsHtml = getPostHtmls(posts);

  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        ${postsHtml}
      </ul>
    </div>`;

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
}



























// import { USER_POSTS_PAGE } from "../routes.js";
// import { renderHeaderComponent } from "./header-component.js";
// import { posts, goToPage } from "../index.js";
// import { formatDistanceToNow } from "date-fns";
// import ruLocale from "date-fns/locale/ru";

// // Разметка для нового поста

// function createPostHtml(post) {
//   return `
//     <li class="post">
//       <div class="post-header" data-user-id="${post.user.id}">
//         <img src="${post.user.imageUrl}" class="post-header__user-image">
//         <p class="post-header__user-name">${post.user.name}</p>
//       </div>
//       <div class="post-image-container">
//         <img class="post-image" src="${post.imageUrl}">
//       </div>
//       <div class="post-likes">
//         <button data-post-id="${post.id}" class="like-button">
//           <img src="${post.isLiked ? './assets/images/like-active.svg' : './assets/images/like-not-active.svg'}">
//         </button>
//         <p class="post-likes-text">
//           Нравится: <strong>${post.likesCount}</strong>
//         </p>
//       </div>
//       <p class="post-text">
//         <span class="user-name">${post.user.name}</span>
//         ${post.description}
//       </p>
//       <p class="post-date">
//         ${formatDistanceToNow(new Date(post.createdAt), { locale: ruLocale })} назад
//       </p>
//     </li>`;
// }

// function getPostHtmls(posts) {
//   return posts.map(createPostHtml).join('');
// }

// // НОВАЯ РАЗМЕТКА
// export function renderPostsPageComponent({ appEl, posts }) {
//   console.log("Актуальный список постов:", posts);

//   const postsHtml = getPostHtmls(posts);

//   const appHtml = `
//     <div class="page-container">
//       <div class="header-container"></div>
//       <ul class="posts">
//         ${postsHtml}
//       </ul>
//     </div>`;

//   appEl.innerHTML = appHtml;

//   renderHeaderComponent({
//     element: document.querySelector(".header-container"),
//   });

//   for (let userEl of document.querySelectorAll(".post-header")) {
//     userEl.addEventListener("click", () => {
//       goToPage(USER_POSTS_PAGE, {
//         userId: userEl.dataset.userId,
//       });
//     });
//   }
// }
