const { spawn } = require("child_process");
const dataVersion = require("../version.json");

exports.runPythonScript = (req, res) => {
  const command = req.query.command || "Hello";
  const name = req.query.name || "World";
  const funcName = req.query.func;

  console.log("funcName: ", funcName);
  console.log(req, res);

  //* spawn ใช้รัน python script
  const pythonProcess = spawn("python", ["py/scripts/main.py", "--func", funcName]);

  //* รับผลลัพธ์จาก python script
  let output = "";
  pythonProcess.stdout.on("data", (data) => {
    output += data.toString();
  });

  //* จัดการเมื่อ script รันเสร็จ
  pythonProcess.on("close", (code) => {
    if (code === 0) {
      res.send(`Python script output: ${output}`);
    } else {
      //   res.status(500).send(`Error running Python script (code: ${code})`);
      // res.status(500).send(`Error running Python script)`);
    }
  });
};

exports.py01 = (req, res) => {
  res.send("py01");
};

exports.py02 = (req, res) => {
  res.send("py02");
};

exports.getVersion = (req, res) => {
  console.log(`${dataVersion.version}: ${typeof dataVersion.version}`);
  res.json(dataVersion.version);
};

exports.downloadNewVersion = (req, res) => {
  const dist_dir = "dist/client_main.py";
  res.download(dist_dir, "client_main.py", (err) => {
    if (err) {
      console.error(`Error while downloading the file: ${err}`);
      res.status(500).send("Could not download the file");
    } else {
      console.log("File downloaded successfully");
      res.status(200).send("File downloaded successfully");
    }
  });
};
