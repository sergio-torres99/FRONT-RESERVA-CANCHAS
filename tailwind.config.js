// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
    // 1. RUTA DE CONTENIDO: CRUCIAL para que Tailwind genere las clases
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // 2. Mapeo de clases de Tailwind a variables CSS
                'primary': 'var(--color-primary)',
                'secondary': 'var(--color-secondary)',
                'info-blue': 'var(--color-info)',
                'background-light': 'var(--color-background)',

                // Colores de soporte y estado
                'text-dark': 'var(--color-text-dark)',
                'success': 'var(--color-success)',
                'danger': 'var(--color-danger)',
            },
        },
    },
    plugins: [],
}