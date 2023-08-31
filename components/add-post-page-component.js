import { goToPage, updatePostsAndGoToPostsPage } from "../index.js";
import { POSTS_PAGE } from "../routes.js";
import { createPost } from "../api.js";
import { getToken } from "../index.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let selectedFile = null;

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onerror = () => {
        reader.abort();
        reject(new Error("Error reading file."));
      };
      reader.readAsDataURL(file);
    });
  };

  const render = () => {
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
    <div class="upload = image">
          <label class="file-upload-label secondary-button">
              <input type="file" class="file-upload-input" style="display:none">
              Выберите фото
          </label>
    </div>
    </div>
          <label>
            Опишите фотографию:
            <textarea class="input textarea" rows="4"></textarea>
            </label>
            <button class="button" id="add-button">Добавить</button>
            <button class="button-exit" id="back-button">Назад</button>
        </div>
      </div>
    </div>
  `;
    appEl.innerHTML = appHtml;

    // Находим картинку
    const fileUpload = appEl.querySelector(".file-upload-input");

    fileUpload.addEventListener("change", (event) => {
      if (event.target.files.length > 0) {
        selectedFile = event.target.files[0];
        console.log("Вы выбрали:", selectedFile);
      } else {
        console.log("Файл не выбран");
      }
    });

    // Находим комментарий к картинке
    const descriptionTextarea = appEl.querySelector(".input.textarea");

    // Клик по кнопке "добавить"
    document.getElementById("add-button").addEventListener("click", async () => {
      if (!selectedFile) {
        alert('Пожалуйста, выберите файл.');
        return;
      }
      try {
        const imageDataURL = await readFileAsDataURL(selectedFile);
        onAddPostClick({
          description: descriptionTextarea.value,
          imageUrl: imageDataURL,
        });
        createPost({
          token: getToken(),
          description: descriptionTextarea.value,
          imageUrl: imageDataURL,
        })
          .then((post) => {
            console.log("Добавленный пост:", post);
            updatePostsAndGoToPostsPage();
          })
          .catch((error) => {
            console.error("Ошибка при добавлении поста:", error);
          });
      } catch (error) {
        console.error(error);
        alert("Ошибка чтения файла.");
      }
    });
    // Клик по кнопке "назад"
    document.getElementById("back-button").addEventListener("click", () => {
      goToPage(POSTS_PAGE);
    });
  };
  render();
}















//     appEl.innerHTML = appHtml;

//     const fileUpload = appEl.querySelector(".file-upload-input");

//     fileUpload.addEventListener("change", (event) => {
//       if (event.target.files.length > 0) {
//         selectedFile = event.target.files[0];
//         console.log("Вы выбрали:", selectedFile);
//       } else {
//         console.log("Файл не выбран");
//       }
//     });

//     const descriptionTextarea = appEl.querySelector(".input.textarea");

//     document.getElementById("add-button").addEventListener("click", async () => {
//       if (!selectedFile) {
//         alert('Пожалуйста, выберите файл.');
//         return;
//       }

//       try {
//         const imageDataURL = await readFileAsDataURL(selectedFile);
//         onAddPostClick({
//           description: descriptionTextarea.value,
//           imageUrl: imageDataURL,
//         });
//         updatePostsAndGoToPostsPage();
//     } catch (error) {
//         console.error(error);
//         alert("Ошибка чтения файла.");
//       }
//     });

//     document.getElementById("back-button").addEventListener("click", () => {
//       goToPage(POSTS_PAGE);
//     });
//   };

//   render();
// }





// // Запоминаем элемент input с типом 'file'
// const fileUpload = appEl.querySelector(".file-upload-input");

// // При изменении элемента input, сохраняем выбранный файл и выполняем дополнительные действия
// fileUpload.addEventListener("change", (event) => {
//   if (event.target.files.length > 0) {
//     selectedFile = event.target.files[0];
//     console.log("Вы выбрали:", selectedFile);
    
//     // Выполняйте действия по загрузке файла, если это требуется
//     // onImageSelected(selectedFile);
//   } else {
//     console.log("Файл не выбран");
//   }
// });

// // Получаем элемент textarea для описания
// const descriptionTextarea = appEl.querySelector(".input.textarea");

// document.getElementById("add-button").addEventListener("click", () => {
//   // Добавьте обработку выбранного файла (URL/байтовый образ)
//   // перед тем, как вызывать функцию onAddPostClick

//   onAddPostClick({
//     description: descriptionTextarea.value, // Описание из textarea
//     imageUrl: null, // Замените null на реальный URL или байтовый образ файла после обработки/загрузки
//   });
// });

// // Вернуться на страницу постов
// document.getElementById("back-button").addEventListener("click", () => {
//   goToPage(POSTS_PAGE);
// });
// };

// render();
// }










//     document.getElementById("add-button").addEventListener("click", () => {
//       onAddPostClick({
//         description: "Описание картинки",
//         imageUrl: "https://image.png",
//       });
//     });

//     // Вернуться на страницу постов
//     document.getElementById("back-button").addEventListener("click", () => {
//       goToPage(POSTS_PAGE);
//     });
//   };

//   render();
// }
