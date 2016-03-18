Ext.define('ConfApp.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'ConfApp.view.speakerlist.SpeakerList',
    ],

    xtype: 'app-main',

    controller: 'main',

    viewModel: {
        type: 'main'
    },

    //listeners: {
    //    afterrender: function() {
    //        console.log('controller.speakerlist:onAfterRender');
    //        if (ConfApp.global.Vars.showSpeakerPage){
    //            var tabPanel = this.down('tabpanel');
    //            tabPanel.add({
    //                title: 'Speakers',
    //                xtype: 'speakerlist'
    //            });
    //        }
    //    }
    //},



    layout: {
        type: 'border'
    },
    items: [
        {
            xtype: 'panel',
            region: 'north',
            html: '<div class="logoInfoBar">     <div class="logoWrap">         <a href="/">             <img src="/Content/SVCC/Images/silicon-valley-code-camp.png" alt="Silicon Valley Code Camp">         </a>     </div>     <div class="dateWrap">          October 3-4   2015     </div>     <div class="venueWrap">         <span class="name">Evergreen Valley College</span><br>         3095 Yerba Buena Rd<br>         San Jose, California   95135     </div> </div>',
            height: 100
        },
        {
            xtype: 'tabpanel',
            region: 'center',
            listeners: {
                afterrender: 'onAfterRender'
            },
            items: [
                {
                    title: 'Home',
                    autoScroll: true,
                    html: [
                        '<section id="middle">',
                        '    <div id="container">',
                        '        <div id="content" class="content">',
                        '            <h1 class="title">Welcome To Silicon Valley Code Camp</h1>',
                        '            <div style="margin-top: 10px; margin-bottom: 10px;">',
                        '                <p>',
                        '                    We live streamed the main theater at Evergreen Valley College on October 3rd and 4th, 2015. We are currently',
                        '                    encoding all of those videos and as they are finished, we will add them to the play list below. You can also see them on',
                        '                    our <a href="https://www.youtube.com/channel/UCl_fhwlTAARASHq2hoEd_pw">Silicon Valley Code Camp YouTube Channel</a> along with our',
                        '                    other videos.',
                        '                </p>',
                        '                <iframe width="600" height="337" src="https://www.youtube.com/embed/videoseries?list=PL7hKLAqgemJAFy70PvfCAyi_iJuJ7py7R" frameborder="0" allowfullscreen=""></iframe>',
                        '            </div>',
                        '            <p>',
                        '                Code Camp is a community event where developers learn from fellow developers. We also have developer',
                        '                related topics that include software branding, legal issues around software as well as other topics developers are',
                        '                interested in hearing about. All are welcome to attend and submit sessions for consideration.',
                        '            </p>',
                        '            <h2><strong>Free Sessions (Saturday and Sunday)</strong></h2>',
                        '            <p style="margin-top: 5px;margin-left: 10px">',
                        '                <a href="/Session">Sessions</a> will range from informal chalk talks to presentations.',
                        '                There will be a mix of presenters – some experienced folks and some that may be speaking in public for the first time.',
                        '                And we are expecting to see people from throughout the Northern',
                        '                California region and beyond.',
                        '            </p>',
                        '            <section class="contactInfo">',
                        '                <h2 class="hTitle">Code Camp Venue</h2>',
                        '',
                        '                <a href="https://www.google.com/maps/place/Evergreen+Valley+College,+3095+Yerba+Buena+Rd,+San+Jose,+CA+95135" target="_blank">',
                        '                    <img src="/Content/SVCC/Images/evergreenoverviewmap.png" width="200" height="230" alt="Evergreen Valley College Map">',
                        '                </a>',
                        '                <div>',
                        '                    <strong><a target="_blank" href="http://www.evc.edu/">Evergreen Valley College</a></strong> <br>',
                        '                    3095 Yerba Buena Rd<br>',
                        '                    San Jose, California   95135',
                        '                </div>',
                        '                <br><br>',
                        '                <p>',
                        '                    For More Information Contact<br>',
                        '                    <a href="mailTo:service@siliconvalley-codecamp.com">service@siliconvalley-codecamp.com</a>',
                        '                </p>',
                        '            </section>',
                        '        </div>',
                        '    </div>',
                        '</section>'
                    ]
                },
                //{
                //    title: 'Speakers',
                //    //html: '<b>SPEAKERS</b>'
                //    xtype: 'speakerlist'
                //},
                {
                    title: 'Sessions',
                    html: '<b>SESSIONS</b>'
                }
            ]
        }
    ]
});
