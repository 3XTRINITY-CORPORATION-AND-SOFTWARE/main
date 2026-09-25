import { i as slugify, n as downloadBlob, r as formatStampDate } from "./routes-DFtXkjIc.mjs";
import { n as StandardFonts, r as rgb, t as PDFDocument } from "../_libs/pdf-lib.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pdf-B7GqgE53.js
var PAGE = {
	w: 612,
	h: 792
};
var M = 54;
var ink = rgb(.086, .078, .063);
var brick = rgb(.604, .204, .071);
var mute = rgb(.42, .38, .33);
var rule = rgb(.81, .78, .71);
var sage = rgb(.247, .384, .071);
function wrap(font, text, size, width) {
	const words = text.replace(/\s+/g, " ").trim().split(" ");
	const lines = [];
	let line = "";
	for (const word of words) {
		const next = line ? `${line} ${word}` : word;
		if (font.widthOfTextAtSize(next, size) <= width) line = next;
		else {
			if (line) lines.push(line);
			line = word;
		}
	}
	if (line) lines.push(line);
	return lines.length ? lines : [""];
}
function drawHeader(page, font, serif, pageIndex, total) {
	page.drawText("ATTEST", {
		x: M,
		y: PAGE.h - 36,
		size: 9,
		font: serif,
		color: ink
	});
	page.drawText("GitHub Actions security audit", {
		x: 118,
		y: PAGE.h - 36,
		size: 9,
		font,
		color: mute
	});
	page.drawText(`${pageIndex + 1} / ${total}`, {
		x: PAGE.w - M - 36,
		y: PAGE.h - 36,
		size: 9,
		font,
		color: mute
	});
	page.drawRectangle({
		x: M,
		y: PAGE.h - 48,
		width: PAGE.w - 108,
		height: .8,
		color: brick
	});
}
async function exportPdf(report) {
	const doc = await PDFDocument.create();
	const font = await doc.embedFont(StandardFonts.Helvetica);
	const serif = await doc.embedFont(StandardFonts.TimesRoman);
	const serifBold = await doc.embedFont(StandardFonts.TimesRomanBold);
	const mono = await doc.embedFont(StandardFonts.Courier);
	const pages = [];
	const ensure = () => {
		const p = doc.addPage([PAGE.w, PAGE.h]);
		pages.push(p);
		return p;
	};
	let page = ensure();
	let y = PAGE.h - 72;
	const bump = (need) => {
		if (y - need < 64) {
			page = ensure();
			y = PAGE.h - 72;
		}
	};
	page.drawText(report.name, {
		x: M,
		y,
		size: 22,
		font: serifBold,
		color: ink
	});
	y -= 28;
	page.drawText(`Verdict ${report.grade}  ·  score ${report.score}  ·  ${formatStampDate(new Date(report.auditedAt))}`, {
		x: M,
		y,
		size: 11,
		font,
		color: brick
	});
	y -= 20;
	for (const line of wrap(font, report.summary, 11, PAGE.w - 108)) {
		page.drawText(line, {
			x: M,
			y,
			size: 11,
			font,
			color: ink
		});
		y -= 15;
	}
	y -= 8;
	const meta = `${report.stats.jobs} jobs  ·  ${report.stats.steps} steps  ·  trigger ${report.stats.triggers.join(", ")}  ·  token ${report.stats.usesGithubToken ? "GITHUB_TOKEN" : "none"}${report.stats.usesAppToken ? " + App" : ""}`;
	page.drawText(meta, {
		x: M,
		y,
		size: 9,
		font,
		color: mute
	});
	y -= 24;
	page.drawRectangle({
		x: M,
		y: y + 10,
		width: PAGE.w - 108,
		height: .6,
		color: rule
	});
	report.findings.forEach((f, i) => {
		bump(90);
		const color = f.severity === "pass" ? sage : f.severity === "info" ? mute : brick;
		page.drawText(`F-${String(i + 1).padStart(3, "0")}  ${f.severity.toUpperCase()}`, {
			x: M,
			y,
			size: 8,
			font: mono,
			color
		});
		y -= 14;
		page.drawText(f.title.slice(0, 90), {
			x: M,
			y,
			size: 12,
			font: serifBold,
			color: ink
		});
		y -= 16;
		if (f.location) {
			page.drawText(f.location, {
				x: M,
				y,
				size: 8,
				font: mono,
				color: mute
			});
			y -= 12;
		}
		for (const line of wrap(font, f.detail, 10, PAGE.w - 108)) {
			bump(16);
			page.drawText(line, {
				x: M,
				y,
				size: 10,
				font,
				color: ink
			});
			y -= 13;
		}
		y -= 4;
		for (const line of wrap(font, `Fix: ${f.remediation}`, 10, PAGE.w - 108)) {
			bump(16);
			page.drawText(line, {
				x: M,
				y,
				size: 10,
				font,
				color: mute
			});
			y -= 13;
		}
		y -= 14;
	});
	pages.forEach((p, i) => drawHeader(p, font, serif, i, pages.length));
	const bytes = await doc.save();
	const copy = new Uint8Array(bytes);
	downloadBlob(new Blob([copy], { type: "application/pdf" }), `attest-${slugify(report.name)}.pdf`);
}
//#endregion
export { exportPdf };
