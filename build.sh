#!/bin/sh
[ ! -f node_modules ] || npm install
node_modules/typescript/bin/./tsc src/*.ts --outFile bin/script.js
