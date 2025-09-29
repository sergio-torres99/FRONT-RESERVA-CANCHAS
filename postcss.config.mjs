// postcss.config.mjs

const config = {
  plugins: {
    // 1. Añadimos Tailwind CSS para procesar las directivas @tailwind
    'tailwindcss': {},
    
    // 2. Añadimos Autoprefixer para compatibilidad con navegadores
    'autoprefixer': {}, 
  },
};

export default config;