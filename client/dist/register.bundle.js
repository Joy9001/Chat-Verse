/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!***********************************************!*\
  !*** ./client/scripts/components/register.js ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
document.querySelector('#change-profilePic-btn').addEventListener('click', function () {
  var modalProfilePic = document.querySelector('#change-details-profilePic');
  var gender = document.querySelector('#change-details-gender option:checked').value;
  console.log(gender);
  fetch('/api/get-avatar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      gender: gender
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data.avatar);
    // console.log(modalProfilePic.src);
    modalProfilePic.src = data.avatar;
  })["catch"](function (error) {
    return console.log(error.message);
  });
});
document.querySelector('#register-btn').addEventListener('click', function () {
  var email = document.querySelector('#register-email').value;
  var password = document.querySelector('#register-password').value;
  var name = document.querySelector('#change-details-name').value;
  var username = document.querySelector('#change-details-username').value;
  var gender = document.querySelector('#change-details-gender option:checked').value;
  var avatar = document.querySelector('#change-details-profilePic').src;
  if (!email || !password) {
    var alert = "Email and password can't be empty";
    document.querySelector('#register-alert span').textContent = alert;
    document.querySelector('#register-alert').classList.remove('hidden');
    setTimeout(function () {
      document.querySelector('#register-alert').classList.add('hidden');
    }, 3000);
    return;
  }
  if (!name || !username || !gender || !avatar) {
    var _alert = 'Please fill all the details in the change details section';
    document.querySelector('#register-alert span').textContent = _alert;
    document.querySelector('#register-alert').classList.remove('hidden');
    setTimeout(function () {
      document.querySelector('#register-alert').classList.add('hidden');
    }, 3000);
    return;
  }
  fetch('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
      username: username,
      gender: gender,
      avatar: avatar
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
    if (data.error) {
      document.querySelector('#register-alert span').textContent = data.error;
      document.querySelector('#register-alert').classList.remove('hidden');
      return;
    }
    document.querySelector('#register-alert span').textContent = 'Registered successfully';
    document.querySelector('#register-alert').classList.remove('hidden');
    window.location.href = '/auth/login';
    setTimeout(function () {
      document.querySelector('#register-alert').classList.add('hidden');
    }, 10000);
  });
});
/******/ })()
;
//# sourceMappingURL=register.bundle.js.map