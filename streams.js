/**
 * Streams API
 *
 * Shim or polyfill implementation of the W3C Streams API.
 *
 * @link http://www.w3.org/TR/streams-api/
 */

self['StreamError'] = self['StreamError'] || function () {

  return StreamError;

  function StreamError() {

  }

}();

self['Stream'] = self['Stream'] || function () {

  Stream.prototype.close = close;

  return Stream;

  function Stream() {
    this.type = "";
  }

  /**
   * Closes the stream.
   *
   * This method should close the Stream and not allow any future reads. This is done by returning on the next and subsequent reads with no data. This is an irreversible and non-idempotent operation; once a Stream has been closed, it cannot be used again; dereferencing a Stream URI bound to a Stream object on which close has been called results in a 500 Error.
   */
  function close() {
    this._closed = true;
  }

}();

self['StreamReader'] = self['StreamReader'] || function() {
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
    this.readyState = StreamReader.EMPTY;
    this.result = null;
    this.error = null;
    
    this.onloadstart = null;
    this.onprogress = null;
    this.onload = null;
    this.onabort = null;
    this.onerror = null;
    this.onloadend = null;
  }

  /**
   *
   * @link http://www.w3.org/TR/streams-api/#widl-StreamReader-readAsBlob-void-Stream-stream-unsigned-long-long-maxSize
   */
  function readAsBlob(stream, maxSize) {
    
  }

  /**
   *
   * @link http://www.w3.org/TR/streams-api/#widl-StreamReader-readAsArrayBuffer-void-Stream-stream-unsigned-long-long-maxSize
   * @link http://www.w3.org/TR/FileAPI/#readAsArrayBuffer
   */
  function readAsArrayBuffer(stream, maxSize) {
    var event;

    // If maxSize is less than one, throw an Invalid Argument exception. Terminate these overall steps.
    if (maxSize < 1) {
      throw new Error("Invalid Argument");
    }
    // If readyState = LOADING throw an InvalidStateError exception [DOM4] and terminate these steps.
    if (this.readyState === StreamReader.LOADING) {
      throw new Error("InvalidStateError");
    }
    // If the blob has been neutered through the close method, throw an InvalidStateError exception [DOM4] and terminate this algorithm.
    if (stream._closed) {
      throw new Error("InvalidStateError");
    }
    
    // If an error occurs during reading the blob parameter, set readyState to DONE and set result to null. Proceed to the error steps.
    // If no error has occurred, set readyState to LOADING
    this.readyState = StreamReader.LOADING;
    
    // Fire a progress event called loadstart.
    if (this.onloadstart) this.onloadstart(event = new ProgressEvent('loadstart'), event.target = this, event);
    
    // Return the readAsArrayBuffer() method, but continue to process the steps in this algorithm.
    var self = this;
    setTimeout(function() {
      stream._read(maxSize, function(data) {
        self.result = new Uint8Array(data).buffer;

        // Set readyState to DONE.
        self.readyState = StreamReader.DONE;

        // Fire a progress event called load.
        if (self.onload) self.onload(event = new ProgressEvent('load'), event.target = self, event);
        
        // Fire a progress event called loadend.
        if (self.onloadend) self.onloadend(event = new ProgressEvent('loadend'), event.target = self, event);
      });
    }, 1);
  }

  function readAsText(stream, encoding, maxSize) {
    
  }

  function readAsDataURL(stream, maxSize) {
    
  }

  /**
   *
   * @link http://www.w3.org/TR/streams-api/#widl-StreamReader-abort-void
   * @link http://www.w3.org/TR/FileAPI/#abort
   */
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
    
    // Fire a progress event called abort.
    if (this.onabort) {
      this.onabort();
    }
    // Fire a progress event called loadend.
    if (this.readyState !== StreamReader.LOADING) {
      if (this.onloadend) {
        this.onloadend();
      }
    }
  }

}();

self['StreamBuilder'] = self['StreamBuilder'] || function() {
  
  StreamBuilderStream.prototype = Object.create(Stream.prototype);
  StreamBuilderStream.prototype._read = _read;

  StreamBuilder.prototype.append = append;
  StreamBuilder.prototype.close = close;

  return StreamBuilder;
  
  function StreamBuilderStream() {
    this._data = [];
  }
  
  // http://www.w3.org/TR/streams-api/#reads-on-a-stream-from-streambuilder
  function _read(size, callback) {
    // If there is enough data available to satisfy the amount requested in the read, return the amount specified. The data should be returned in the order the data was appended.
    if (this._builder.availableDataSize >= size) {
      // Update the value of availableDataSize.
      this._builder.availableDataSize -= size;
      callback(this._data.splice(0, size));
    }
    // If there is not enough data available to satisfy the amount requested in the read:
    else if (2) {
      // If the Stream has been closed, return all the data available, and set availableDataSize to zero.
      if (this._closed) {
        this._builder.availableDataSize = 0;
        callback(this._data.splice(0, this._data.length));
      }
      // Else, keep the request pending and do not return until there is enough data available to satisfy the requset.
      else {
        if (this._builder.onthresholdreached) {
          var ads;
          do {
            ads = this._builder.availableDataSize;
            this._builder.onthresholdreached();
            // TODO this is not according to spec!
            if (this._builder.availableDataSize == ads) {
              this.close();
            }
          }
          while(!this._closed && this._builder.availableDataSize < size);
          //console.log('data', this._builder.availableDataSize, this._data);
          this._builder.availableDataSize -= size;
          callback(this._data.splice(0, size));
        }
      }
    }
  }

  function StreamBuilder(contentType, thresholdLimit) {
    this.availableDataSize = 0;

    this.stream = new StreamBuilderStream();
    this.stream.type = contentType;
    
    this.stream._builder = this;
  }

  function append(data) {
    var i;

    if (this.stream._closed) {
      throw new StreamError();
    }
    
    if (typeof data == 'string' || data instanceof String) {
      for (i = 0; i < data.length; ++i) {
        this.stream._data.push(data.charCodeAt(i));
      }
    }
    else if (data instanceof Blob) {
      
    }
    else if (data instanceof ArrayBuffer) {
      var view = new Uint8Array(data);
      for (i = 0; i < view.length; i++) {
        this.stream._data.push(view[i]);
      }
    }
    else {
      throw new Error();
    }
    this.availableDataSize = this.stream._data.length;
  }

  function close() {
    this.stream.close();
  }

}();
