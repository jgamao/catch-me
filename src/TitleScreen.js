
import ui.View as View;
import ui.ImageView as ImageView;
import ui.resource.Image as Image;

var defaults = {
	backgroundColor: 'pink'
};

function d2r (deg) {
	return deg * (Math.PI / 180);
}

exports = Class(View, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, defaults);
		supr(this, 'init', [opts]);
		this.build();

	};

	this.build = function () {

		var image = new Image({
			url: 'resources/images/titlescreen/catchme.jpg'
		});

		// var x = 100, 
		// 	width = this.style.width - (100 + 100), 
		// 	height = (width / image.getWidth()) * image.getHeight(), 
		// 	y = (this.style.height - height) / 2;

		var y = 100,
			height = this.style.height - 200,
			width = (height / image.getHeight()) * image.getWidth(),
			x = (this.style.width - width) / 2;

		// var y = 200,
		// 	height = this.style.height - 400,
		// 	width = (height / image.getHeight()) * image.getWidth(),
		// 	x = (this.style.width - width) / 2

		var catchme = new ImageView({
			x: x,
			y: y,
			image: image,
			superview: this,
			width: width,
			height: height,
			anchorX: width / 2,
			anchorY: height / 2,
			r: d2r(-90)
		});

		catchme.on('InputSelect', bind(this, function () {
			this.emit('game:start');
		}));
	};

});
