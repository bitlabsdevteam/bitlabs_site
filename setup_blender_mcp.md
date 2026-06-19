# Blender MCP Setup on macOS (Apple Silicon / M1)

This guide matches the installation I created locally in this workspace.

## Blender 5.1 Compatibility Note

I fixed the local add-on package so it now includes all required files and no longer depends on `pydantic` inside Blender. If you installed an older copy of this add-on before this fix, reinstall it from the zip below or replace the installed add-on files with the current versions.

## Installed Location

- Repository: `/Users/davidbong/Documents/BitLabs_Website/tools/blender-mcp-server`
- MCP executable: `/Users/davidbong/Documents/BitLabs_Website/tools/blender-mcp-server/.venv/bin/blender-mcp-server`
- Blender add-on zip: `/Users/davidbong/Documents/BitLabs_Website/tools/blender-mcp-server/dist/blender_mcp_bridge.zip`

## What Was Installed

The `djeada/blender-mcp-server` project is already downloaded and installed in a Python virtual environment on this machine.

## Step 1: Confirm Blender Is Installed

On macOS, Blender is usually installed as:

```text
/Applications/Blender.app
```

If you installed it somewhere else, that is fine. The MCP server does not need Blender on your shell `PATH`, but you do need to open Blender to run the add-on.

## Step 2: Open Blender

Start Blender normally from Applications or Spotlight.

## Step 3: Install the Blender Add-on

In Blender:

1. Open `Blender`.
2. Go to `Blender > Settings...` or `Edit > Preferences` depending on your Blender version.
3. Open `Add-ons`.
4. Click the dropdown in the top-right and choose `Install from Disk...` or `Install...`.
5. Select this file:

```text
/Users/davidbong/Documents/BitLabs_Website/tools/blender-mcp-server/dist/blender_mcp_bridge.zip
```

6. Enable the add-on named `Blender MCP Bridge`.

## Step 4: Start the Blender MCP Bridge

Inside the main Blender window:

1. Open the `3D Viewport`.
2. Press `N` to open the right sidebar if it is hidden.
3. Open the `MCP` tab.
4. Confirm the panel shows that it is listening on `127.0.0.1:9876`.

If the panel does not show `127.0.0.1:9876`, stop there and fix the add-on before configuring your MCP client.

## Step 5: Configure Codex CLI

Run this once in Terminal:

```bash
codex mcp add blender -- /Users/davidbong/Documents/BitLabs_Website/tools/blender-mcp-server/.venv/bin/blender-mcp-server
```

Then verify:

```bash
codex mcp list
```

You should see a server entry named `blender`.

## Step 6: Optional Claude Desktop Configuration

If you want Blender available in Claude Desktop too, edit this file:

```text
~/Library/Application Support/Claude/claude_desktop_config.json
```

Use this JSON shape:

```json
{
  "mcpServers": {
    "blender": {
      "command": "/Users/davidbong/Documents/BitLabs_Website/tools/blender-mcp-server/.venv/bin/blender-mcp-server"
    }
  }
}
```

If the file already has other servers, merge the `blender` entry into the existing `mcpServers` object instead of replacing the whole file.

## Step 7: Restart the MCP Client

After configuration:

1. Fully quit Codex or Claude Desktop.
2. Re-open the client.
3. Keep Blender open with the MCP add-on listening.

## Step 8: Verify the Connection

With Blender open and the add-on listening, try one of these prompts:

- `What objects are in my Blender scene?`
- `Create a cube named TestCube at [0, 0, 1]`
- `Render the scene to /tmp/render.png`

If the MCP connection is working, the client should discover Blender tools and send commands into the open Blender session.

## Troubleshooting

### Blender tools do not appear in Codex or Claude

- Confirm the executable exists:

```bash
ls -l /Users/davidbong/Documents/BitLabs_Website/tools/blender-mcp-server/.venv/bin/blender-mcp-server
```

- Confirm the MCP server is registered:

```bash
codex mcp list
```

- Restart the client after adding the server.

### The client connects but Blender does nothing

- Make sure Blender is still open.
- Make sure the `Blender MCP Bridge` add-on is enabled.
- Make sure the MCP panel says it is listening on `127.0.0.1:9876`.

### Another MCP client is already using Blender

Do not connect multiple AI clients to the same Blender bridge at the same time unless you intentionally change ports and isolate them per Blender instance.

## Current Local Status

These artifacts are already present:

- Repo cloned
- Python virtualenv created
- Python package installed
- Blender add-on zip built

The remaining manual steps are inside Blender and whichever MCP client you want to use.
