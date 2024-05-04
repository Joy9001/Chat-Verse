// import "emoji-picker-element";

let msg_input = document.getElementById("msg-input");
let emoji_popup_btn = document.getElementById("emoji-popup-btn");
let emoji_popup = document.getElementById("emoji-popup");
let emoji_picker = document.querySelector("emoji-picker");

emoji_popup_btn.addEventListener("click", () => {
    if (emoji_popup.classList.contains("hidden")) {
        emoji_popup.classList.remove("hidden");
        emoji_popup_btn.classList.add("active");
    } else {
        emoji_popup.classList.add("hidden");
        emoji_popup_btn.classList.remove("active");
    }
});

document.addEventListener("click", (event) => {
    if (!emoji_popup_btn.contains(event.target) && !emoji_popup.contains(event.target)) {
        if (!emoji_popup.classList.contains("hidden")) {
            emoji_popup.classList.add("hidden");
            emoji_popup_btn.classList.remove("active");
        }
    }
});

emoji_picker.addEventListener('emoji-click', (event) => {
    msg_input.value += event.detail.unicode;
});

// overlay.addEventListener('click', () => {
//     emoji_popup.classList.add("hidden");
//     overlay.classList.add("hidden");
// })