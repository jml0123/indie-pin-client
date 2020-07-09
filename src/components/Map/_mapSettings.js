const _mapSettings = (map) =>{
      const size = 90;
      const pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),
       
      // get rendering context for the map canvas when layer is added to the map
      onAdd: function() {
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
      },
       
      // called once before every frame where the icon will be used
      render: function() {
        var duration = 1000;
        var t = (performance.now() % duration) / duration;
        
        var radius = (size / 2) * 0.3;
        var outerRadius = (size / 2) * 0.7 * t + radius;
        var context = this.context;
        
      // draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
        this.width / 2,
        this.height / 2,
        outerRadius,
        0,
        Math.PI * 2
      );
      context.fillStyle = 'rgba(125, 135, 242,' + (1 - t) + ')';
      context.fill();
       
      // draw inner circle
      context.beginPath();
      context.arc(
      this.width / 2,
      this.height / 2,
      radius,
      0,
      Math.PI * 2
      );
      context.fillStyle = 'rgba(242, 135, 125, 0.9)';
      context.strokeStyle = 'white';
      context.lineWidth = 2 + 4 * (1 - t);
      context.fill();
      context.stroke();
       
      // update this image's data with data from the canvas
      this.data = context.getImageData(
      0,
      0,
      this.width,
      this.height
      ).data;
        // continuously repaint the map, resulting in the smooth animation of the dot
        map.triggerRepaint();

        // return `true` to let the map know that the image was updated
        return true;
        }
      };


    map.on('load', function() {
        map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
        map.addLayer({
            id: 'artists-heat',
            type: 'heatmap',
            source: 'artists',
            maxzoom: 12,
            paint: {
              // increase weight as diameter breast height increases
              'heatmap-weight': {
                property: 'popularity',
                type: 'exponential',
                stops: [
                  [1, 0.33],
                  [62, 2]
                ]
              },
              // increase intensity as zoom level increases
              'heatmap-intensity': {
                stops: [
                  [1, 0.66],
                  [10, 5]
                ]
              },
              // assign color values be applied to points depending on their density
              'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(236,222,239,0)',
                0.2, 'rgb(208,209,230)',
                0.4, 'rgb(166,189,219)',
                0.6, 'rgb(103,169,207)',
                0.8, 'rgb(28,144,153)'
              ],
              // increase radius as zoom increases
              'heatmap-radius': {
                stops: [
                  [1, 5],
                  [3, 75]
                ]
              },
              // decrease opacity to transition into the circle layer
              'heatmap-opacity': {
                default: 1,
                stops: [
                  [0, 1],
                  [4.75, 0]
                ]
              },
            }
          }, 'waterway-label');
          map.addLayer({
            id: 'artists-point',
            type: 'circle',
            source: 'artists',
            minzoom: 2.88,
            paint: {
              // increase the radius of the circle as the zoom level and dbh value increase
              // Change this based on data
              "circle-radius": ['+', 12, ['number', ['get', 'popularity'], 12]],
              'circle-color': [
                'interpolate',
                ['linear'],
                ['get', 'popularity'],
                5,
                'rgba(103,169,207,0.1)',
                10,
                'rgba(33,102,172,0.5)',
                30,
                'rgb(103,169,207)',
                50,
                'rgb(209,229,240)',
                70,
                'rgb(253,219,199)',
                90,
                'rgb(239,138,98)',
              ],
              'circle-stroke-color': 'white',
              'circle-stroke-width': 1.33,
              'circle-opacity': {
                stops: [
                  [0, 0],
                  [4.5, 1]
                ]
              }
            }
          }, 'waterway-label');
    });
    map.on('mouseenter', 'artists-point', function(e) {
        map.getCanvas().style.cursor = 'pointer';
    })
   
}

module.exports = _mapSettings