/** @type {import('tailwindcss').Config} */

export default {
    content: ['./client/**/*.{js,ejs}'],
    theme: {
        fontFamily: {
            operatorMono: ['Operator Mono', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', 'Apple Color Emoji', 'sans-serif'],
            roboto: ['Roboto', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', 'Apple Color Emoji', 'sans-serif'],
            rubik: ['Rubik', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', 'Apple Color Emoji', 'sans-serif'],
            dm: ['DM Sans', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', 'Apple Color Emoji', 'sans-serif'],
        },
        extend: {
            translate: ['group-hover'],
            spacing: {
                13: '3.25rem',
                18: '4.5rem',
                19: '4.75rem',
                22: '5.5rem',
                46: '11.5rem',
                58: '14.5rem',
                100: '25rem',
            },
            backgroundImage: {
                backImage: "url('../public/assets/pexel1.jpg')",
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
                themeLilac: {
                    ...require('daisyui/src/theming/themes')['cupcake'],
                    primary: '#6f87af',
                    secondary: '#ce83a3',
                    accent: '#dde3da',
                    neutral: '#c297ce',
                    'base-100': '#ffffff',
                },
            },
        ],
    },
}
