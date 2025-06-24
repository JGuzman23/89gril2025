// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import alpinejs from "@astrojs/alpinejs";
import playformInline from "@playform/inline";
import mdx from "@astrojs/mdx";
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
	site: "https://astropie.netlify.app",
	base: "/",
	// trailingSlash: 'always',
	integrations: [
		alpinejs(),
		playformInline({
			Beasties: true,
		}),
		mdx(),
	],
	output: "server",
	adapter: node({
    mode: 'standalone' // o 'middleware' si usas Express
  }),
	devToolbar: {
		enabled: false,
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
