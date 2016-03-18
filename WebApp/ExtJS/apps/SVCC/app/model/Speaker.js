Ext.define('ConfApp.model.Speaker', {
    extend: 'ConfApp.model.Base',
    requires: [
        'ConfApp.model.Base',
        'Ext.data.proxy.Rest'
    ],

    fields: [
        { name: 'firstName', type: 'string' },
        { name: 'lastName', type: 'string' },
        { name: 'sessions'}
    ],

    schema: {
        namespace: 'ConfApp.model',
        proxy: {
            type: 'rest',
            url: 'speaker.json',
            //url: '/rest/speaker/extjswrapper',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    }
});
