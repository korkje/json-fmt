#!/bin/bash

here=$(dirname "$0")

for size in 16 48 128; do
    inkscape -w $size -h $size $here/icon.svg -o $here/icon$size.png
done
