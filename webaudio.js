var WebAudio;

WebAudio = (function() {
  function WebAudio() {
    var ref;
    if ((window.AudioContext != null) || (window.webKitAudioContext != null)) {
      this.context = new ((ref = window.AudioContext) != null ? ref : window.webKitAudioContext);
      this.supported = true;
    } else {
      this.supported = false;
    }
  }

  WebAudio.prototype.writeStereo = function(samplesL, samplesR) {
    var buffer, bufferSize, i, j, left, ref, right, source;
    samplesL = new Float32Array(samplesL);
    samplesR = new Float32Array(samplesR);
    bufferSize = samplesL.length;
    buffer = this.context.createBuffer(2, bufferSize, 88200);//44100);
    if (buffer.copyToChannel != null) {
      buffer.copyToChannel(samplesL, 0);
      buffer.copyToChannel(samplesR, 1);
    } else {
      left = buffer.getChannelData(0);
      right = buffer.getChannelData(1);
      for (i = j = 0, ref = bufferSize; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        left[i] = samplesL[i] /// 32768;
        right[i] = samplesR[i] /// 32768;
      }
    }
    source = this.context.createBufferSource();
    source.buffer = buffer;
    source.connect(this.context.destination);
    if (source.start != null) {
      return source.start(0);
    } else {
      return source.noteOn(0);
    }
  };

  return WebAudio;

})();

window.WebAudio = WebAudio;
