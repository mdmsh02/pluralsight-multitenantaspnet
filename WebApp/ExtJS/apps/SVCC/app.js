Ext.application({
    name: 'ConfApp',

    extend: 'ConfApp.Application',

    requires: [
        'ConfApp.view.main.Main'
    ],

    launch: function() {

        Ext.define('ConfApp.global.Vars', {
            singleton: true,
            isAdmin: false,
            isLoggedIn: false,
            localTesting: true,
            showSpeakerPage: true
        });

        var loadMaskPanel = new Ext.panel.Panel({
            renderTo : document.body,
            title    : 'Loading Data...'
        });

        function createLayout() {
            Ext.create('Ext.container.Viewport',{
                layout: 'fit',
                items: [
                    Ext.create('ConfApp.view.main.Main')
                ]
            });
        }

        loadMaskPanel.show();
        if (ConfApp.global.Vars.localTesting){
            setTimeout(function(){
                loadMaskPanel.hide();
                createLayout();
            }, 3000);
        } else {

            Ext.Ajax.request({
                method: 'POST',
                params: {},
                url: '/rest/Account',
                success: function (xhr) {
                    var response = Ext.decode(xhr.responseText);
                    ConfApp.global.Vars.tenantName = response.TenantName;
                    ConfApp.global.Vars.showSpeakerPage = response.showSpeakerPage;
                    loadMaskPanel.hide();
                    createLayout();
                },
                failure: function () {
                    loadMaskPanel.hide();
                    Ext.Msg.alert("error", "Unable to load Account Information From Web Site");
                }
            });
        }

    }

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    //mainView: 'ConfApp.view.main.Main'

    //-------------------------------------------------------------------------
    // Most customizations should be made to ConfApp.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
