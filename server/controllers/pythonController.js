const { spawn } = require("child_process");

exports.runPythonScript = (req, res) => {
  const command = req.query.command || "Hello";
  const name = req.query.name || "World";

  //* spawn ใช้รัน python script
  const pythonProcess = spawn("python3", ["py/scripts/main.py", command, name]);

  //* รับผลลัพธ์จาก python script
  let output = "";
  pythonProcess.stdout.on("data", (data) => {
    output += data.tostring();
  });

  //* จัดการเมื่อ script รันเสร็จ
  pythonProcess.on("close", (code) => {
    if (code === 0) {
      res.send(`Python script output: ${output}`);
    } else {
      res.status(500).send(`Error running Python script (code: ${code})`);
    }
  });
};
