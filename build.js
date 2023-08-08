const { execSync } = require("child_process")
const esbuild = require("esbuild")
const path = require("path")
const { Generator } = require('npm-dts');

new Generator({
	entry: path.resolve(__dirname, "stories/index.ts"),
	output: path.resolve(__dirname, 'dist/index.d.ts'),
	tsc: "--emitDeclarationOnly --project tsconfig.lib.json"
}).generate();

// Run TypeScript to generate type declarations using the new tsconfig.lib.json
execSync("tsc --emitDeclarationOnly --project tsconfig.lib.json", { stdio: "inherit" })

// Build script using esbuild
esbuild
	.build({
		entryPoints: [path.resolve(__dirname, "stories/index.ts")],
		bundle: true,
		platform: "browser",
		target: ["es6"],
		//HACK outfile: "dist/index.js,"
		outdir: path.resolve(__dirname, "dist"),
		sourcemap: true,
		external: [
			"react",
			"react-dom",
			"@floating-ui/react",
			"@headlessui/react",
			"@headlessui/tailwindcss",
			"@heroicons/react",
			"@tabler/icons",
			"@tabler/icons-react",
			"classnames",
			"react",
			"react-dom",
			"react-icons"
		],
		format: "esm"
	})
	.catch(() => process.exit(1))
