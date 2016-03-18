Ext.define("ConfApp.view.speakerlist.SpeakerList", {
    "extend": "Ext.view.View",
    alias: 'widget.speakerlist',

    requires: [
    ],

    viewModel: {
        type: 'main'
    },

    bind: {
        store: '{speakerListByNameSVCC}'
    },

    tpl: [
        '<br/><h1 class="title">Presenters</h1>',
        '<tpl for="."',

        '<div class="speaker-wrap">',
        '<section class="listingBox speakerDetails">',
        '    <div class="listingMedia">',
        '        <img width="135" height="135" src="/Content/Images/Speakers/Speaker-{id}-75.jpg" >',
        '    </div>',
        '    <div class="listingInfo">',
        '        <header class="listingHeader">',
        '            <h2>{firstName} {lastName}</h2>',
        '            <h3>',
        '                <a href="{webSite}" target="_blank">{webSite}</a>',
        '            </h3>',
        '        </header>',
        '        <div class="listingDesc">',
        '            <p>{bio}</p>',
        '        </div>',
        '    </div>',
        '</section>	',
        '</div>',

        '</tpl>'
    ],
    autoScroll: true,
    itemSelector: 'div.speaker-wrap',
    emptyText: 'empty text here'
});
