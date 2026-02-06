---
title: "EdgeBox: A Local Sandbox That Gives AI Agents Full Computer Access"
excerpt: "EdgeBox runs a Docker-based Ubuntu sandbox on your machine and exposes code execution and desktop control to LLMs via MCP. Privacy-first, near-zero latency, and works with Claude Desktop, OpenWebUI, and LobeChat."
categories:
  - AI
  - Docker
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

Most AI agent setups give you one of two things: a code interpreter or a browser automation tool. Rarely both, and almost never running locally.

[EdgeBox](https://github.com/BIGPPWONG/EdgeBox) takes a different approach. It spins up a full Ubuntu desktop environment inside a Docker container on your local machine and exposes everything — code execution, shell access, GUI automation — to LLMs through the MCP (Model Context Protocol) interface.

## What You Get

EdgeBox provides two categories of tools:

### Code Execution (Always Available)

- Multi-language support: Python, JavaScript, R, Java
- Persistent bash shell with full filesystem access
- File read/write/list/monitor operations
- Isolated inside Docker — no risk to the host system

### Desktop Control (When Enabled)

- Full Ubuntu desktop accessible via VNC
- Pre-installed apps: Chrome, VS Code, etc.
- Programmatic mouse control (click, drag, scroll, move)
- Keyboard input and key combinations
- Screenshot capture for visual perception

This means you can instruct an AI agent to:

- Open Chrome, search for something, and save the results to a file
- Run a data analysis script and screenshot the output
- Launch VS Code and edit a specific file

The agent sees the screen, moves the mouse, types on the keyboard — just like a human would.

## MCP-Native Integration

EdgeBox speaks MCP over HTTP, which means it works out of the box with any MCP-compatible client:

- **Claude Desktop** — Anthropic's official desktop client
- **OpenWebUI** — Self-hosted LLM frontend
- **LobeChat** — Popular open-source LLM UI

Configuration is straightforward: point your MCP client to EdgeBox's HTTP endpoint. Multi-session support (via session IDs) lets you run multiple sandboxes concurrently without interference.

## Why Local Matters

There are cloud-based agent sandboxes out there. EdgeBox's value proposition is running entirely on your machine:

- **Privacy**: Your code and files never leave your computer. For proprietary codebases or sensitive data, this is non-negotiable.
- **Latency**: Tool calls resolve over localhost. No network round-trips, no waiting for cloud containers to spin up.
- **Isolation**: The Docker container keeps agent activity contained. Configurable resource limits prevent runaway processes from affecting your host.

## Getting Started

Prerequisites: Docker Desktop installed and running.

Download the installer for your platform from the [Releases page](https://github.com/BIGPPWONG/EdgeBox/releases):

- Windows: `.exe`
- macOS: `.app`
- Linux: `.AppImage` / `.deb` / `.rpm`

On first launch, EdgeBox pulls the required Docker image automatically.

## Who This Is For

- AI agent developers who need a secure execution environment
- Anyone wanting LLMs to perform repetitive desktop tasks (scraping, batch screenshots, automated testing)
- Privacy-conscious users who don't want to send code to cloud sandbox services
- Claude Desktop / OpenWebUI / LobeChat users looking to add "hands-on" capabilities

## Summary

EdgeBox fills a clear gap: giving AI agents the ability to actually use a computer, not just talk about it — and doing it locally. MCP protocol compliance, Docker isolation, desktop GUI control, and multi-language code execution make it a complete local workstation for AI agents.

Project: [github.com/BIGPPWONG/EdgeBox](https://github.com/BIGPPWONG/EdgeBox)
