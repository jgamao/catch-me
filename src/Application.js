import ui.TextView as TextView;
import device;
import ui.StackView as StackView;

import src.TitleScreen as TitleScreen;
import src.GameScreen as GameScreen;

var boundsWidth = 576;
var boundsHeight = 1024;

var baseWidth = boundsWidth; //576
var baseHeight =  device.screen.height * (boundsWidth / device.screen.width); //864
var scale = device.screen.width / baseWidth; //1

exports = Class(GC.Application, function() {
    this.initUI = function() {
    
        this.view.style.scale = scale;

        var stackView = new StackView({
            width: baseWidth,
            height: baseHeight,
            superview: this.view,
            x: 0,
            y: 0
        });

        var titleScreen = new TitleScreen({
            width: baseWidth,
            height: baseHeight
        });

        var gameScreen = new GameScreen({
            width: baseWidth,
            height: baseHeight
        });

        titleScreen.on('game:start', bind(this, function () {
            stackView.push(gameScreen)
        }));

        gameScreen.on('game:end', bind(this, function () {
            stackView.pop();
        }));

        stackView.push(titleScreen);

    };
    this.launchUI = function() {};
});
