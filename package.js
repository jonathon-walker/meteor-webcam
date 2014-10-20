Package.describe({
    name: 'webcam',
    summary: 'Webcam package for Meteor.',
    version: '0.1.0'
});

Package.on_use(function (api) {
    api.use('tracker', 'client');
    api.add_files(['motiondetector.js', 'imagecomparer.js', 'stream.js', 'webcam.js'], 'client');
    api.export('Webcam', 'client');
});
