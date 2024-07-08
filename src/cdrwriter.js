//
// Copyright (c) 2021 ADLINK Technology Inc.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0, or the Apache License, Version 2.0
// which is available at https://www.apache.org/licenses/LICENSE-2.0.
//
// SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
//
import ByteBuffer from 'bytebuffer';

export class CDRWriter {
    constructor() {
        this.buf = new ByteBuffer();
        if (this.buf.littleEndian) {
            this.buf.writeByte(0x00);
            this.buf.writeByte(0x01);
            this.buf.writeByte(0x00);
            this.buf.writeByte(0x00);
        } else {
            this.buf.writeByte(0x00);
            this.buf.writeByte(0x00);
            this.buf.writeByte(0x00);
            this.buf.writeByte(0x00);
        }
    }

    writeByte(b) {
        this.buf.writeByte(b);
    }

    writeBytes(buf) {
        this.buf.append(buf, "binary");
    }

    align(alignment) {
        // Note: The 4 starting bytes (for Representation Id and Options) are not considered for alignment
        var modulo = (this.buf.offset + 4) % alignment;
        if (modulo > 0) {
            for (var i = 0; i < alignment - modulo; i++) {
                writeByte(0x00);
            }
        }
    }

    writeInt16(i) {
        this.align(2);
        this.buf.writeInt16(i);
    }

    writeUint16(i) {
        this.align(2);
        this.buf.writeUint16(i);
    }

    writeInt32(i) {
        this.align(4);
        this.buf.writeInt32(i);
    }

    writeUint32(i) {
        this.align(4);
        this.buf.writeUint32(i);
    }

    writeInt64(i) {
        this.align(8);
        this.buf.writeInt64(i);
    }

    writeUint64(i) {
        this.align(8);
        this.buf.writeUint64(i);
    }

    writeFloat32(f) {
        this.align(4);
        this.buf.writeFloat32(f);
    }

    writeFloat64(f) {
        this.align(8);
        this.buf.writeFloat64(f);
    }

    writeChar(c) {
        this.writeByte(c.charCodeAt(0));
    }

    writeString(s) {
        // Note: Add null-termination char as not present in JavaScript String
        this.writeUint32(s.length + 1);
        this.buf.writeUTF8String(s);
        this.writeByte(0);
    }

    writeSequenceLength(l) {
        this.writeUint32(l);
    }
}
