"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useInView, useTime, useTransform } from "motion/react";

/*
 * BotOrb: botLane's logo, alive. A white 3D orb with two pill eyes (ink and violet) and a violet silk glow behind.
 * Built with Motion (motion/react).
 *
 *   <BotOrb size={40} />                     idle: floats, blinks at uneven intervals, glances around
 *   <BotOrb mood="happy" />                  eyes squeeze into smiles, little bounce
 *   <BotOrb mood="thinking" />               eyes look up and scan side to side, glow swirls
 *   <BotOrb mood="surprised" />              eyes go wide and round, orb pops
 *   <BotOrb mood="sleepy" />                 eyes closed, slow breathing, z's drift up
 *   <BotOrb mood="wink" />                   the violet eye winks
 *   <BotOrb mood="working" />                eyes focused, glow spins faster
 *   <BotOrb mood="love" />                   eyes turn into hearts
 *   <BotOrb intro="load" | "view" | false /> how the entrance plays: on page load (default), when it scrolls
 *                                            into view, or not at all
 *   <BotOrb animated={false} />              a still logo (exports, print)
 *
 * After its entrance the orb says hello (happy for a moment), then settles into the mood it was given.
 * Reduced-motion visitors see the moods without movement.
 */

export type Mood = "idle" | "happy" | "thinking" | "surprised" | "sleepy" | "wink" | "working" | "love";

const INK = "#061B31";
const VIOLET = "#5333F5";
const spring = { type: "spring", stiffness: 300, damping: 20 } as const;
const gentle = { type: "spring", stiffness: 140, damping: 18 } as const;

// Eye geometry (in the 120×120 viewBox), per mood.
const open = { width: 9, height: 18, y: 49, rx: 4.5 };
const shapes: Record<string, typeof open> = {
  open,
  closed: { width: 10, height: 3, y: 57, rx: 1.5 },
  wide: { width: 13, height: 13, y: 51, rx: 6.5 },
  focus: { width: 9, height: 12, y: 52, rx: 4.5 },
};


/*
 * Navy-tone detail: a thin ring around the orb (never across it), with a small orange node travelling along the
 * ring. The ring has a short gap that trails the node, like a lane it is running on. Speed follows the mood.
 */
const R = 49, CX = 60, CY = 58;
function Halo({ period, still }: { period: number; still: boolean }) {
  const time = useTime();
  // Motion values drive the node's position and the ring's dash offset directly (no SVG transforms needed).
  const angle = useTransform(time, t => (still ? -0.9 : ((t / period) * Math.PI * 2) % (Math.PI * 2)));
  const cx = useTransform(angle, a => CX + R * Math.cos(a));
  const cy = useTransform(angle, a => CY + R * Math.sin(a));
  const C = 2 * Math.PI * R, GAP = 26;
  // The gap sits just behind the node, so the node looks like it is running along a lane.
  const offset = useTransform(angle, a => -(a / (Math.PI * 2)) * C + 4);
  return <g>
    <motion.circle cx={CX} cy={CY} r={R} fill="none" stroke="#b5adff" strokeOpacity=".55" strokeWidth="1.8"
      strokeDasharray={`${C - GAP} ${GAP}`} strokeLinecap="round" style={{ strokeDashoffset: offset }} />
    <motion.circle cx={cx} cy={cy} r="4.6" fill="#ff8a1f" />
  </g>;
}

export default function BotOrb({ size = 40, mood = "idle", intro = "load", animated = true, title, className, tone = "light" }: {
  size?: number; mood?: Mood; intro?: "load" | "view" | false; animated?: boolean; title?: string; className?: string;
  /** "navy": the orb in the CTA navy (#061B31) with light eyes and a soft navy glow. */
  tone?: "light" | "navy";
}) {
  const navy = tone === "navy";
  const reducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const eyeL = navy ? "#ffffff" : INK;
  const eyeR = navy ? "#b5adff" : VIOLET;
  const id = useId().replace(/:/g, "");
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [entered, setEntered] = useState(!animated || intro === false);
  const [greeting, setGreeting] = useState(false);
  const [blink, setBlink] = useState(false);
  const [look, setLook] = useState(0);

  // Entrance: on load, or once it scrolls into view. Then a brief "happy" hello.
  useEffect(() => {
    if (entered || !animated) return;
    if (intro === "load" || (intro === "view" && inView)) {
      const show = setTimeout(() => { setEntered(true); setGreeting(true); }, 150);
      return () => clearTimeout(show);
    }
  }, [animated, entered, intro, inView]);

  // The hello lasts a moment, then the orb settles into its given mood.
  useEffect(() => {
    if (!greeting) return;
    const settle = setTimeout(() => setGreeting(false), 1400);
    return () => clearTimeout(settle);
  }, [greeting]);

  const shown: Mood = greeting ? "happy" : mood;

  // Idle life: blinks at uneven intervals (sometimes twice) and the odd glance.
  useEffect(() => {
    if (!animated || !entered || shown !== "idle") return;
    let timer: ReturnType<typeof setTimeout>;
    const blinkOnce = (then: () => void) => { setBlink(true); timer = setTimeout(() => { setBlink(false); then(); }, 130); };
    const loop = () => {
      timer = setTimeout(() => {
        const roll = Math.random();
        if (roll < 0.25) { setLook(Math.random() < 0.5 ? -1 : 1); timer = setTimeout(() => { setLook(0); loop(); }, 1100); }
        else blinkOnce(() => { if (Math.random() < 0.2) timer = setTimeout(() => blinkOnce(loop), 170); else loop(); });
      }, 1800 + Math.random() * 3200);
    };
    loop();
    return () => { clearTimeout(timer); setBlink(false); setLook(0); };
  }, [animated, entered, shown]);

  const eye = (side: "left" | "right") => {
    if (!entered) return shapes.closed;
    if (shown === "sleepy") return shapes.closed;
    if (shown === "surprised") return shapes.wide;
    if (shown === "working") return shapes.focus;
    if (shown === "wink" && side === "right") return shapes.closed;
    if (blink) return { ...open, height: 2.5, y: 57 };
    return open;
  };
  const arcs = shown === "happy";
  const hearts = shown === "love";

  // Where the eyes point.
  const eyeOffset = shown === "thinking" ? { x: [-5, 5, -5], y: -6 } : { x: look * 5, y: shown === "sleepy" ? 2 : 0 };

  // The whole orb's body language.
  const body = !entered ? { scale: 0.4, opacity: 0, y: 8 }
    : shown === "happy" ? { scale: 1, opacity: 1, y: [0, -9, 0], scaleY: [1, 0.94, 1] }
    : shown === "surprised" ? { scale: [1, 1.1, 1], opacity: 1, y: -2 }
    : shown === "sleepy" ? { scale: [1, 1.025, 1], opacity: 1, y: 2 }
    : { scale: 1, opacity: 1, y: animated ? [0, -2.5, 0] : 0 };
  const bodyTransition = !entered ? gentle
    : shown === "happy" ? { duration: 0.7, repeat: greeting ? 0 : Infinity, repeatDelay: 0.6, ease: "easeOut" as const }
    : shown === "surprised" ? { duration: 0.45 }
    : shown === "sleepy" ? { duration: 3.6, repeat: Infinity, ease: "easeInOut" as const }
    : { y: { duration: 4, repeat: Infinity, ease: "easeInOut" as const }, scale: gentle, opacity: { duration: 0.3 } };

  const glowSpin = shown === "working" ? 2.2 : shown === "thinking" ? 6 : 14;
  const period = shown === "working" ? 2400 : shown === "thinking" ? 4000 : 9000;

  return <MotionConfig reducedMotion="user">
    <svg ref={ref} className={className} width={size} height={size} viewBox="-6 -8 132 132" style={{ overflow: "visible", display: "block" }}
      role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="1" x2="1" y2="0">
          {navy ? <><stop offset="0" stopColor="#061B31" stopOpacity=".55" /><stop offset="1" stopColor="#425E73" stopOpacity=".35" /></>
            : <><stop offset="0" stopColor="#4B6BFF" /><stop offset=".45" stopColor="#5333F5" /><stop offset="1" stopColor="#C38BFF" /></>}
        </linearGradient>
        <filter id={`${id}b`} x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="9" /></filter>
        <radialGradient id={`${id}s`} cx="38%" cy="30%" r="75%">
          {navy ? <><stop offset="0" stopColor="#2a3f5e" /><stop offset=".5" stopColor="#11253f" /><stop offset=".85" stopColor="#081d34" /><stop offset="1" stopColor="#061B31" /></>
            : <><stop offset="0" stopColor="#ffffff" /><stop offset=".55" stopColor="#fbfbfe" /><stop offset=".82" stopColor="#ebeaf5" /><stop offset="1" stopColor="#d9d7ea" /></>}
        </radialGradient>
        <radialGradient id={`${id}r`} cx="50%" cy="100%" r="60%"><stop offset="0" stopColor={VIOLET} stopOpacity=".18" /><stop offset="1" stopColor={VIOLET} stopOpacity="0" /></radialGradient>
        <radialGradient id={`${id}h`} cx="35%" cy="25%" r="30%"><stop offset="0" stopColor="#fff" stopOpacity={navy ? 0.22 : 1} /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      </defs>

      {/* Silk glow behind the orb: fades in on entrance, swirls faster when the orb is busy. */}
      <motion.g initial={{ scale: 0.6 }}
        style={{ opacity: entered ? (shown === "sleepy" ? 0.45 : shown === "surprised" ? 1 : 0.85) : 0, transition: "opacity .6s ease" }}
        animate={{ scale: entered ? (shown === "surprised" ? 1.12 : 1) : 0.6 }}
        transition={gentle}>
        <motion.g animate={animated ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: glowSpin, repeat: Infinity, ease: "linear" }}>
          <g filter={`url(#${id}b)`}><ellipse cx="66" cy="72" rx="40" ry="36" fill={`url(#${id}g)`} /></g>
        </motion.g>
      </motion.g>

      <motion.g initial={false} animate={body} transition={bodyTransition}>
        {navy && <Halo period={period} still={!animated || !!reducedMotion} />}
        <circle cx="60" cy="58" r="40" fill={`url(#${id}s)`} />
        <circle cx="60" cy="58" r="40" fill={`url(#${id}r)`} />
        <circle cx="60" cy="58" r="40" fill={`url(#${id}h)`} />
        {navy && <>
          {/* Rim light on the upper left and a fine inner ring: depth without gradients on the brand colours. */}
          <path d="M27 40 A40 40 0 0 1 52 19" fill="none" stroke="#ffffff" strokeOpacity=".28" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="60" cy="58" r="35.5" fill="none" stroke="#ffffff" strokeOpacity=".06" strokeWidth="1" />
        </>}

        <motion.g initial={false} animate={eyeOffset}
          transition={shown === "thinking" ? { x: { duration: 2.2, repeat: Infinity, ease: "easeInOut" }, y: spring } : spring}>
          <AnimatePresence initial={false} mode="popLayout">
            {arcs ? <motion.g key="arcs" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={spring}>
                <path d="M43 61 q6.5 -9 13 0" fill="none" stroke={eyeL} strokeWidth="5" strokeLinecap="round" />
                <path d="M64 61 q6.5 -9 13 0" fill="none" stroke={eyeR} strokeWidth="5" strokeLinecap="round" />
              </motion.g>
              : hearts ? <motion.g key="hearts" initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: [1, 1.12, 1] }} exit={{ opacity: 0 }}
                  transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.8, repeat: Infinity } }}>
                  <path d="M49.5 64 l-6-6 a3.6 3.6 0 0 1 6-4 a3.6 3.6 0 0 1 6 4z" fill={eyeL} />
                  <path d="M70.5 64 l-6-6 a3.6 3.6 0 0 1 6-4 a3.6 3.6 0 0 1 6 4z" fill={eyeR} />
                </motion.g>
              : <motion.g key="eyes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  {(["left", "right"] as const).map(side => {
                    const shape = eye(side);
                    const cx = side === "left" ? 49.5 : 70.5;
                    return <motion.rect key={side} fill={side === "left" ? eyeL : eyeR} initial={false}
                      animate={{ x: cx - shape.width / 2, y: shape.y, width: shape.width, height: shape.height, rx: shape.rx }}
                      transition={blink ? { duration: 0.08 } : { duration: 0.22, ease: [0.2, 0.7, 0.1, 1] }} />;
                  })}
                </motion.g>}
          </AnimatePresence>
        </motion.g>
      </motion.g>

      {/* Sleepy z's drifting up. */}
      <AnimatePresence>
        {shown === "sleepy" && animated && [0, 1].map(index =>
          <motion.text key={index} x={92 + index * 8} y={30} fontSize={14 - index * 3} fontWeight="700" fill={VIOLET}
            initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0, 1, 0], y: -18 }} exit={{ opacity: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, delay: index * 1.2, ease: "easeOut" }}>z</motion.text>)}
      </AnimatePresence>
    </svg>
  </MotionConfig>;
}
