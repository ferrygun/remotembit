var microBit;

var iconLeft = [
    ['0', '0', '0', '0', '0'],
    ['0', '1', '0', '1', '0'],
    ['0', '0', '0', '0', '0'],
    ['1', '0', '0', '0', '1'],
    ['0', '1', '1', '1', '0']
]

var iconRight = [
    ['0', '0', '0', '0', '0'],
    ['0', '1', '0', '1', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '1', '1', '1', '0'],
    ['1', '0', '0', '0', '1']
]

microBit = new uBit();

microBit.onConnect(function() {
    console.log("connected");

    document.getElementById("connected").innerHTML = "true";
    document.getElementById("properties").classList.toggle('inactive');

    const uuid = PubNub.generateUUID();
    const pubnub = new PubNub({
        publishKey: "pub-c-22ce5702-d155-4c4a-9f07-fe33baca9bc7",
        subscribeKey: "sub-c-e60ee6cc-81e4-11ea-8dff-bafe0457d467",
        uuid: uuid
    });

    pubnub.subscribe({
        channels: ['mbit'],
        withPresence: true
    });

    pubnub.addListener({
        message: function(event) {
            console.log(event.message.content);
			microBit.writeMatrixText(event.message.content);
        },

        presence: function(event) {
            console.log(event.uuid + " has joined. That's you!");
        }
    });

    microBit.setButtonACallback(function() {
        console.log("buttonA pressed");
    });

    microBit.setButtonBCallback(function() {
        console.log("buttonB pressed");
    });
});

microBit.onDisconnect(function() {
    console.log("disconnected");
    document.getElementById("connected").innerHTML = "false";
});

function searchDevice() {
    microBit.searchDevice();
}

microBit.onBleNotify(function() {
})


var ledMatrix = [
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0']
]

function updatePixel(x, y, value) {
    if (value) {
        ledMatrix[x][y] = 1;
    } else {
        ledMatrix[x][y] = 0;
    }
    microBit.writeMatrixIcon(ledMatrix);
}

function updateText() {
    text = document.getElementById("newText").value;
    console.log(text);
    microBit.writeMatrixText(text);
}