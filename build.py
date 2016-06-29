#!/usr/bin/python
import os
if not os.path.exists("node_modules"):
    os.system("npm install")
if os.name == 'nt':
    os.system("cd node_modules\\typescript\\bin\\")
    os.system("tsc ..\\..\\..\\src\\*.ts --outFile bin\\script.js")
else:
    os.system("node_modules/typescript/bin/./tsc src/*.ts --outFile bin/script.js")
