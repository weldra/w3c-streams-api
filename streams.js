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
    this.readyState = StreamReader.EMPTY;
  }

  /**
   *
   * @link http://www.w3.org/TR/streams-api/#widl-StreamReader-readAsBlob-void-Stream-stream-unsigned-long-long-maxSize
   */
  function readAsBlob(stream, maxSize) {
    // If maxSize is less than one, through an Invalid Argument exception. Terminate these overall steps.
    if (maxSize < 1) {
      throw new Error("Invalid Argument");
    }
    // If readyState is LOADING, raise a NOT_ALLOWED_ERR exception and terminate these steps.
    if (this.readyState === StreamReader.LOADING) {
      throw new Error("NOT_ALLOWED_ERR");
    }
    
    // If an error occurs during reading the stream parameter, set readyState to DONE and set result to null. Proceed to the error steps below.
    
    // If no error has occurred, set readyState to LOADING.
    this.readyState = StreamReader.LOADING;
    
    // Fire a progress event called loadstart.
    if (this.onloadstart) {
      this.onloadstart();
    }
    
    // Make progress notifications.
    
    // Continue reading on the Stream:
    // If the optional maxSize parameter has been set, set the readyState to DONE when the number of bytes read reaches MAX_SIZE or the stream has been fully read and the number of bytes is less than MAX_SIZE.
    if (maxSize) {
      
    }
    // If the optional parameter has not been set, set readyState to DONE when the stream has been fully read.
    else {
      
    }
    
    // Set the result attribute to be stream’s data content represented as a Blob; on getting, the result result returns the (complete) data of stream as a Blob.
    this.result = new Blob(data, { type: stream.type });

    // Terminate this overall set of steps.
  }

  /**
   *
   * @link http://www.w3.org/TR/streams-api/#widl-StreamReader-readAsArrayBuffer-void-Stream-stream-unsigned-long-long-maxSize
   * @link http://www.w3.org/TR/FileAPI/#readAsArrayBuffer
   */
  function readAsArrayBuffer(stream, maxSize) {
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
    if (this.onloadstart) {
      this.onloadstart();
    }
    
    // Return the readAsArrayBuffer() method, but continue to process the steps in this algorithm.
    var self = this;
    setTimeout(function() {
      stream._get(maxSize, function(data) {
        //console.log(data);
        self.result = new Uint8Array(data).buffer;
        self.readyState = StreamReader.DONE;

        if (self.onload) {
          self.onload();
        }
      });
    }, 1);
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

self.StreamBuilder = self.StreamBuilder || function() {

  StreamBuilder.prototype.append = append;
  StreamBuilder.prototype.close = close;

  return StreamBuilder;
  
  function StreamBuilderStream() {
    
  }

  function StreamBuilder(contentType, thresholdLimit) {
    this.availableDataSize = 0;

    this.stream = new Stream();
    this.stream.type = contentType;
    
    this.stream._builder = this;
    this.stream._data = [];
    
    // http://www.w3.org/TR/streams-api/#reads-on-a-stream-from-streambuilder
    this.stream._get = function(size, callback) {
      // If there is enough data available to satisfy the amount requested in the read, return the amount specified. The data should be returned in the order the data was appended.
      if (this._builder.availableDataSize >= size) {console.log('enough data');
        // Update the value of availableDataSize.
        this._builder.availableDataSize -= size;
        callback(this._data.splice(0, size));
      }
      // If there is not enough data available to satisfy the amount requested in the read:
      else if (2) {
        // If the Stream has been closed, return all the data available, and set availableDataSize to zero.
        if (this._closed) {console.log('stream closed');
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
              if (this._builder.availableDataSize == ads) {console.log('closed stream');
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
    };
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
