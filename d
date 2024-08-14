[1mdiff --git a/package-lock.json b/package-lock.json[m
[1mindex bb83c5a..b5d9f36 100644[m
[1m--- a/package-lock.json[m
[1m+++ b/package-lock.json[m
[36m@@ -1339,6 +1339,7 @@[m
       "version": "4.19.2",[m
       "resolved": "https://registry.npmjs.org/express/-/express-4.19.2.tgz",[m
       "integrity": "sha512-5T6nhjsT+EOMzuck8JjBHARTHfMht0POzlA60WV2pMD3gyXw2LZnZ+ueGdNxG+0calOJcWKbpFcuzLZ91YWq9Q==",[m
[32m+[m[32m      "license": "MIT",[m
       "dependencies": {[m
         "accepts": "~1.3.8",[m
         "array-flatten": "1.1.1",[m
[1mdiff --git a/src/app.js b/src/app.js[m
[1mindex e52e3e1..8f8f04f 100644[m
[1m--- a/src/app.js[m
[1m+++ b/src/app.js[m
[36m@@ -21,6 +21,7 @@[m [mconst whiteList = [[m
   "http://localhost:3000",[m
   "http://localhost:5173",[m
   "http://localhost:5175",[m
[32m+[m[32m  "http://localhost:3001"[m
 ];[m
 [m
 const corOptions = {[m
