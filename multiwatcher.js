const fs = require("fs");
const childProcess = require("child_process");

const ignorefiles = ["node_modules"];

async function dirWatcher() {
  const configConfig = await fs.promises.readFile("./whconfig.json");
  const settings = JSON.parse(configConfig);

  if (settings.dir.length === 0) return;
  if (settings.nodeFile.length === 0) return;
  if (settings.includes.length === 0) settings.includes.push("js");

  async function setWatcher(dir, ends, nodefile) {
    const dirContent = await fs.promises.readdir(dir);
    dirContent.forEach((file) => {
      if (ignorefiles.indexOf(file) >= 0) {
      } else if (file.indexOf(".") < 0) {
        setWatcher(`${dir}/${file}`, settings.includes, settings.nodefile);
      } else {
        if (ends.indexOf(file.split(".")[1]) >= 0) {
          //console.log(file,' werde ich überwachen')
          fs.watch(dir + "/" + file, (event, file) => {
            console.log(`${file} is ${event}ed`);
            console.log("node ", settings.nodeFile);
            childProcess.exec(
              `node ${settings.nodeFile}`,
              (error, out, err) => {
                if (error) console.log(error);
                console.log(out);
                console.log(err);
              }
            );
          });
        }
      }
    });
  }
  setWatcher(settings.dir, settings.includes, settings.nodefile);
}

dirWatcher();
