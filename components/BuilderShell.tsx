"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowUp,
  Blocks,
  Bot,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  FolderKanban,
  History,
  Laptop,
  LayoutTemplate,
  Monitor,
  PanelLeft,
  Plus,
  Redo2,
  Settings,
  Smartphone,
  Sparkles,
  Tablet,
  Undo2,
  WandSparkles,
} from "lucide-react";
import { LivePreview } from "./LivePreview";
import { SiteSpec } from "@/lib/site-builder/types";
import { generateSiteSpec } from "@/lib/site-builder/generator";

type Device = "desktop" | "tablet" | "mobile";
type ChatMessage = { role: "user" | "builder"; text: string };

const starter = generateSiteSpec(
  "Create a modern SaaS website with a dark purple glass style",
);
const quickPrompts = [
  "Make it more premium",
  "Add a pricing section",
  "Use a blue theme",
  "Make it minimal",
];

export function BuilderShell() {
  const [spec, setSpec] = useState<SiteSpec>(starter);
  const [prompt, setPrompt] = useState("");
  const [device, setDevice] = useState<Device>("desktop");
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<"ai" | "local">("local");
  const [history, setHistory] = useState<SiteSpec[]>([starter]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "builder",
      text: "Describe the website you want. I’ll build a first version here, then you can refine it with follow-up prompts.",
    },
  ]);

  useEffect(() => {
    const saved = window.localStorage.getItem("ai-builder-project");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as SiteSpec;
      setSpec(parsed);
      setHistory([parsed]);
      setHistoryIndex(0);
    } catch {
      // Ignore invalid local state.
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("ai-builder-project", JSON.stringify(spec));
  }, [spec]);

  const previewWidth = useMemo(
    () =>
      ({
        desktop: "1180px",
        tablet: "820px",
        mobile: "390px",
      })[device],
    [device],
  );

  function commit(next: SiteSpec) {
    const trimmed = history.slice(0, historyIndex + 1);
    const nextHistory = [...trimmed, next].slice(-20);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setSpec(next);
  }

  function undo() {
    if (historyIndex <= 0) return;
    const next = historyIndex - 1;
    setHistoryIndex(next);
    setSpec(history[next]);
  }

  function redo() {
    if (historyIndex >= history.length - 1) return;
    const next = historyIndex + 1;
    setHistoryIndex(next);
    setSpec(history[next]);
  }

  async function generate(text: string) {
    const clean = text.trim();
    if (!clean || loading) return;

    setLoading(true);
    setPrompt("");
    setMessages((prev) => [...prev, { role: "user", text: clean }]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: clean, current: spec }),
      });
      const data = await response.json();
      if (!response.ok || !data.spec) {
        throw new Error(data.error ?? "Generation failed");
      }

      commit(data.spec as SiteSpec);
      setSource(data.source === "ai" ? "ai" : "local");
      setMessages((prev) => [
        ...prev,
        {
          role: "builder",
          text:
            data.source === "ai"
              ? "Applied with the configured AI model. The preview is updated."
              : "Applied. The local generation engine handled this request; connect an AI provider for deeper edits.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "builder",
          text: "I couldn’t apply that change. Your previous version is still safe.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void generate(prompt);
  }

  function newProject() {
    const next = generateSiteSpec("Create a clean modern SaaS website");
    setSpec(next);
    setHistory([next]);
    setHistoryIndex(0);
    setMessages([
      {
        role: "builder",
        text: "New project ready. Describe what you want to build.",
      },
    ]);
  }

  return (
    <main className="builder-app">
      <aside className="builder-sidebar">
        <div className="builder-logo">
          <WandSparkles size={19} />
          <span>AB</span>
        </div>
        <button className="sidebar-action active" title="Builder">
          <Blocks size={18} />
        </button>
        <button className="sidebar-action" title="Projects">
          <FolderKanban size={18} />
        </button>
        <button className="sidebar-action" title="Templates">
          <LayoutTemplate size={18} />
        </button>
        <div className="sidebar-spacer" />
        <button className="sidebar-action" title="Settings">
          <Settings size={18} />
        </button>
      </aside>

      <section className="prompt-panel">
        <header className="panel-header">
          <div>
            <small>PROJECT</small>
            <strong>{spec.name}</strong>
          </div>
          <button
            className="icon-button"
            onClick={newProject}
            title="New website"
          >
            <Plus size={17} />
          </button>
        </header>

        <div className="conversation">
          <div className="builder-intro">
            <div className="ai-orb">
              <Sparkles size={18} />
            </div>
            <h1>What should we build?</h1>
            <p>
              Describe the business, style, sections, colors, or effects.
              Follow-up prompts modify the current design.
            </p>
          </div>

          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`chat-message ${message.role}`}
            >
              {message.role === "builder" && <Bot size={15} />}
              <span>{message.text}</span>
            </div>
          ))}

          {loading && (
            <div className="generation-status">
              <span />
              <div>
                <strong>Building your update</strong>
                <small>Planning layout · applying styles · preparing preview</small>
              </div>
            </div>
          )}
        </div>

        <div className="prompt-bottom">
          <div className="quick-prompts">
            {quickPrompts.map((item) => (
              <button key={item} onClick={() => void generate(item)}>
                {item}
              </button>
            ))}
          </div>

          <form className="prompt-box" onSubmit={submit}>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Describe the website or change you want..."
              rows={3}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void generate(prompt);
                }
              }}
            />
            <div className="prompt-tools">
              <span>
                <Sparkles size={14} />
                {source === "ai" ? "AI model" : "Local engine"}
              </span>
              <button type="submit" disabled={!prompt.trim() || loading}>
                <ArrowUp size={17} />
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="preview-panel">
        <header className="preview-toolbar">
          <div className="toolbar-left">
            <button className="tool-button">
              <PanelLeft size={16} />
            </button>
            <span className="saved-state">
              <i /> Saved
            </span>
          </div>

          <div className="toolbar-center">
            <button
              className="tool-button"
              onClick={undo}
              disabled={historyIndex <= 0}
              title="Undo"
            >
              <Undo2 size={16} />
            </button>
            <button
              className="tool-button"
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              title="Redo"
            >
              <Redo2 size={16} />
            </button>
            <span className="toolbar-divider" />
            <button
              className={`device-button ${device === "desktop" ? "active" : ""}`}
              onClick={() => setDevice("desktop")}
            >
              <Monitor size={16} />
            </button>
            <button
              className={`device-button ${device === "tablet" ? "active" : ""}`}
              onClick={() => setDevice("tablet")}
            >
              <Tablet size={16} />
            </button>
            <button
              className={`device-button ${device === "mobile" ? "active" : ""}`}
              onClick={() => setDevice("mobile")}
            >
              <Smartphone size={16} />
            </button>
          </div>

          <div className="toolbar-right">
            <button className="code-button" title="Code panel coming next">
              <Code2 size={15} /> Code
            </button>
            <button className="publish-button" title="Publishing flow coming next">
              Publish <ExternalLink size={14} />
            </button>
          </div>
        </header>

        <div className="preview-stage">
          <div className="browser-frame" style={{ width: previewWidth }}>
            <div className="browser-chrome">
              <div className="chrome-dots">
                <i />
                <i />
                <i />
              </div>
              <div className="address-bar">
                <Laptop size={13} />
                <span>
                  {spec.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.site
                </span>
              </div>
              <History size={14} />
            </div>
            <div className="site-viewport">
              <LivePreview spec={spec} />
            </div>
          </div>
        </div>

        <div className="history-control">
          <button onClick={undo} disabled={historyIndex <= 0}>
            <ChevronLeft size={14} />
          </button>
          <span>
            Version {historyIndex + 1} of {history.length}
          </span>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </section>
    </main>
  );
}
