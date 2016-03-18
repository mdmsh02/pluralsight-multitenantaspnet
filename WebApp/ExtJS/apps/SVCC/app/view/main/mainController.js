Ext.define('ConfApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    onAfterRender: function(){
        console.log('controller.speakerlist:onAfterRender');
        if (ConfApp.global.Vars.showSpeakerPage){
            var tabPanel = this.getView().down('tabpanel');
            tabPanel.add({
                title: 'Speakers',
                xtype: 'speakerlist'
            });
        }

    }
});