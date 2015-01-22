
import ui.View as View;

var defaults = {
	backgroundColor: 'orange'
};

exports = Class(View, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, defaults);
		supr(this, 'init', [opts]);

		this.build();

	};

	this.build = function () {

		this.on('InputSelect', bind(this, function () {
			this.emit('game:end');
		}));

	};

});