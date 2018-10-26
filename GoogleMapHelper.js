({
    sendToVF : function(component, helper){
        var message = {
            "loadGoogleMap" : true,
            "mapData" : component.get('v.mapData'),
            "mapOptions" : component.get('v.mapOptions'),
            'mapOptionsCenter' : component.get('v.mapOptionsCenter')
        };
        helper.sendMessage(component, helper, message);
    },
    
    sendMessage : function(component, helper, message){
        message.origin = window.location.hostname;
        var vfWindow = component.find("vfFrame").getElement().contentWindow;
        message = JSON.parse(JSON.stringify(message));
        vfWindow.postMessage(message, component.get("v.vfHost"));
    }
    
})
