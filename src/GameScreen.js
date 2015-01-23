
import ui.View as View;
import ui.TextView as TextView;
import src.SoundController as SoundController;
import ui.resource.Image as Image;
import src.ParallaxView as ParallaxView;
import ui.ImageView as ImageView;
import src.Physics as Physics;
import animate;

var first = true;

var defaults = {
	backgroundColor: 'orange'
};

var timeout = 3;

var legalWife = new Image({
	url: 'resources/images/gamescreen/legal_wife.png'
});

var threeWives = new Image({
	url: 'resources/images/gamescreen/three_wives.png'
});

function d2r(deg) {
	return deg * (Math.PI / 180);
}

exports = Class(View, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, defaults);
		supr(this, 'init', [opts]);

		this.style.anchorX = this.style.width / 2;
		this.style.anchorY = this.style.height / 2;
		this.style.r = d2r(180);

		this.sound = SoundController.getSound();

		this.build();

	};

	this.build = function () {

		this.setupParallaxView();
		this.setupPlayer();

		this.timer = new TextView({
			x: (this.style.width - 100) / 2,
			y: (this.style.height - 150) / 2,
			width: 100,
			height: 150,
			anchorX: 50,
			anchorY: 75,
			r: d2r(90),
			superview: this
		});

		this.on('game:start', bind(this, function () {

			var timeOut = bind(this, function () {
				if(--timeout >= 0)
					setTimeout(timeOut, 1000);
				else 
					this.startGame();
			});

			setTimeout(timeOut, 1000);

		}));

	};

	this.startGame = function () {
		this.sound.play('catchme', {
			loop: true
		});
		animate(this.parallaxView).commit();
		this.parallaxView.scrollTo(0,0);
		this.parallaxView.clear();
		this.gameLayer.addSubview(this.player);
		this.player.setPosition(0, 0);
		this.player.setVelocity(100, 0);
		this.player.setAcceleration(5, 0);
		Physics.start();
	};

	this.setupParallaxView = function () {
		this.parallaxView = new ParallaxView({
			width: this.style.width,
			height: this.style.height,
			superview: this
		});

		this.gameLayer = this.parallaxView.addLayer({
			distance: 10,
			populate: bind(this, function (layer, x) {
				if(first) {
					first = false;
					return this.style.width;
				}
				var y = (Math.random() * this.style.height);
				var heart = layer.obtainView(ImageView, {
					x: x,
					y: y < 50 ? y : y - 50,
					width: 50,
					height: 50,
					anchorX: 25,
					anchorY: 25,
					r: d2r(90),
					image: legalWife,
					superview: layer
				});
				heart.on('InputStart', bind(this, function () {
					heart.setImage(threeWives);
				}));
				return heart.style.width;
			})
		});

	};

	this.setupPlayer = function () {
		this.player = new View({
			x: 0,
			y: 0,
			width: 10,
			height: 10,
			backgroundColor: '#000',
			zIndex: 9999
		});
		Physics.addToView(this.player);
	};

	this.tick = function () {
		if(timeout >= 0)
			this.timer.setText(timeout);
		else {
			this.timer.style.visible = false;
			this.gameLayer.scrollTo(this.player.getLeft() - this.style.width, 0);
		}
	};

});
