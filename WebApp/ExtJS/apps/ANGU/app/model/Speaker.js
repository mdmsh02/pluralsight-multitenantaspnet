Ext.define('ConfApp.model.Speaker', {
    extend: 'ConfApp.model.Base',
    requires: ['ConfApp.model.Base'],

    fields: [
        { name: 'id', type: 'int' },
        { name: 'firstName', type: 'string' },
        { name: 'lastName', type: 'string' },
        { name: 'sessions'}
    ],

    schema: {
        namespace: 'ConfApp.model',
        proxy: {
            type: 'rest',
            url: 'speaker.json',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    }

});
