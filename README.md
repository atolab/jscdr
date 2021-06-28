[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/jscdr/badge)](https://www.jsdelivr.com/package/npm/jscdr)
[![License](https://img.shields.io/badge/License-EPL%202.0-blue)](https://choosealicense.com/licenses/epl-2.0/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# jscdr

A DDS-CDR encoder/decoder library in Javascript.

CDR stands for the O.M.G.'s Common Data Representation that is used in DDS (Data Distributed Service) implementations.
It's specified by https://www.omg.org/spec/DDSI-RTPS/2.3/PDF (chapter 10) and https://www.omg.org/cgi-bin/doc?formal/02-06-51.

In the current version, this library only handles the basic types.
It doesn't include an IDL compiler generating Javascript encoder/decoder for complex types.



## Usage

Add the following to your HTML page:
```html
<script src="https://cdn.jsdelivr.net/npm/jscdr@0.0.2/dist/index.umd.js"></script>
```

Assuming a DDS type is defined with the following IDL:
```c
module HelloWorldData
{
  struct Msg
  {
    long userID;
    string message;
  };
  #pragma keylist Msg userID
};
```

The code to encode such type will be:
```js
var m = Msg(1, "Hello World!");

var writer = new CDRWriter();
writer.writeInt32(m.userId);
writer.writeString(m.message);

// get the resulting dcodeIO.ByteBuffer
var byteBuffer = writer.buffer;
```

The code to decode such type will be:
```js
// Get a dcodeIO.ByteBuffer of bytes to decode
var byteBuffer = ...;

CDRReader reader = new CDRReader(byteBuffer);
var userId = reader.readInt32();
var message = reader.readString();
var m = new HelloWorldData.Msg(userId, message);
```
