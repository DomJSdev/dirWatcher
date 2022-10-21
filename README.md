# multiwatcher

### its a little project to watch at multi file 
### if the change event is trigger's he will start the main JavaScript file new

## what you have to do:

`1)` create a new json file with the name whconfig.json 

`2)` tipe in the file  

```
{
  "dir": "./",
  "nodeFile": "index",
  "includes": ["md","txt"]
}
```
__dir:__  is the directory `please put the multiwatcher.js in the root folder` 

__nodeFile:__ which file `node` have to rerun

__includes:__ which type of files should the multiwatcher listen 