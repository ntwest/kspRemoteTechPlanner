﻿/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="model/body.ts" />
/// <reference path="model/bodydata.ts" />
/// <reference path="model/satellites.ts" />
/// <reference path="view/entireview.ts" />
// values
var body;
var satellites;

// Entire View
var stageEntire;
var viewEntire;

/*
// Day/Night View
var stageDayNight: createjs.Stage;
var shapesDayNight: createjs.Container;
var textsDayNight: createjs.Container;
var dayNightView: DayNightView;
*/
// startup
$(function () {
    init();
});

// method definitions
function init() {
    // init views
    stageEntire = new createjs.Stage($("canvas#entire")[0]);
    viewEntire = new EntireView(stageEntire, 10000, 800);

    /*
    stageDayNight = new createjs.Stage($("canvas#daynight")[0]);
    shapesDayNight = new createjs.Container();
    textsDayNight = new createjs.Container();
    stageDayNight.addChild(shapesDayNight);
    stageDayNight.addChild(textsDayNight);
    */
    // init values
    body = new Body();
    satellites = new Satellites();

    // init controls
    $("button#calculate").on("click", function (ev) {
        update();
    });

    update();
}

function update() {
    // update objects
    var b = BodyData.getBody($("select#body").val());
    body.name = b.name;
    body.color = b.color;
    body.radius = b.radius;
    body.gravitationalParameter = b.gravitationalParameter;
    satellites.body = body;
    satellites.count = parseInt($("input#count").val());
    satellites.altitude = parseFloat($("input#altitude").val());
    satellites.range = parseFloat($("input#range").val());

    // show objects
    viewEntire.show();
    stageEntire.update();
}
//# sourceMappingURL=app.js.map