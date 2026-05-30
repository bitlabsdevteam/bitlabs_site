import { execFileSync, spawn } from "node:child_process";
import process from "node:process";

function run(command, args) {
  return execFileSync(command, args, {
    cwd: process.cwd(),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function getListeningPids(port) {
  try {
    const output = run("lsof", ["-tiTCP:" + port, "-sTCP:LISTEN"]);
    return output.split("\n").map((value) => value.trim()).filter(Boolean);
  } catch {
    return [];
  }
}

function getProcessCwd(pid) {
  try {
    const output = run("lsof", ["-a", "-p", pid, "-d", "cwd", "-Fn"]);
    const match = output.match(/^n(.+)$/m);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

function stopExistingDevServer(port) {
  const currentDir = process.cwd();
  for (const pid of getListeningPids(port)) {
    const cwd = getProcessCwd(pid);
    if (cwd !== currentDir) {
      continue;
    }

    try {
      process.kill(Number(pid), "SIGTERM");
      process.stdout.write(`Stopped stale dev server on port ${port} (PID ${pid}).\n`);
    } catch {}
  }
}

stopExistingDevServer(3000);

const child = spawn("next", ["dev"], {
  cwd: process.cwd(),
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
