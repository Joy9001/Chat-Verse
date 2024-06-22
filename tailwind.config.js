/** @type {import('tailwindcss').Config} */

export default {
    content: ['./**/*.{html,js,ejs}'],
    theme: {
        fontFamily: {
            operatorMono: [
                'Operator Mono',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
                'Noto Color Emoji',
                'Apple Color Emoji',
                'sans-serif',
            ],
        },
        extend: {
            translate: ['group-hover'],
            spacing: {
                13: '3.25rem',
                18: '4.5rem',
                19: '4.75rem',
                22: '5.5rem',
                58: '14.5rem',
                100: '25rem',
            },
            backgroundImage: {
                backImage: "url('../public/assets/bg-img.png')",
            },
            borderWidth: {
                1: '1px',
            },
            screens: {
                xxs: '400px',
                xs: '500px',
                '3xl': '1800px',
            },
        },
    },
    plugins: ['prettier-plugin-tailwindcss', require('daisyui')],
    daisyui: {
        themes: [
            {
                cupcake: {
                    ...require('daisyui/src/theming/themes')['cupcake'],
                    info: '#e9e9e9',
                },
            },
        ],
    },
}
