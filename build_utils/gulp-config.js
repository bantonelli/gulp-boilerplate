module.exports = {
    html: {
        src: "./public/*.html",
        distDir: "./public/*.html"
    },
    styles: {
        src: "./src/styles/*.scss",
        srcDir: "./src/styles/**/*.scss",
        dest: "./public/styles",
        autoprefixer: {
            browsers: ["last 20 versions"]
        } 
    },
    scripts: {
        src: "./src/scripts/**/*.js",
        dest: "./public/scripts",
        bundle: 'app.js'
    }
};