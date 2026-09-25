import { i as slugify, n as downloadBlob, r as formatStampDate } from "./routes-DFtXkjIc.mjs";
import { t as PptxGenJS } from "../_libs/pptxgenjs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pptx-CyFyZ8cb.js
var INK = "161410";
var PAPER = "F3EEE4";
var STAMP = "9A3412";
var MUTED = "6B6458";
var RULE = "CFC6B4";
var SAGE = "3F6212";
var RAISED = "EBE4D6";
function sevColor(s) {
	if (s === "pass") return SAGE;
	if (s === "info") return MUTED;
	return STAMP;
}
async function exportPptx(report) {
	const pptx = new PptxGenJS();
	pptx.defineLayout({
		name: "ATTEST",
		width: 13.333,
		height: 7.5
	});
	pptx.layout = "ATTEST";
	pptx.title = `Attest — ${report.name}`;
	pptx.author = "Attest";
	const title = pptx.addSlide();
	title.background = { color: PAPER };
	title.addText("ATTEST", {
		x: .7,
		y: .55,
		w: 6,
		h: .35,
		fontSize: 12,
		fontFace: "Arial",
		color: STAMP,
		bold: true,
		charSpacing: 3
	});
	title.addShape(pptx.ShapeType.rect, {
		x: .7,
		y: .95,
		w: 1.4,
		h: .06,
		fill: { color: STAMP }
	});
	title.addText(report.name, {
		x: .7,
		y: 1.4,
		w: 11.8,
		h: 1.3,
		fontSize: 36,
		fontFace: "Georgia",
		color: INK,
		bold: true,
		margin: 0
	});
	title.addText(`Verdict ${report.grade}`, {
		x: .7,
		y: 2.9,
		w: 5,
		h: .7,
		fontSize: 28,
		fontFace: "Georgia",
		color: STAMP
	});
	title.addText(`Score ${report.score}  ·  ${formatStampDate(new Date(report.auditedAt))}`, {
		x: .7,
		y: 3.55,
		w: 10,
		h: .35,
		fontSize: 14,
		fontFace: "Arial",
		color: MUTED
	});
	title.addText(report.summary, {
		x: .7,
		y: 4.2,
		w: 11.8,
		h: 1.4,
		fontSize: 16,
		fontFace: "Arial",
		color: INK
	});
	const overview = pptx.addSlide();
	overview.background = { color: PAPER };
	overview.addText("Scope of this audit", {
		x: .7,
		y: .45,
		w: 12,
		h: .5,
		fontSize: 22,
		fontFace: "Georgia",
		color: INK
	});
	[
		{
			k: "Jobs",
			v: String(report.stats.jobs)
		},
		{
			k: "Steps",
			v: String(report.stats.steps)
		},
		{
			k: "Triggers",
			v: report.stats.triggers.join(", ")
		},
		{
			k: "Token",
			v: report.stats.usesAppToken ? "GITHUB_TOKEN + App" : report.stats.usesGithubToken ? "GITHUB_TOKEN" : "none"
		}
	].forEach((c, i) => {
		const x = .7 + i % 4 * 3.1;
		overview.addShape(pptx.ShapeType.roundRect, {
			x,
			y: 1.3,
			w: 2.9,
			h: 1.7,
			fill: { color: RAISED },
			rectRadius: .08
		});
		overview.addText(c.k, {
			x,
			y: 1.45,
			w: 2.9,
			h: .35,
			fontSize: 11,
			fontFace: "Arial",
			color: MUTED,
			align: "center"
		});
		overview.addText(c.v, {
			x: x + .1,
			y: 1.85,
			w: 2.7,
			h: .9,
			fontSize: 16,
			fontFace: "Georgia",
			color: INK,
			align: "center"
		});
	});
	[
		"critical",
		"high",
		"medium",
		"low"
	].map((s) => ({
		s,
		n: report.findings.filter((f) => f.severity === s).length
	})).forEach((c, i) => {
		const x = .7 + i * 3.1;
		overview.addText(String(c.n), {
			x,
			y: 3.5,
			w: 2.9,
			h: .7,
			fontSize: 28,
			fontFace: "Georgia",
			color: c.n ? STAMP : SAGE,
			align: "center"
		});
		overview.addText(c.s, {
			x,
			y: 4.2,
			w: 2.9,
			h: .3,
			fontSize: 12,
			fontFace: "Arial",
			color: MUTED,
			align: "center"
		});
	});
	const chunks = [];
	for (let i = 0; i < report.findings.length; i += 4) chunks.push(report.findings.slice(i, i + 4));
	if (chunks.length === 0) chunks.push([]);
	chunks.forEach((group, gi) => {
		const slide = pptx.addSlide();
		slide.background = { color: PAPER };
		slide.addText(gi === 0 ? "Findings" : "Findings (continued)", {
			x: .7,
			y: .4,
			w: 12,
			h: .45,
			fontSize: 22,
			fontFace: "Georgia",
			color: INK
		});
		group.forEach((f, i) => {
			const y = 1.05 + i * 1.45;
			slide.addShape(pptx.ShapeType.rect, {
				x: .7,
				y,
				w: .08,
				h: 1.28,
				fill: { color: sevColor(f.severity) }
			});
			slide.addText(`F-${String(gi * 4 + i + 1).padStart(3, "0")}  ${f.severity.toUpperCase()}`, {
				x: 1,
				y,
				w: 11.4,
				h: .28,
				fontSize: 11,
				fontFace: "Arial",
				color: sevColor(f.severity),
				bold: true
			});
			slide.addText(f.title, {
				x: 1,
				y: y + .28,
				w: 11.4,
				h: .32,
				fontSize: 16,
				fontFace: "Georgia",
				color: INK
			});
			slide.addText(f.detail, {
				x: 1,
				y: y + .6,
				w: 11.4,
				h: .6,
				fontSize: 12,
				fontFace: "Arial",
				color: MUTED
			});
		});
	});
	const recs = pptx.addSlide();
	recs.background = { color: PAPER };
	recs.addText("What to do next", {
		x: .7,
		y: .45,
		w: 12,
		h: .5,
		fontSize: 22,
		fontFace: "Georgia",
		color: INK
	});
	const top = report.findings.filter((f) => f.severity === "critical" || f.severity === "high" || f.severity === "medium").slice(0, 5);
	const items = top.length > 0 ? top.map((f) => ({
		text: f.remediation,
		options: {
			fontSize: 15,
			fontFace: "Arial",
			color: INK,
			paraSpaceAfter: 10
		}
	})) : [{
		text: "Keep the permissions map explicit when you add jobs. Re-run Attest on every workflow change.",
		options: {
			fontSize: 15,
			fontFace: "Arial",
			color: INK
		}
	}];
	recs.addText(items, {
		x: .7,
		y: 1.2,
		w: 12,
		h: 5.2
	});
	const close = pptx.addSlide();
	close.background = { color: PAPER };
	close.addText("GITHUB_TOKEN is enough — until it isn't.", {
		x: .7,
		y: 2.2,
		w: 12,
		h: 1,
		fontSize: 26,
		fontFace: "Georgia",
		color: INK
	});
	close.addText("Use an App JWT only when the automatic token cannot hold the scopes you need. Sign RS256, expire in ten minutes, send Bearer.", {
		x: .7,
		y: 3.4,
		w: 11.5,
		h: 1.2,
		fontSize: 16,
		fontFace: "Arial",
		color: MUTED
	});
	close.addShape(pptx.ShapeType.rect, {
		x: .7,
		y: 6.7,
		w: 12,
		h: .015,
		fill: { color: RULE }
	});
	close.addText("Attest  ·  least privilege for GitHub Actions", {
		x: .7,
		y: 6.85,
		w: 12,
		h: .3,
		fontSize: 12,
		fontFace: "Arial",
		color: MUTED
	});
	const blob = await pptx.write({ outputType: "blob" });
	downloadBlob(blob, `attest-${slugify(report.name)}.pptx`);
}
//#endregion
export { exportPptx };
