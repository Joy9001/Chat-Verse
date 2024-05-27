import 'emoji-picker-element'

document.getElementById('emoji-popup-btn').addEventListener('click', () => {
    let emoji_popup_btn = document.getElementById('emoji-popup-btn')
    let emoji_popup = document.getElementById('emoji-popup')

    if (emoji_popup.classList.contains('hidden')) {
        emoji_popup.classList.remove('hidden')
        emoji_popup_btn.classList.add('active')
    } else {
        emoji_popup.classList.add('hidden')
        emoji_popup_btn.classList.remove('active')
    }
})

document.addEventListener('click', (event) => {
    let emoji_popup_btn = document.getElementById('emoji-popup-btn')
    let emoji_popup = document.getElementById('emoji-popup')

    if (!emoji_popup_btn.contains(event.target) && !emoji_popup.contains(event.target)) {
        if (!emoji_popup.classList.contains('hidden')) {
            emoji_popup.classList.add('hidden')
            emoji_popup_btn.classList.remove('active')
        }
    }
})

document.querySelector('emoji-picker').addEventListener('emoji-click', (event) => {
    document.getElementById('msg-input').value += event.detail.unicode
})

// overlay.addEventListener('click', () => {
//     emoji_popup.classList.add("hidden");
//     overlay.classList.add("hidden");
// })
