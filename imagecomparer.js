ImageComparer = function(options) {
    var sensitivity = options.sensitivity || 40,
        width = options.width / 10,
        height = options.height / 10,
        temp1 = new ImageHelper(),
        temp2 = new ImageHelper();

    function compare(image1, image2) {
        if (!(image1 && image2)) {
            return;
        }

        temp1.prepareImageForComparison(image1);
        temp2.prepareImageForComparison(image2);

        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var pixel1 = temp1.pixelData(x, y);
                var pixel2 = temp2.pixelData(x, y);

                if (!comparePixel(pixel1, pixel2)) {
                    return false;
                }
            }
        }
        return true;
    };

    function comparePixel(pixel1, pixel2) {
        for (var i = 0; i < pixel1.length; i++) {
            var t1 = Math.round(pixel1[i] / 10) * 10;
            var t2 = Math.round(pixel2[i] / 10) * 10;

            if (t1 != t2) {
                if (t1 + sensitivity < t2 || t1 - sensitivity > t2) {
                    return false;
                }
            }
        }
        return true;
    }

    function ImageHelper() {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        return {
            prepareImageForComparison: function(image) {
                context.clearRect(0, 0, 100000, 100000);
                context.drawImage(image, 0, 0, width, height)
            },
            pixelData: function(x, y) {
                return context.getImageData(x, y, 1, 1).data;
            }
        };
    };

    return {
        compare: compare
    };
};
