
import AudioManager;

exports.sound = null;

exports.getSound = function () {
	if (!exports.sound) {
		exports.sound = new AudioManager({
			path: 'resources/audio',
			files: {
				catchme: {
					path: 'music',
					background: true,
					volume: 0.5
				}
			}
		});
	}
	return exports.sound;
};
