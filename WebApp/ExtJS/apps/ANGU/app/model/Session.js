Ext.define('ConfApp.model.Session', {
    extend: 'ConfApp.model.Base',
    requires: ['ConfApp.model.Base'],

    fields: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'interestCount', type: 'int' },
        { name: 'interestLevel', type: 'int' },
        { name: 'approved', type: 'bool' },
        { name: 'roomCapacity', type: 'int' }
    ],

    schema: {
        namespace: 'ConfApp.model',
        proxy: {
            type: 'rest',
            url: 'sessions.json',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    }

});
