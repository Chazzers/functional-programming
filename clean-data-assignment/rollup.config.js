import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import copy from 'rollup-plugin-copy';

export default {
	input: 'src/js/index.js',
	output: {
		file: 'dist/scripts/bundle.js',
		format: 'iife',
		name: 'bundle',
	},
	plugins: [
		babel({
			exclude: 'node_modules/**'
		}),
		resolve({
			main: true,
			browser: true
		}),
		json(),
		commonjs(),
		terser(),
		serve({
			open: true,
			contentBase: 'dist',
			host: 'localhost',
			port: 5000
		}),
		copy({
			targets: [
				{
					src: 'src/*.html', dest: 'dist'
				},
				{
					src: 'src/styles/*.css', dest: 'dist/styles'
				},
				{
					src: 'src/data/*.csv', dest: 'dist/data'
				}
			]
		})
	]
}
