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
    this._closed = true;
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

  function StreamReader() {
    this.readyState = 0;
  }

  function readAsBlob(stream, maxSize) {
    if (this.onloadstart) {
      this.onloadstart();
    }
  }

  function readAsArrayBuffer(stream, maxSize) {
    if (this.onloadstart) {
      this.onloadstart();
    }
  }

  function readAsText(stream, encoding, maxSize) {
    if (this.onloadstart) {
      this.onloadstart();
    }
    this.result = stream._data;
    if (!error && !aborted && this.onload) {
      this.onload();
    }
    
    if (!aborted) {
      
    }
  }

  function readAsDataURL(stream, maxSize) {
    if (this.onloadstart) {
      this.onloadstart();
    }
  }

  function abort() {
    // If readyState = EMPTY or if readyState = DONE set result to null and terminate this overall set of steps without doing anything else.
    if (this.readyState === StreamReader.EMPTY || this.readyState === StreamReader.DONE) {
      this.result = null;
    }
    // If readyState = LOADING set readyState to DONE and result to null.
    if (this.readyState === StreamReader.LOADING) {
      this.readyState = StreamReader.DONE;
      this.result = null;
    }
    // If there are any tasks from the object's FileReader task source in one of the task queues, then remove those tasks.
    
    // Terminate the algorithm for the read method being processed.
    
    // Fire a progress event called abort
    if (this.onabort) {
      this.onabort();
    }
    // Unless readyState is LOADING fire a progress event called loadend. If readyState is LOADING do NOT fire loadend.
    if (this.readyState !== StreamReader.LOADING) {
      if (this.onloadend) {
        this.onloadend();
      }
    }
  }

}();

self.StreamBuilder = self.StreamBuilder || function() {

  StreamBuilder.prototype.append = append;
  StreamBuilder.prototype.close = close;

  return StreamBuilder;

  function StreamBuilder(contentType, thresholdLimit) {
    this.stream = new Stream();
    this.stream.type = contentType;
  }

  function append(data) {
    if (this.stream._closed) {
      throw new StreamError();
    }
    
    if (data instanceof String) {
      this.stream._data.push(data);
    }
    else if (data instanceof Blob) {
      
    }
    else if (data instanceof ArrayBuffer) {
      
    }
    else {
      throw new Error();
    }
  }

  function close() {
    this.stream.close();
  }

}();
