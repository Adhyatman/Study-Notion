import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // present in the React template
import tailwindcss from "@tailwindcss/vite"; // new Tailwind Vite plugin

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3000,
    },
});
