Package.describe({
    name: 'jwalker93:meteor-webcam',
    summary: 'Meteor webcam access and motion detection package.',
    version: '0.1.0',
    git: 'https://github.com/jonathon-walker/meteor-webcam.git'
});

Package.on_use(function (api) {
    api.versionsFrom("METEOR@0.9.0")

    api.use('tracker', 'client');
    api.add_files(['motiondetector.js', 'imagecomparer.js', 'stream.js', 'webcam.js'], 'client');
    api.export('Webcam', 'client');
});
