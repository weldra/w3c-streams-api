W3C Streams API
===============

Polyfill or shim for the [Streams API](http://www.w3.org/TR/streams-api/).

## Example

Building a stream using `StreamBuilder`.

    var builder, i = 0;

    builder = new StreamBuilder("text/plain", 1024);
    builder.onthresholdreached = function() {
      var data;
    
      if (i++ < 10) {
        console.debug('builder.onthresholdreached append');
        
        // Create some data for the stream.
        data = new Uint8Array(2048);
        
        builder.append(data.buffer);
      }
      else{
        console.debug('builder.onthresholdreached close');
        builder.close();
      }
    };

Reading a stream using `StreamReader`.

    var reader;
    
    reader = new StreamReader();
    reader.onprogress = function() {
      debug('reader.onprogress');
    };
    reader.onload = function() {
      console.debug('reader.onload', reader.result);
      if (reader.result.byteLength < 1024) {
        console.debug('reader.onload end of stream');
        console.log('done reading the stream');
      }
      else {
        console.debug('reader.readAsArrayBuffer');
        reader.readAsArrayBuffer(builder.stream, 1024);
      }
      
    };
    reader.onerror = function() {
      console.debug('reader.onerror');
    };
    
    // Read the builder's stream in blocks of 1024 bytes.
    console.log('start reading the stream');
    reader.readAsArrayBuffer(builder.stream, 1024);
