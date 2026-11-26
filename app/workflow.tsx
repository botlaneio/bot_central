"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useSpring } from "motion/react";
import workflowState from "./workflow-state.json";
import styles from "./workflow.module.css";
import Orb from "./orb";
import { loadTheatre } from "./theatre";

/*
 * "Watch an automation run": a dark workflow canvas. A pulse travels along the wires from step to step and the
 * camera follows it. Theatre.js sheet "Workflow": object "Flow" moves `progress` from 0 to 8 (one unit per wire),
 * object "Camera" sets `zoom`. Keyframes live in workflow-state.json; retime them at ?studio in development.
 */

export type Kind = "trigger" | "ai" | "condition" | "action" | "goal";
export type Step = { x: number; y: number; kind: Kind; tag: string; title: string; detail: string; time?: string; dim?: boolean };

const W = 240;
const H = 78;
const WORLD = { w: 2920, h: 470 };

// The path the pulse takes, in order: always nine steps (eight wires), index 2 is the condition and index 3
// its "Yes" branch. `noBranch` is the dimmed "No" route. Each industry passes its own configuration.
export type FlowConfig = {
  heading: string; sub: string; barTitle: string; barSub: string; label: string;
  path: Step[]; noBranch: Step;
};

const x = (i: number) => 60 + i * 320;
const row = (kind: Kind, tag: string, title: string, detail: string, time: string, i: number, y = 190): Step => ({ x: x(i), y, kind, tag, title, detail, time });

// Homepage default: a manufacturing RFQ, from inbox to reported order.
export const rfqFlow: FlowConfig = {
  heading: "Watch an automation run.",
  sub: "One request for quotation, from the inbox to a reported order, with a person approving the price.",
  barTitle: "RFQ to order",
  barSub: "Manufacturing · standard and custom items",
  label: "Demo workflow: an RFQ email arrives, AI reads the items and quantities, custom items go to engineering review, a quote is drafted from the price list, a sales manager approves it, it is sent, followed up, the purchase order is entered and the result is reported.",
  path: [
    row("trigger", "Trigger", "RFQ received", "Email with a drawing attached", "9:04 AM", 0),
    row("ai", "AI agent", "RFQ read and classified", "Items, quantities and deadline captured", "9:04 AM", 1),
    row("condition", "Condition", "Custom specification?", "One item has a custom finish", "9:05 AM", 2),
    row("action", "Escalate", "Engineering review", "Assigned to a person, with the drawing", "10:30 AM", 3, 70),
    row("action", "Quote", "Quote drafted", "From your price list and lead times", "10:32 AM", 4),
    row("action", "Approval", "Approved by sales manager", "Nothing is sent without it", "11:15 AM", 5),
    row("action", "Notify", "Quote sent", "With a reference number", "11:15 AM", 6),
    row("action", "Order", "Purchase order matched", "Order created in your ERP", "Day 3", 7),
    row("goal", "Goal", "Reported on the dashboard", "Ends the run", "Day 3", 8),
  ],
  noBranch: { x: x(3), y: 320, kind: "action", tag: "Price", title: "Standard items priced", detail: "Straight from the catalogue", dim: true },
};

type Box = Step & { w: number; h: number };

/* Wires run left to right on wide screens, and top to bottom in the vertical (phone) layout. */
function wire(a: Box, b: Box, vertical = false) {
  if (vertical) {
    const x1 = a.x + a.w / 2, y1 = a.y + a.h, x2 = b.x + b.w / 2, y2 = b.y, mid = (y2 - y1) / 2;
    return `M${x1} ${y1} C${x1} ${y1 + mid} ${x2} ${y2 - mid} ${x2} ${y2}`;
  }
  const x1 = a.x + a.w, y1 = a.y + a.h / 2, x2 = b.x, y2 = b.y + b.h / 2, mid = (x2 - x1) / 2;
  return `M${x1} ${y1} C${x1 + mid} ${y1} ${x2 - mid} ${y2} ${x2} ${y2}`;
}

/* Phone layout: one column of smaller boxes, top to bottom. The condition's two branches sit side by side. */
const VH = 60, ROW = 104, TOP = 30, SIDE = 14;
function verticalLayout(path: Step[], noBranch: Step, width: number) {
  const w = Math.min(300, width - SIDE * 2);
  const half = (width - SIDE * 2 - 12) / 2;
  const boxes: Box[] = path.map((step, i) => i === 3
    ? { ...step, x: SIDE, y: TOP + i * ROW, w: half, h: VH }
    : { ...step, x: (width - w) / 2, y: TOP + i * ROW, w, h: VH });
  const no: Box = { ...noBranch, x: SIDE + half + 12, y: TOP + 3 * ROW, w: half, h: VH };
  return { boxes, no, world: { w: width, h: TOP + path.length * ROW - ROW + VH + 30 } };
}
export default function Workflow({ flow = rfqFlow, id = "workflows" }: { flow?: FlowConfig; id?: string }) {
  const [progress, setProgress] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(1200);
  const vertical = width < 560;
  const layout = vertical ? verticalLayout(flow.path, flow.noBranch, width)
    : { boxes: flow.path.map(step => ({ ...step, w: W, h: H })), no: { ...flow.noBranch, w: W, h: H }, world: WORLD };
  const path: Box[] = layout.boxes, noBranch: Box = layout.no, world = layout.world;
  const wires = path.slice(1).map((step, index) => wire(path[index], step, vertical));
  const [reduced, setReduced] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const wireRefs = useRef<(SVGPathElement | null)[]>([]);
  const camera = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const resize = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    resize.observe(element);
    return () => resize.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const cleanups: (() => void)[] = [];
    (async () => {
      const { getProject, types } = await loadTheatre();
      if (cancelled) return;
      const project = getProject("botLane Workflow", { state: workflowState });
      const sheet = project.sheet("Workflow");
      const flow = sheet.object("Flow", { progress: types.number(0, { range: [0, 8] }) });
      const cam = sheet.object("Camera", { zoom: types.number(1, { range: [0.5, 1.5] }) });
      cleanups.push(flow.onValuesChange(values => setProgress(values.progress)));
      cleanups.push(cam.onValuesChange(values => setZoom(values.zoom)));
      await project.ready;
      if (cancelled) return;

      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setReduced(true);
        sheet.sequence.position = workflowState.sheetsById.Workflow.sequence.length;
        return;
      }
      // Only run while the section is on screen.
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) sheet.sequence.play({ iterationCount: Infinity });
        else sheet.sequence.pause();
      }, { threshold: 0.25 });
      if (viewport.current) observer.observe(viewport.current);
      cleanups.push(() => { observer.disconnect(); sheet.sequence.pause(); });
    })();
    return () => { cancelled = true; cleanups.forEach(cleanup => cleanup()); };
  }, []);

  // Where the pulse is, in world coordinates.
  const segment = Math.min(wires.length - 1, Math.floor(progress));
  const along = progress >= wires.length ? 1 : progress - segment;
  let pulse = vertical ? { x: path[0].x + path[0].w / 2, y: path[0].y + path[0].h } : { x: path[0].x + W, y: path[0].y + H / 2 };
  let trail = { length: 0, offset: 0, total: 0 };
  const element = wireRefs.current[segment];
  if (element) {
    const total = element.getTotalLength();
    const point = element.getPointAtLength(total * along);
    pulse = { x: point.x, y: point.y };
    const lit = Math.min(90, total * along);
    trail = { length: lit, offset: -(total * along - lit), total };
  }
  const running = progress > 0 && progress < wires.length;

  // The camera keeps the pulse a little left of centre, within the edges of the canvas.
  const fit = Math.min(1, width / 760);
  // A fixed scale: animating the zoom re-rasterises every box and its text each frame, which reads as a flicker
  // (worst on iPad Safari). The Theatre "Camera.zoom" track is kept in the state file but no longer applied.
  void zoom;
  let scale: number, viewHeight: number;
  if (vertical) {
    // Phone: no scaling, the camera scrolls down the column, keeping the pulse in the upper third.
    scale = 1;
    viewHeight = reduced ? world.h : 460;
    const targetY = Math.min(0, Math.max(viewHeight - world.h, viewHeight * 0.36 - pulse.y));
    camera.current = { x: 0, y: reduced ? 0 : targetY };
  } else {
    scale = reduced ? Math.min(1, width / WORLD.w) : 0.96 * fit;
    viewHeight = WORLD.h * Math.max(fit, 0.78);
    const targetX = Math.min(0, Math.max(width - WORLD.w * scale, width * 0.45 - pulse.x * scale));
    const targetY = Math.min(0, Math.max(viewHeight - WORLD.h * scale, viewHeight / 2 - (WORLD.h / 2 + (pulse.y - WORLD.h / 2) * 0.6) * scale));
    camera.current = { x: reduced ? 0 : targetX, y: reduced ? (viewHeight - WORLD.h * scale) / 2 : targetY };
  }

  // The camera glides after the pulse on a spring, decoupled from the step-by-step easing of the pulse itself,
  // so the canvas never lurches and stops at each box.
  const camX = useSpring(camera.current.x, { stiffness: 55, damping: 20, mass: 1 });
  const camY = useSpring(camera.current.y, { stiffness: 55, damping: 20, mass: 1 });
  useEffect(() => {
    if (reduced) { camX.jump(camera.current.x); camY.jump(camera.current.y); }
    else { camX.set(camera.current.x); camY.set(camera.current.y); }
  });

  const doneCount = Math.floor(progress + 0.02);

  // Step toasts: when the pulse reaches a box, a small notification confirms the step that just passed.
  const [toasts, setToasts] = useState<{ key: string; title: string; time?: string }[]>([]);
  const lastDone = useRef(0);
  useEffect(() => {
    if (doneCount < lastDone.current) setToasts([]); // the run restarted
    else if (doneCount > lastDone.current && doneCount < path.length) {
      const step = path[doneCount];
      setToasts(list => [{ key: `${doneCount}-${step.title}`, title: step.title, time: step.time }, ...list].slice(0, vertical ? 2 : 3));
    }
    lastDone.current = doneCount;
  }, [doneCount, path, vertical]);

  return <section className={styles.section} id={id} aria-labelledby="workflow-title">
    <div className={`frame ${styles.frame}`}>
      <h2 id="workflow-title" className={styles.heading}>{flow.heading} <span>{flow.sub}</span></h2>

      <div className={styles.window}>
        <div className={styles.bar}>
          <div className={styles.barTitle}><strong>{flow.barTitle}</strong><span>{flow.barSub}</span></div>
          <span className={styles.live}>{running ? <Orb state="working" on="dark" /> : <i />}{running ? "Running" : "Ready"}</span>
          <span className={styles.demo}>Demo workflow</span>
        </div>

        <div ref={viewport} className={styles.viewport} data-vertical={vertical} style={{ height: viewHeight }} role="img"
          aria-label={flow.label}>
          <motion.div className={styles.world} style={{ width: world.w, height: world.h, x: camX, y: camY, scale }} aria-hidden="true">
            <svg className={styles.wires} width={world.w} height={world.h} viewBox={`0 0 ${world.w} ${world.h}`}>
              <path d={wire(path[2], noBranch, vertical)} className={styles.wireDim} />
              <path d={wire(noBranch, path[4], vertical)} className={styles.wireDim} />
              {wires.map((d, index) => <path key={index} d={d} ref={node => { wireRefs.current[index] = node; }}
                className={styles.wire} data-state={index < doneCount ? "done" : index === segment && running ? "active" : "idle"} />)}
              {/* Trail and pulse stay mounted (hidden when idle) so nothing pops in or out between boxes. */}
              <path d={wires[segment]} className={styles.trailGlow} style={{ opacity: running && trail.total > 0 ? 1 : 0, strokeDasharray: `${trail.length} ${trail.total || 1}`, strokeDashoffset: trail.offset }} />
              <path d={wires[segment]} className={styles.trail} style={{ opacity: running && trail.total > 0 ? 1 : 0, strokeDasharray: `${trail.length} ${trail.total || 1}`, strokeDashoffset: trail.offset }} />
              <g style={{ opacity: running ? 1 : 0 }}>
                <circle cx={pulse.x} cy={pulse.y} r="14" className={styles.halo} />
                <circle cx={pulse.x} cy={pulse.y} r="6" className={styles.pulse} />
              </g>
              {vertical ? <>
                <text x={path[3].x + path[3].w / 2 - 34} y={path[2].y + path[2].h + 26} className={styles.branch}>Yes</text>
                <text x={noBranch.x + noBranch.w / 2 + 12} y={path[2].y + path[2].h + 26} className={styles.branch}>No</text>
              </> : <>
                <text x={path[2].x + W + 34} y={path[2].y + 6} className={styles.branch}>Yes</text>
                <text x={path[2].x + W + 34} y={path[2].y + H + 26} className={styles.branch}>No</text>
              </>}
            </svg>
            {[...path, noBranch].map((step, index) => {
              const isNo = step === noBranch;
              const state = isNo ? "skipped" : index <= doneCount ? "done" : "idle";
              return <div key={step.title} className={styles.node} data-kind={step.kind} data-state={state} data-fresh={!isNo && running && index === doneCount} style={{ left: step.x, top: step.y, width: step.w, height: step.h }}>
                <span className={styles.tag}>{step.tag}</span>
                {state === "done" && step.time && <span className={styles.time}>✓ {step.time}</span>}
                <strong>{step.title}</strong>
                <span className={styles.detail}>{step.detail}</span>
                {step.kind === "goal" && state === "done" && <span className={styles.goal}>✓</span>}
              </div>;
            })}
          </motion.div>
          <ol className={styles.toasts} aria-hidden="true">
            <AnimatePresence initial={false}>
              {toasts.map((t, i) => <motion.li key={t.key} layout className={styles.toast}
                initial={{ opacity: 0, x: 24, scale: 0.96 }} animate={{ opacity: i === 0 ? 1 : 0.55 - i * 0.15, x: 0, scale: 1 }} exit={{ opacity: 0, x: 16, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}>
                <span className={styles.toastIcon}>✓</span><span><b>{t.title}</b><small>Step passed{t.time ? ` · ${t.time}` : ""}</small></span>
              </motion.li>)}
            </AnimatePresence>
          </ol>
        </div>
      </div>

      <p className={styles.note}>Illustrative demo, not a client project. Every industry, and every business, gets its own workflow configuration, tools and approval steps.</p>
    </div>
  </section>;
}
