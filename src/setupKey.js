import { execSync } from "child_process";
import fs from "fs";
import inquirer from "inquirer";
import os from "os";
import path from "path";

export async function setupKey() {
  console.log("Setting up your API key.\n");

  const { keyType } = await inquirer.prompt([
    {
      type: "list",
      name: "keyType",
      message: "Which API key would you like to set?",
      choices: [
        { name: "Gemini (stored as GEMINI_API_KEY)", value: "GEMINI_API_KEY" },
        { name: "OpenAI (stored as OPENAI_API_KEY)", value: "OPENAI_API_KEY" },
      ],
    },
  ]);

  const { apiKey } = await inquirer.prompt([
    {
      name: "apiKey",
      message: `Enter your ${keyType}:`,
      validate: (input) =>
        input.trim() ? true : "Please enter a valid API key.",
    },
  ]);

  const key = apiKey.trim();

  try {
    const platform = os.platform();

    if (platform === "win32") { // for windows

      execSync(`setx ${keyType} "${key}"`, { stdio: "ignore" });
      console.log(`- ${keyType} saved to system environment variables.`);
      console.log("- Restart your terminal for changes to take effect.\n");
    } else { 

      // for macOS and Linux
      const bashrcPath = path.join(os.homedir(), ".bashrc");
      const zshrcPath = path.join(os.homedir(), ".zshrc");
      let shellFile;
      if (fs.existsSync(zshrcPath)) {
        shellFile = zshrcPath;
      } else if (fs.existsSync(bashrcPath)) {
        shellFile = bashrcPath;
      } else {
        // If neither file exists, create .bashrc
        fs.writeFileSync(bashrcPath, "");
        shellFile = bashrcPath;
      }

      const exportLine = `\n# Added by file-summarize CLI\nexport ${keyType}="${key}"\n`;

      fs.appendFileSync(shellFile, exportLine);

      console.log(`- ${keyType} added to ${path.basename(shellFile)}.`);
      console.log(`- Run 'source ~/${path.basename(shellFile)}' or restart your terminal to apply.\n`);
    }
  } catch (err) {
    console.error("Error: Failed to set environment variable.");
    console.error(err.message);
    console.log("\nTry running the command with administrator privileges.\n");
  }
}
