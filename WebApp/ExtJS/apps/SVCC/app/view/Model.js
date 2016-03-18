Ext.define('ConfApp.view.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        isAdmin: false
    },

    stores: {
        speakerListByNameSVCC: {
            model: 'Speaker',
            autoLoad: true,
            filters: [
                function(item) {
                    return true;
                    var inConference = false;
                    item.getData().sessions.map(function(session){
                        if (session.tenantName == "SVCC"){
                            inConference = true;
                        }
                    });
                    return inConference;
                }
            ]
        }
    }

});