/**
 * Streams API
 *
 * Shim or polyfill implementation of the W3C Streams API.
 *
 * @link http://www.w3.org/TR/streams-api/
 */


self.StreamError = self.StreamError || function () {

  return StreamError;

  function StreamError() {

  }

}();

self.Stream = self.Stream || function () {

  Stream.prototype.close = close;

  return Stream;

  function Stream() {

  }

  function close() {

  }

}();

self.StreamReader = self.StreamReader || function() {
  Object.defineProperties(StreamReader, {
    "EMPTY": { value: 0 },
    "LOADING": { value: 1 },
    "DONE": { value: 2 }
  });

  StreamReader.prototype.readAsBlob = readAsBlob;
  StreamReader.prototype.readAsArrayBuffer = readAsArrayBuffer;
  StreamReader.prototype.readAsText = readAsText;
  StreamReader.prototype.readAsDataURL = readAsDataURL;
  StreamReader.prototype.abort = abort;

  return StreamReader;

  function StreamReader(contentType, thresholdLimit) {
    this.readyState = 0;
  }

  function readAsBlob(stream, maxSize) {

  }

  function readAsArrayBuffer(stream, maxSize) {

  }

  function readAsText(stream, encoding, maxSize) {

  }

  function readAsDataURL(stream, maxSize) {

  }

  function abort() {

  }

}();

self.StreamBuilder = self.StreamBuilder || function() {

  StreamBuilder.prototype.append = append;
  StreamBuilder.prototype.close = close;

  return StreamBuilder;

  function StreamBuilder(contentType, thresholdLimit) {

  }

  function append(data) {

  }

  function close() {

  }

}();
