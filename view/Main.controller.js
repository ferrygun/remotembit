/* eslint no-console: "error" */
sap.ui.define(['jquery.sap.global', 'sap/m/MessageToast', 'sap/ui/core/mvc/Controller', "sap/m/MessageBox"],
    function(jQuery, MessageToast, Controller, formatter, JSONModel, MessageBox) {
        jQuery.sap.require("view.lib.pubnub");
        "use strict";

        var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog({});

        const uuid = PubNub.generateUUID();
        const pubnub = new PubNub({
            publishKey: "pub-c-22ce5702-d155-4c4a-9f07-fe33baca9bc7",
            subscribeKey: "sub-c-e60ee6cc-81e4-11ea-8dff-bafe0457d467",
            uuid: uuid
        });


        var ControllerController = Controller.extend("view.Main", {



            onPress: function(evt) {

                var msg = this.getView().byId("msg").getValue();
                console.log(msg);

                pubnub.publish({
                    channel: "mbit",
                    message: {
                        "sender": uuid,
                        "content": msg
                    }
                }, function(status, response) {
                    console.log(response);
                    console.log(status);

                    if (status.error) {
                        console.log(status);

                        //Handle error here
                        jQuery.sap.require("sap.m.MessageToast");
                        sap.m.MessageToast.show("An error occured. Can't send the message.");
                    } else {
                        jQuery.sap.require("sap.m.MessageToast");
                        sap.m.MessageToast.show("Message has beent sent.");
                    }
                });
            }

        });

        return ControllerController;
    });