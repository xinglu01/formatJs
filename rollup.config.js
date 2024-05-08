import ts from 'rollup-plugin-typescript2';
import server from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import terser from 'rollup-plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    input: './src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'es',
        sourcemap: true,
    },
    plugins: [
        ts(),
        isProduction && terser(),
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
        }),
    ],
};
