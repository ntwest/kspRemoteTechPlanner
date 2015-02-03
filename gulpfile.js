'use strict';

var gulp = require("gulp");
var sequence = require("run-sequence");

var connect = require("gulp-connect");
var shell = require("gulp-shell");
var rimraf = require("rimraf");
var targetConf = "kspRemoteTechPlannerTest/conf.js";

var minjs = require("gulp-uglify");
var mincss = require("gulp-minify-css");
var deployDir = "deploy/";
var sourceHTML = "kspRemoteTechPlanner/**/*.html";
var sourceJS = "kspRemoteTechPlanner/**/appOut.js";
var sourceCSS = "kspRemoteTechPlanner/**/app.css";

gulp.task("wdm-update",
    shell.task("webdriver-manager update")
);

gulp.task("server-start", function () {
    connect.server({
        root: "kspRemoteTechPlanner",
        port: 8080
    });
});

gulp.task("server-stop", function () {
    connect.serverClose();
});

gulp.task("protractor",
    shell.task("protractor " + targetConf, { ignoreErrors: true })
);

gulp.task("test", function (cb) {
    sequence(["wdm-update", "server-start"], "protractor", "server-stop", cb);
});

gulp.task("clean", function (cb) {
    rimraf(deployDir, cb);
});

gulp.task("copy-html", function () {
    return gulp.src(sourceHTML)
    .pipe(gulp.dest(deployDir));
});

gulp.task("minify-js", function () {
    return gulp.src(sourceJS)
    .pipe(minjs())
    .pipe(gulp.dest(deployDir));
});

gulp.task("minify-css", function () {
    return gulp.src(sourceCSS)
    .pipe(mincss())
    .pipe(gulp.dest(deployDir));
});

gulp.task("deploy", function (cb) {
    sequence("clean", ["copy-html", "minify-js", "minify-css"], cb);
});