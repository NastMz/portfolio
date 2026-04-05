import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	container: {
  		center: true,
  		padding: "2rem",
  		screens: {
  			"2xl": "1400px",
  		},
  	},
  	extend: {
		colors: {
			outline: '#777575',
			'on-secondary-container': '#e0c5fe',
			'on-error-container': '#ffb2b9',
			'primary-dim': '#ff51fa',
			'on-tertiary-fixed': '#003840',
			'primary-container': '#ff5af9',
			'inverse-surface': '#fcf8f8',
			'surface-dim': '#0e0e0e',
			'outline-variant': '#494847',
			'on-tertiary': '#005762',
			'secondary-fixed': '#e1c7ff',
			'primary-fixed-dim': '#ff1cfe',
			'surface-container': '#1a1919',
			error: '#ff6e84',
			'primary-fixed': '#ff5af9',
			'on-secondary-fixed-variant': '#5c4777',
			'on-primary': '#580058',
			'surface-bright': '#2c2c2c',
			'on-background': '#ffffff',
			'secondary-fixed-dim': '#d3b9f1',
			'on-tertiary-fixed-variant': '#005762',
			'on-tertiary-container': '#004d57',
			'surface-container-highest': '#262626',
			'on-surface-variant': '#adaaaa',
			'surface-container-high': '#201f1f',
			surface: '#0e0e0e',
			'tertiary-dim': '#00d4ec',
			'on-primary-fixed': '#000000',
			'on-secondary': '#4b3765',
			'on-secondary-fixed': '#3f2b58',
			'surface-tint': '#ff7cf5',
			'surface-variant': '#262626',
			'tertiary-fixed-dim': '#00d4ec',
			'on-error': '#490013',
			tertiary: '#81ecff',
			'error-dim': '#d73357',
			'secondary-container': '#523d6c',
			'surface-container-low': '#131313',
			'tertiary-container': '#00e3fd',
			'on-primary-fixed-variant': '#540054',
			'inverse-on-surface': '#565554',
			'surface-container-lowest': '#000000',
			'tertiary-fixed': '#00e3fd',
			'on-surface': '#ffffff',
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		},
		fontFamily: {
			headline: ['var(--font-space-grotesk)', 'sans-serif'],
			body: ['var(--font-inter)', 'sans-serif'],
			label: ['var(--font-jetbrains-mono)', 'monospace'],
		},
		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
  safelist: [
    { pattern: /from-*-*/ },
    { pattern: /to-*-*/ },
    { pattern: /border-l-*-*/ },
  ],
};
export default config;
