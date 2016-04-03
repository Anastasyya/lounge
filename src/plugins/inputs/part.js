var _ = require("lodash");
var Msg = require("../../models/msg");

exports.commands = ["close", "leave", "part"];
exports.allowDisconnected = true;

exports.input = function(network, chan, cmd, args) {
	if (chan.type === "lobby") {
		this.emit("msg", {
			chan: chan.id,
			msg: new Msg({
				type: Msg.Type.ERROR,
				text: "You can not part from networks, use /quit instead."
			})
		});
		return;
	}

	var irc = network.irc;
	if (irc && chan.type === "channel") {
		irc.part(chan.name, args.join(" "));
	}

	network.channels = _.without(network.channels, chan);
	this.emit("part", {
		chan: chan.id
	});

	return true;
};
