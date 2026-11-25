import { Fragment } from "react";

/*
 * A small Markdown renderer for the imported posts, so the site needs no new dependency. It covers what the
 * posts use: paragraphs, ### headings, - and 1. lists, > quotes, GFM tables, **bold**, *italic*, `code` and links.
 */

function inline(text: string, key = 0): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /(\*\*([^*]+)\*\*|\*([^*\s][^*]*)\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = `${key}-${m.index}`;
    if (m[2]) out.push(<strong key={k}>{inline(m[2], m.index)}</strong>);
    else if (m[3]) out.push(<em key={k}>{inline(m[3], m.index)}</em>);
    else if (m[4]) out.push(<code key={k}>{m[4]}</code>);
    else if (m[5]) {
      const external = /^https?:/.test(m[6]);
      out.push(<a key={k} href={m[6]} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inline(m[5], m.index)}</a>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const cells = (row: string) => row.trim().replace(/^\||\|$/g, "").split("|").map(c => c.trim());

export function Markdown({ text, headingId }: { text: string; headingId?: (t: string) => string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    if (/^#{2,4} /.test(line)) {
      const t = line.replace(/^#+ /, "");
      blocks.push(<h3 key={i} id={headingId?.(t)}>{inline(t)}</h3>);
      i++; continue;
    }
    if (/^\|/.test(line) && /^\|?\s*:?-{2,}/.test(lines[i + 1] ?? "")) {
      const head = cells(line);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && /^\|/.test(lines[i])) rows.push(cells(lines[i++]));
      blocks.push(<div key={i} className="md-table"><table>
        <thead><tr>{head.map((h, j) => <th key={j}>{inline(h)}</th>)}</tr></thead>
        <tbody>{rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}>{inline(c)}</td>)}</tr>)}</tbody>
      </table></div>);
      continue;
    }
    if (/^> ?/.test(line)) {
      const quote: string[] = [];
      while (i < lines.length && /^> ?/.test(lines[i])) quote.push(lines[i++].replace(/^> ?/, ""));
      blocks.push(<blockquote key={i}>{quote.join(" ").split(/\s{2,}/).map((q, j) => <p key={j}>{inline(q)}</p>)}</blockquote>);
      continue;
    }
    if (/^[-*] /.test(line) || /^\d+\. /.test(line)) {
      const ordered = /^\d+\. /.test(line);
      const items: string[] = [];
      while (i < lines.length && (ordered ? /^\d+\. /.test(lines[i]) : /^[-*] /.test(lines[i]))) {
        let item = lines[i++].replace(/^([-*]|\d+\.) /, "");
        while (i < lines.length && /^\s{2,}\S/.test(lines[i])) item += " " + lines[i++].trim();
        items.push(item);
      }
      const List = ordered ? "ol" : "ul";
      blocks.push(<List key={i}>{items.map((it, j) => <li key={j}>{inline(it)}</li>)}</List>);
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,4} |> |[-*] |\d+\. |\|)/.test(lines[i])) para.push(lines[i++]);
    blocks.push(<p key={i}>{inline(para.join(" "))}</p>);
  }
  return <Fragment>{blocks}</Fragment>;
}
