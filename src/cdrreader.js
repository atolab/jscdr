import ByteBuffer from 'bytebuffer';

export class CDRReader {
    constructor(byteBuf) {
        this.buf = byteBuf;
        this.reprId = this.buf.readUint16();
        this.reprOpt = this.buf.readUint16();
        this.buf.LE((this.reprId & 0x0001) == 0x0001);
    }

    readByte() {
        return this.buf.readByte();
    }

    readBytes(count) {
        var slice = this.buf.slice(this.pos, this.pos + count);
        this.buf.skip(count);
        return slice;
    }

    align(alignment) {
        // Note: The 4 starting bytes (for Representation Id and Options) are not considered for alignment
        var modulo = (this.buf.offset + 4) % alignment;
        if (modulo > 0) {
            this.buf.skip(alignment - modulo);
        }
    }

    readInt16() {
        this.align(2);
        return this.buf.readInt16();
    }

    readUint16() {
        this.align(2);
        return this.buf.readUint16();
    }

    readInt32() {
        this.align(4);
        return this.buf.readInt32();
    }

    readUint32() {
        this.align(4);
        return this.buf.readUint32();
    }

    readInt64() {
        this.align(8);
        return this.buf.readInt64();
    }

    readUint64() {
        this.align(8);
        return this.buf.readUint64();
    }

    readFloat32() {
        this.align(4);
        return this.buf.readFloat32();
    }

    readFloat64() {
        this.align(8);
        return this.buf.readFloat64();
    }

    readChar() {
        return String.fromCharCode(this.readByte());
    }

    readString() {
        var len = this.readUint32();
        // Note: skip null-termination char to construct C# String
        var str = this.buf.readUTF8String(len - 1);
        this.buf.skip(1);
        return str;
    }

    readSequenceLength() {
        return this.readUint32();
    }
}
