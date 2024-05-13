import ts from 'rollup-plugin-typescript2';
import server from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import terser from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';


const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    input: './src/index.ts',
    output: [{
        file: 'dist/dist.es.js',
        format: 'es',
        sourcemap: true
    }, {
        file: 'dist/dist.cjs.js',
        format: 'cjs',
        sourcemap: true
    }, {
        file: 'dist/dist.umd.js',
        name: 'dist_umd',
        format: 'umd',
        sourcemap: true
    }],
    plugins: [
        ts(),
        isProduction && terser(),
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        server({
            port: 4000,
            open: true,
            contentBase: './src',
        }),
        livereload(),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: '> 0.25%, not dead', // 指定浏览器兼容性
                    },
                ],
            ],
        })
    ],
};
