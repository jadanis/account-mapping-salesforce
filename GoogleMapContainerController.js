({
    doInit : function(component, event, helper){
        var account = component.get("v.simpleRecord");
        var lat = account.BillingLatitude;
        var lon = account.BillingLongitude;
        console.log("Latitude is " + lat);
        console.log("Longitude is "+ lon);
        component.set("v.lat",lat);
        component.set("v.lon", lon);
		helper.getAccountList(component, helper);
        //helper.getContactList(component, helper);
    },
    
    refresh : function(component,event,helper){
        helper.getAccountList(component, helper);
        helper.resetMap(component, event, helper);
    }
})
