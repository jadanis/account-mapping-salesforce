({
    doInit : function(component, event, helper){
        component.set('v.lcHost', window.location.hostname);
        console.log("Window Location " + window.location.hostname);
        window.addEventListener("message", function(event){
            
            if(event.data.state == 'LOADED'){
                component.set('v.vfHost', event.data.vfHost);
                helper.sendToVF(component, helper);
            }
        }, false);
    }
})
