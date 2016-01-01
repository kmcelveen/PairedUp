//VideoStream uses $q in order to provide a video stream using getUserMedia. 
angular.module('myApp')
  .factory('VideoMediaStream', function ($q) {
    var stream;
    return {
      getMediaStream: function () {
        if (stream) {
          return $q.when(stream);
        } else {
          var d = $q.defer();
          //Once we invoke getUserMedia the browser will ask the user for permissions over his/her microphone and web cam

          //After we gain access to the video stream we cache it inside the stream variable, in order to not ask the user for web camera permissions each time we want to access it.
          navigator.getUserMedia({
            video: true,
            audio: true
          }, function (mediaObject) {
            stream = mediaObject;
            d.resolve(stream);
          }, function (error) {
            d.reject(error);
          });
          return d.promise;
        }
      }
    };
  });
