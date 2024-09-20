const { spawn } = require("child_process");

exports.runPythonScript = (req, res) => {
  const command = req.query.command || "Hello";
  const name = req.query.name || "World";
  const funcName = req.query.func;
  console.log("funcName: ", funcName);
  console.log(req, res);

  //* spawn ใช้รัน python script
  const pythonProcess = spawn("python3", ["py/scripts/main.py", "--func", funcName]);

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
      res.status(500).send(`Error running Python script)`);
    }
  });
};

exports.py01 = (req, res) => {
  res.send("py01");
};
