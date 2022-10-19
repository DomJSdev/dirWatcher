const fs = require("fs");
const childProcess = require("child_process");

async function dirWatcher() {
  function validateSettings(object) {
    if (object.dir.length === 0) return;
  }

  const configConfig = await fs.promises.readFile("./whconfig.json");
  const settings = JSON.parse(configConfig);
  console.log(settings);
  if (settings.dir.length === 0) return;
  if (settings.nodefile.length === 0) return;
  if (settings.includes.length === 0) settings.includes.push("js");

  async function setWatcher(dir, ends, nodefile) {
    const dirContent = await fs.promises.readdir(dir);
    dirContent.forEach((file) => {
      /*
        ist das zuläsig?
        file.split(".")[1].find(...ends
        */
      if (file.split(".")[1].find(...ends)) {
        fs.watch(dir + "/" + file, (event, file) => {
          console.log("event: ", event);
          console.log("file: ", file);
          childProcess.exec("node", [nodefile]);
        });
      }
    });
  }
  setWatcher(settings.dir, settings.includes, settings.nodefile);
}

dirWatcher();
//module.exports = { dirWatcher };
