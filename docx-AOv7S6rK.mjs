import { i as slugify, n as downloadBlob, r as formatStampDate } from "./routes-DFtXkjIc.mjs";
import { a as Header, c as Packer, d as ShadingType, f as Table, g as WidthType, h as TextRun, i as Footer, l as PageNumber, m as TableRow, n as BorderStyle, o as HeadingLevel, p as TableCell, r as File, s as LevelFormat, t as AlignmentType, u as Paragraph } from "../_libs/docx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/docx-AOv7S6rK.js
var INK = "161410";
var STAMP = "9A3412";
var MUTED = "6B6458";
var RULE = "CFC6B4";
var PAPER = "F3EEE4";
var SAGE = "3F6212";
var border = {
	style: BorderStyle.SINGLE,
	size: 4,
	color: RULE
};
var borders = {
	top: border,
	bottom: border,
	left: border,
	right: border
};
function severityColor(s) {
	if (s === "pass") return SAGE;
	if (s === "info") return MUTED;
	return STAMP;
}
function cell(text, width, opts) {
	return new TableCell({
		borders,
		width: {
			size: width,
			type: WidthType.DXA
		},
		shading: {
			fill: opts?.fill ?? "FFFFFF",
			type: ShadingType.CLEAR
		},
		margins: {
			top: 80,
			bottom: 80,
			left: 100,
			right: 100
		},
		children: [new Paragraph({ children: [new TextRun({
			text,
			bold: opts?.bold,
			color: opts?.color ?? INK,
			size: 18,
			font: "Arial"
		})] })]
	});
}
async function exportDocx(report) {
	const W = 9360;
	const cols = [
		1100,
		1400,
		4060,
		2800
	];
	const headerRow = new TableRow({ children: [
		cell("ID", cols[0], {
			fill: PAPER,
			bold: true
		}),
		cell("Severity", cols[1], {
			fill: PAPER,
			bold: true
		}),
		cell("Finding", cols[2], {
			fill: PAPER,
			bold: true
		}),
		cell("Location", cols[3], {
			fill: PAPER,
			bold: true
		})
	] });
	const bodyRows = report.findings.map((f, i) => new TableRow({ children: [
		cell(`F-${String(i + 1).padStart(3, "0")}`, cols[0], { bold: true }),
		cell(f.severity.toUpperCase(), cols[1], {
			color: severityColor(f.severity),
			bold: true
		}),
		cell(f.title, cols[2]),
		cell(f.location ?? "workflow", cols[3], { color: MUTED })
	] }));
	const children = [
		new Paragraph({
			spacing: { after: 80 },
			children: [new TextRun({
				text: "ATTEST",
				bold: true,
				color: STAMP,
				size: 20,
				font: "Arial"
			})]
		}),
		new Paragraph({
			heading: HeadingLevel.HEADING_1,
			children: [new TextRun({
				text: report.name,
				font: "Arial"
			})]
		}),
		new Paragraph({
			spacing: { after: 200 },
			children: [new TextRun({
				text: `Verdict ${report.grade}  ·  score ${report.score}  ·  ${formatStampDate(new Date(report.auditedAt))}`,
				color: STAMP,
				size: 22,
				font: "Arial"
			})]
		}),
		new Paragraph({
			spacing: { after: 240 },
			children: [new TextRun({
				text: report.summary,
				size: 22,
				font: "Arial",
				color: INK
			})]
		}),
		new Paragraph({
			heading: HeadingLevel.HEADING_2,
			children: [new TextRun({
				text: "Scope",
				font: "Arial"
			})]
		}),
		new Paragraph({
			numbering: {
				reference: "bullets",
				level: 0
			},
			children: [new TextRun({
				text: `Jobs: ${report.stats.jobs}   Steps: ${report.stats.steps}`,
				font: "Arial"
			})]
		}),
		new Paragraph({
			numbering: {
				reference: "bullets",
				level: 0
			},
			children: [new TextRun({
				text: `Triggers: ${report.stats.triggers.join(", ")}`,
				font: "Arial"
			})]
		}),
		new Paragraph({
			numbering: {
				reference: "bullets",
				level: 0
			},
			children: [new TextRun({
				text: `GITHUB_TOKEN ${report.stats.usesGithubToken ? "present" : "not referenced"}${report.stats.usesAppToken ? " · GitHub App token path detected" : ""}`,
				font: "Arial"
			})]
		}),
		new Paragraph({
			heading: HeadingLevel.HEADING_2,
			children: [new TextRun({
				text: "Findings",
				font: "Arial"
			})]
		})
	];
	const narrative = report.findings.flatMap((f, i) => [
		new Paragraph({
			heading: HeadingLevel.HEADING_3,
			children: [new TextRun({
				text: `F-${String(i + 1).padStart(3, "0")}  ${f.title}`,
				font: "Arial"
			})]
		}),
		new Paragraph({
			spacing: { after: 80 },
			children: [new TextRun({
				text: `${f.severity.toUpperCase()}${f.location ? " · " + f.location : ""}`,
				color: severityColor(f.severity),
				italics: true,
				size: 20,
				font: "Arial"
			})]
		}),
		new Paragraph({
			spacing: { after: 80 },
			children: [new TextRun({
				text: f.detail,
				size: 22,
				font: "Arial"
			})]
		}),
		new Paragraph({
			spacing: { after: 240 },
			children: [new TextRun({
				text: "Remediation. ",
				bold: true,
				size: 22,
				font: "Arial"
			}), new TextRun({
				text: f.remediation,
				size: 22,
				font: "Arial"
			})]
		})
	]);
	const doc = new File({
		styles: {
			default: { document: { run: {
				font: "Arial",
				size: 22
			} } },
			paragraphStyles: [
				{
					id: "Heading1",
					name: "Heading 1",
					basedOn: "Normal",
					next: "Normal",
					quickFormat: true,
					run: {
						size: 36,
						bold: true,
						font: "Arial",
						color: INK
					},
					paragraph: {
						spacing: {
							before: 0,
							after: 160
						},
						outlineLevel: 0
					}
				},
				{
					id: "Heading2",
					name: "Heading 2",
					basedOn: "Normal",
					next: "Normal",
					quickFormat: true,
					run: {
						size: 28,
						bold: true,
						font: "Arial",
						color: INK
					},
					paragraph: {
						spacing: {
							before: 280,
							after: 120
						},
						outlineLevel: 1
					}
				},
				{
					id: "Heading3",
					name: "Heading 3",
					basedOn: "Normal",
					next: "Normal",
					quickFormat: true,
					run: {
						size: 24,
						bold: true,
						font: "Arial",
						color: INK
					},
					paragraph: {
						spacing: {
							before: 200,
							after: 80
						},
						outlineLevel: 2
					}
				}
			]
		},
		numbering: { config: [{
			reference: "bullets",
			levels: [{
				level: 0,
				format: LevelFormat.BULLET,
				text: "•",
				alignment: AlignmentType.LEFT,
				style: { paragraph: { indent: {
					left: 720,
					hanging: 360
				} } }
			}]
		}] },
		sections: [{
			properties: { page: {
				size: {
					width: 12240,
					height: 15840
				},
				margin: {
					top: 1440,
					right: 1440,
					bottom: 1440,
					left: 1440
				}
			} },
			headers: { default: new Header({ children: [new Paragraph({
				border: { bottom: {
					style: BorderStyle.SINGLE,
					size: 12,
					color: STAMP,
					space: 4
				} },
				children: [new TextRun({
					text: "ATTEST  ·  GitHub Actions security audit",
					size: 18,
					color: MUTED,
					font: "Arial"
				})]
			})] }) },
			footers: { default: new Footer({ children: [new Paragraph({
				border: { top: {
					style: BorderStyle.SINGLE,
					size: 6,
					color: RULE,
					space: 6
				} },
				children: [new TextRun({
					text: "Confidential to the workflow owner  ·  Page ",
					size: 16,
					color: MUTED,
					font: "Arial"
				}), new TextRun({
					children: [PageNumber.CURRENT],
					size: 16,
					color: MUTED,
					font: "Arial"
				})]
			})] }) },
			children: [
				...children,
				new Table({
					width: {
						size: W,
						type: WidthType.DXA
					},
					columnWidths: cols,
					rows: [headerRow, ...bodyRows]
				}),
				...narrative
			]
		}]
	});
	const blob = await Packer.toBlob(doc);
	downloadBlob(blob, `attest-${slugify(report.name)}.docx`);
}
//#endregion
export { exportDocx };
