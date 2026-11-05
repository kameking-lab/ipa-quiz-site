const fs=require('node:fs');const path=require('node:path');const zlib=require('node:zlib');
const root=process.cwd();function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(d=>d.isDirectory()?files(path.join(dir,d.name)):[path.join(dir,d.name)]);}
const paths=files(path.join(root,'mobile/dist'));let bytes=0,gzipBytes=0;
for(const file of paths){const data=fs.readFileSync(file);bytes+=data.length;gzipBytes+=zlib.gzipSync(data).length;if(/harness|[\\/]tests[\\/]/.test(file))throw Error('Harness in production dist');if(/\.js$/.test(file)&&data.includes(Buffer.from('private-gsi-survey-assistant-20261021-2025-q1')))throw Error('Survey grading index in production dist');}
const reported=JSON.parse(fs.readFileSync(path.join(root,'mobile/docs/bundle-size.json'),'utf8'));if(bytes!==reported.bytes||gzipBytes!==reported.gzipBytes)throw Error('Bundle measurement mismatch');
console.log(JSON.stringify({files:paths.length,bytes,gzipBytes,harness:0,surveyIndexMarkers:0}));
