({
    getAccountList : function(component, helper){
        var action = component.get('c.getAccounts');
        action.setParams({
            lat : component.get('v.lat'),
            lon : component.get('v.lon'),
            distance : component.get('v.distance')
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state: ' + state);
            if(state == "SUCCESS"){
                var ret = response.getReturnValue();
                if(ret.length > 0){
                    console.log('Return greater than 0');
                    var mapOptionsCenter = {"lat":parseFloat(component.get('v.lat')), "lng":parseFloat(component.get('v.lon'))};
                    var mapData = Array();
                    for(var i=0; i<ret.length; i++){
                        mapData.push({"lat":parseFloat(ret[i].BillingLatitude), "lng":parseFloat(ret[i].BillingLongitude), "markerText":ret[i].Name, "rId":ret[i].Id});
                    }
                    component.set('v.mapOptionsCenter', mapOptionsCenter);
                    component.set('v.mapData', mapData);
                    component.set('v.acc',ret);
                }
            }
        });
        
        $A.enqueueAction(action);
    },
    
    resetMap : function(component, event, helper){
        component.set("v.body",[]);
        $A.createComponent(
            'c:GoogleMap', 
            {mapOptions:component.get("v.mapOptions"), mapOptionsCenter:component.get("v.mapOptionsCenter"), mapData:component.get("v.mapData"), recordId:component.get("v.recordId")},
            function(newComponent, status, errorMessage){
                if(status === "SUCCESS"){
                    var body = component.get("v.body");
                    body.push(newComponent);
                    component.set("v.body",body);
                } else if (status === "INCOMPLETE"){
                    console.log("No response from server or client is offline");
                } else if(status === "ERROR"){
                    console.log("Error: "+errorMessage);
                }
            }
        );
    }
    
})
