#!/bin/bash

here=$(dirname "$0")

for size in 16 32 48 128 256; do
    inkscape -w $size -h $size $here/icon.svg -o $here/icon$size.png
done
