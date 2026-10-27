// Volkswagen-style German payroll statement ("Monatsabrechnung").
// Single source of truth for the studio preview, the template preview and the PDF route.

export interface VwPayslipData {
  highlight: boolean;
  // Header / address window
  abrechnungsmonat: string;
  blatt: string;
  postNr: string;
  kostenstelle: string;
  abteilung: string;
  werkCode: string;
  personalnummer: string;
  zusatzNr: string;
  anrede: string;
  name: string;
  strasse: string;
  plzOrt: string;
  // Personal data box
  beginnBeschaeftigung: string;
  endeBeschaeftigung: string;
  geburtsdatum: string;
  steuerId: string;
  steuerklasse: string;
  faktor: string;
  kinderfreibetraege: string;
  konfession: string;
  steuerfreibetrag: string;
  hinzurechnungsbetrag: string;
  svNummer: string;
  beitragsgruppe: string;
  pvZuschlag: string;
  gleitzone: string;
  krankenkasse: string;
  kvSatz: string;
  rvSatz: string;
  pvSatz: string;
  alvSatz: string;
  // Gross / tax
  entgelt: number;
  gesamtbrutto: number;
  steuerTage: number;
  steuerpflichtig: number;
  lohnsteuer: number;
  kirchensteuer: number;
  soli: number;
  spenden: number;
  // Social security
  svTage: number;
  svBrutto: number;
  kvAn: number;
  pvAn: number;
  rvAn: number;
  alvAn: number;
  // Other deductions / payment
  werkausweis: number;
  restcentspende: number;
  iban: string;
  // Leave / time accounts
  flexVormonat: string;
  flexGesamt: string;
  raVormonat: string;
  raGesamt: string;
  urlaubGesamt: string;
  urlaubEntnahme: string;
  urlaubRest: string;
  freistGesamt: string;
  freistEntnahme: string;
  freistRest: string;
  rabattFb: number;
}

export type VwFieldKey = Exclude<keyof VwPayslipData, "highlight">;

export const defaultVwPayslipData: VwPayslipData = {
  highlight: true,
  abrechnungsmonat: "Januar 2026",
  blatt: "1",
  postNr: "011 18 0 01 261",
  kostenstelle: "17080",
  abteilung: "ECB/W3",
  werkCode: "1I030000",
  personalnummer: "04129808",
  zusatzNr: "14.084",
  anrede: "Frau",
  name: "Merve Ünlü",
  strasse: "Beethovenstraße 45",
  plzOrt: "38518 Gifhorn",
  beginnBeschaeftigung: "01.09.2017",
  endeBeschaeftigung: "",
  geburtsdatum: "15.01.2000",
  steuerId: "64895720439",
  steuerklasse: "3",
  faktor: "",
  kinderfreibetraege: "0,0",
  konfession: "--",
  steuerfreibetrag: "/",
  hinzurechnungsbetrag: "/",
  svNummer: "69150100K506",
  beitragsgruppe: "1111",
  pvZuschlag: "nein",
  gleitzone: "nein / nein",
  krankenkasse: "BKK Audi",
  kvSatz: "7.925",
  rvSatz: "9.30",
  pvSatz: "1.2000",
  alvSatz: "1.30",
  entgelt: 5951.4,
  gesamtbrutto: 6112.9,
  steuerTage: 30,
  steuerpflichtig: 6111.65,
  lohnsteuer: 603.32,
  kirchensteuer: 0,
  soli: 0,
  spenden: 1.25,
  svTage: 30,
  svBrutto: 6112.9,
  kvAn: 476.81,
  pvAn: 140.6,
  rvAn: 568.5,
  alvAn: 79.47,
  werkausweis: 30,
  restcentspende: 1.25,
  iban: "DE27XXXXXXXXXXXXXXXX4738",
  flexVormonat: "4,93",
  flexGesamt: "4,93",
  raVormonat: "0,44-",
  raGesamt: "0,44-",
  urlaubGesamt: "30",
  urlaubEntnahme: "16",
  urlaubRest: "24",
  freistGesamt: "6,00",
  freistEntnahme: "0,00",
  freistRest: "6,00",
  rabattFb: 1080,
};

type FieldType = "text" | "number";

export interface VwFieldDef {
  key: VwFieldKey;
  label: string;
  type: FieldType;
  // Yellow/colored in the original document
  highlighted?: boolean;
}

export const vwFieldGroups: { title: string; fields: VwFieldDef[] }[] = [
  {
    title: "Kopf & Anschrift",
    fields: [
      { key: "abrechnungsmonat", label: "Abrechnungsmonat", type: "text", highlighted: true },
      { key: "kostenstelle", label: "Kostenstelle", type: "text", highlighted: true },
      { key: "abteilung", label: "Abteilung", type: "text", highlighted: true },
      { key: "personalnummer", label: "Personalnummer", type: "text", highlighted: true },
      { key: "zusatzNr", label: "Zusatz-Nr.", type: "text", highlighted: true },
      { key: "anrede", label: "Anrede", type: "text", highlighted: true },
      { key: "name", label: "Name", type: "text", highlighted: true },
      { key: "strasse", label: "Straße", type: "text", highlighted: true },
      { key: "plzOrt", label: "PLZ / Ort", type: "text", highlighted: true },
    ],
  },
  {
    title: "Steuer- & SV-Merkmale",
    fields: [
      { key: "geburtsdatum", label: "Geburtsdatum", type: "text", highlighted: true },
      { key: "steuerId", label: "Steuer-ID", type: "text", highlighted: true },
      { key: "svNummer", label: "SV-Nummer", type: "text", highlighted: true },
      { key: "beitragsgruppe", label: "Beitragsgruppenschl.", type: "text", highlighted: true },
      { key: "pvZuschlag", label: "Zuschlag PV", type: "text", highlighted: true },
      { key: "gleitzone", label: "Gleitzone / Mehrf.", type: "text", highlighted: true },
      { key: "krankenkasse", label: "Krankenkasse", type: "text", highlighted: true },
      { key: "kvSatz", label: "KV-AN %", type: "text", highlighted: true },
      { key: "rvSatz", label: "RV-AN %", type: "text", highlighted: true },
      { key: "pvSatz", label: "PV-AN %", type: "text", highlighted: true },
      { key: "alvSatz", label: "Alv-AN %", type: "text", highlighted: true },
      { key: "beginnBeschaeftigung", label: "Beginn Beschäftigung", type: "text" },
      { key: "steuerklasse", label: "Steuerklasse", type: "text" },
    ],
  },
  {
    title: "Beträge (EUR)",
    fields: [
      { key: "entgelt", label: "Entgelt", type: "number", highlighted: true },
      { key: "spenden", label: "Spenden", type: "number", highlighted: true },
      { key: "kvAn", label: "KV-AN", type: "number", highlighted: true },
      { key: "pvAn", label: "PV-AN", type: "number", highlighted: true },
      { key: "rvAn", label: "RV-AN", type: "number", highlighted: true },
      { key: "alvAn", label: "Alv-AN", type: "number", highlighted: true },
      { key: "werkausweis", label: "Aufwertung Werkausweis", type: "number", highlighted: true },
      { key: "restcentspende", label: "Restcentspende", type: "number", highlighted: true },
      { key: "iban", label: "IBAN", type: "text", highlighted: true },
      { key: "gesamtbrutto", label: "Gesamtbrutto", type: "number" },
      { key: "steuerpflichtig", label: "Steuerpfl. Brutto", type: "number" },
      { key: "lohnsteuer", label: "Lohnsteuer", type: "number" },
      { key: "kirchensteuer", label: "Kirchensteuer", type: "number" },
      { key: "soli", label: "SolZ", type: "number" },
      { key: "svBrutto", label: "SV-Brutto", type: "number" },
    ],
  },
  {
    title: "Freizeit",
    fields: [
      { key: "urlaubGesamt", label: "Urlaub gesamt", type: "text" },
      { key: "urlaubEntnahme", label: "Urlaub Entn.", type: "text" },
      { key: "urlaubRest", label: "Urlaub Rest", type: "text" },
      { key: "flexVormonat", label: "Flexikonto Vormonat", type: "text" },
      { key: "flexGesamt", label: "Flexikonto Gesamt", type: "text" },
      { key: "raVormonat", label: "RA-Konto Vormonat", type: "text" },
      { key: "raGesamt", label: "RA-Konto Gesamt", type: "text" },
    ],
  },
];

const numberKeys = new Set<VwFieldKey>(
  vwFieldGroups.flatMap((g) => g.fields).filter((f) => f.type === "number").map((f) => f.key)
);
numberKeys.add("steuerTage");
numberKeys.add("svTage");
numberKeys.add("rabattFb");

export function isVwNumberField(key: VwFieldKey) {
  return numberKeys.has(key);
}

/** Parses "5.951,40", "5951.40" or "30,00-" into a number. */
export function parseGermanNumber(raw: string): number {
  let text = raw.trim().replace(/\s/g, "");
  const negative = text.endsWith("-") || text.startsWith("-");
  text = text.replace(/-/g, "");
  if (text.includes(",")) text = text.replace(/\./g, "").replace(",", ".");
  const value = Number(text);
  if (!Number.isFinite(value)) return 0;
  return negative ? -value : value;
}

export function euro(value: number) {
  return (Number(value) || 0).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** German payroll style: negative amounts carry a trailing minus ("31,25-"). */
function euroMinus(value: number) {
  return `${euro(Math.abs(value))}-`;
}

export function normalizeVwData(input?: Partial<VwPayslipData> | null): VwPayslipData {
  const merged = { ...defaultVwPayslipData, ...(input || {}) } as VwPayslipData;
  numberKeys.forEach((key) => {
    (merged as unknown as Record<string, number>)[key] = Number(merged[key]) || 0;
  });
  return merged;
}

export function calculateVwTotals(data: VwPayslipData) {
  const summeSteuern = data.lohnsteuer + data.kirchensteuer + data.soli;
  const summeSv = data.kvAn + data.pvAn + data.rvAn + data.alvAn;
  const netto = data.gesamtbrutto - summeSteuern - summeSv;
  const sonstige = data.werkausweis + data.restcentspende;
  const auszahlung = netto - sonstige;
  return { summeSteuern, summeSv, netto, sonstige, auszahlung };
}

function esc(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

interface Placed {
  col: number;
  text: string;
  html: string;
}

/**
 * Builds one monospace line by placing items at fixed character columns,
 * mimicking the fixed-width print layout of the original statement.
 * Positive col = start column, `{ end }` = right-aligned to that column.
 */
function line(items: { at?: number; end?: number; text: string; html?: string }[]) {
  const placed: Placed[] = items
    .map((item) => {
      const col = item.end !== undefined ? item.end - item.text.length : item.at ?? 0;
      return { col: Math.max(col, 0), text: item.text, html: item.html ?? esc(item.text) };
    })
    .sort((a, b) => a.col - b.col);

  let out = "";
  let cursor = 0;
  for (const item of placed) {
    const gap = item.col > cursor ? item.col - cursor : cursor > 0 ? 1 : 0;
    out += " ".repeat(gap) + item.html;
    cursor += gap + item.text.length;
  }
  return out;
}

const spaced = (text: string) => text.split("").join(" ");

export function buildVolkswagenFragment(
  input: Partial<VwPayslipData> | null | undefined,
  options: { editable?: boolean } = {}
) {
  const d = normalizeVwData(input);
  const t = calculateVwTotals(d);
  const editable = Boolean(options.editable);

  // Highlighted (editable) value: returns {text, html} for monospace placement.
  const mark = (key: VwFieldKey, display: string, tone = "y") => {
    const attrs = editable
      ? ` data-vw-field="${key}" contenteditable="true" spellcheck="false"`
      : "";
    return {
      text: display,
      html: `<span class="hl hl-${tone}"${attrs}>${esc(display)}</span>`,
    };
  };
  const m = (key: VwFieldKey, tone?: string) => {
    const value = d[key];
    const display = isVwNumberField(key) ? euro(value as number) : String(value ?? "");
    return mark(key, display, tone).html;
  };
  const mNum = (key: VwFieldKey, tone?: string, suffixMinus = false) =>
    mark(key, suffixMinus ? euroMinus(d[key] as number) : euro(d[key] as number), tone);
  const plain = (key: VwFieldKey) => {
    const attrs = editable
      ? ` class="ed" data-vw-field="${key}" contenteditable="true" spellcheck="false"`
      : "";
    const value = d[key];
    return `<span${attrs}>${esc(isVwNumberField(key) ? euro(value as number) : value)}</span>`;
  };

  const css = `
.vw{--hl-y:#fcd34d;--hl-g:#4ade80;--hl-b:#60a5fa;--hl-r:#f87171;--hl-p:#c084fc;width:794px;min-height:1123px;margin:0 auto;padding:44px 34px 40px 52px;background:#fff;color:#111;font-family:Arial,Helvetica,sans-serif;position:relative;box-sizing:border-box;text-align:left;display:flex;flex-direction:column}
.vw *{box-sizing:border-box}
.vw.no-hl .hl{background:transparent!important}
.vw .hl{border-radius:3px;padding:0 1px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.vw .hl-y{background:var(--hl-y)}.vw .hl-g{background:var(--hl-g)}.vw .hl-b{background:var(--hl-b)}.vw .hl-r{background:var(--hl-r)}.vw .hl-p{background:var(--hl-p)}
.vw [contenteditable]{outline:none;cursor:text}.vw [contenteditable]:hover{box-shadow:0 0 0 1px #2563eb}.vw [contenteditable]:focus{box-shadow:0 0 0 2px #2563eb;background:#fff7cc}
.vw .head{display:flex;justify-content:space-between;align-items:flex-start;height:300px;position:relative}
.vw .title{font-size:13.6px;line-height:1.42;margin:0}
.vw .small{font-size:9.2px;line-height:1.9;margin:0}
.vw .company{position:absolute;left:400px;top:-26px;text-align:center;font-size:13.6px;line-height:1.35}
.vw .logo{position:absolute;right:56px;top:-30px;width:52px;height:52px}
.vw .window{position:absolute;left:21px;top:130px;font-size:8px;line-height:1.5;width:310px}
.vw .window .row{display:flex;justify-content:space-between;font-size:9px}
.vw .window .conf{font-size:12px;margin-top:1px}
.vw .addr{font-size:14px;line-height:1.38;margin-top:10px}
.vw .addr .tag{position:absolute;left:196px;top:44px;font-family:"Courier New",Courier,monospace;font-size:10px}
.vw .pbox{position:absolute;left:400px;top:72px;width:328px;border:1px solid #111;padding:2px 3px 4px;font-size:9.1px;line-height:1.265}
.vw .pbox .t{font-weight:bold;font-size:9.3px;border-bottom:1px solid #111;margin:0 -3px 1px;padding:0 3px 1px}
.vw .pbox .r{display:flex;justify-content:space-between;gap:6px}
.vw .pbox .rates{display:grid;grid-template-columns:auto 1fr auto 1fr;column-gap:8px}
.vw .mono{font-family:"Courier New",Courier,monospace;font-size:10.6px;line-height:1.3;white-space:normal;color:#111}
.vw .mono .l,.vw .mono .v,.vw .fgrid>div,.vw .kum{white-space:pre}
.vw .tbl{margin-top:4px;width:708px}
.vw .tr{display:grid;grid-template-columns:604px 104px;border-bottom:1px solid #111}
.vw .tr.nob{border-bottom:none}
.vw .tr>.l{border-right:1px solid #111;padding:2px 0 3px}
.vw .tr>.v{text-align:right;padding:2px 0 3px}
.vw .tr.hd>.l{padding:5px 0 3px}
.vw .tr.top>.l{border-right:none;border-bottom:1px solid #111;align-self:end}
.vw .tr.top>.v{text-align:left;padding-left:6px}
.vw .gap{height:6px}
.vw .ftbl{width:708px;margin-top:2px;border-bottom:1px solid #111}
.vw .fgrid{display:grid;grid-template-columns:412px 296px}
.vw .fgrid>.l{border-right:1px solid #111}
.vw .kum{margin-top:auto;width:708px;border-top:1px solid #111;padding-top:4px}
@media print{#printable-payslip .vw *{border-color:#111!important;color:#111!important}}
`;

  const vwLogo = `<svg class="logo" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="45" fill="none" stroke="#111" stroke-width="7"/><path d="M26 15 L50 57 L74 15" fill="none" stroke="#111" stroke-width="6.5" stroke-linejoin="miter"/><path d="M9 35 L31 86 L50 63 L69 86 L91 35" fill="none" stroke="#111" stroke-width="6.5" stroke-linejoin="miter"/></svg>`;

  // Monospace blocks. Column positions mirror the original print.
  const L = 95; // characters in the left column

  const steuerLines = [
    line([
      { at: 9, text: "ST-Tg" },
      { at: 17, text: "Stpfl.Jahr" },
      { at: 34, text: "Stpfl." },
      { at: 55, text: "LSt" },
      { at: 70, text: "KiSt" },
      { at: 86, text: "SolZ" },
    ]),
    line([
      { at: 6, text: "M" },
      { at: 9, text: String(d.steuerTage) },
      { end: 43, text: euro(d.steuerpflichtig) },
      { end: 58, text: euro(d.lohnsteuer) },
      ...(d.kirchensteuer ? [{ end: 74, text: euro(d.kirchensteuer) }] : []),
      ...(d.soli ? [{ end: 90, text: euro(d.soli) }] : []),
    ]),
    line([
      { at: 31, text: "Spenden:" },
      { end: 48, ...mNum("spenden") },
      { at: 49, text: "EUR haben den steuerpfl.Verdienst gemindert" },
    ]),
  ];

  const svLines = [
    line([
      { at: 9, text: "SV-Tg" },
      { at: 20, text: "SV-Verd." },
      { at: 31, text: "KV/PV Verd." },
      { at: 44, text: "RV/Alv Verd." },
      { at: 60, text: "KV-AN" },
      { at: 69, text: "PV-AN" },
      { at: 78, text: "RV-AN" },
      { at: 87, text: "Alv-AN" },
    ]),
    line([
      { at: 6, text: "L" },
      { at: 9, text: String(d.svTage) },
      { at: 20, text: euro(d.svBrutto) },
      { at: 34, text: euro(d.svBrutto) },
      { at: 48, text: euro(d.svBrutto) },
      { end: 65, ...mNum("kvAn", "g") },
      { end: 74, ...mNum("pvAn", "b") },
      { end: 83, ...mNum("rvAn", "r") },
      { end: 92, ...mNum("alvAn", "p") },
    ]),
  ];

  const kumRows: [string, string, string, string, string, string, string, string][] = [
    ["Ges. Brutto", euro(d.gesamtbrutto), "RV-pfl.Verd.", euro(d.svBrutto), "Verm.Anlage", "0,00", "freiw.KV-Beitr", "0,00"],
    ["", "", "RV-pfl.Verd.VJ", "0,00", "Lohnersatzl.", "0,00", "AG-Zusch.KV", "0,00"],
    ["St-pfl.Verd.", euro(d.steuerpflichtig), "KV-Anteil", euro(d.kvAn), "Versorg.Bez.", "0,00", "freiw.PV-Beitr", "0,00"],
    ["Lohnsteuer", euro(d.lohnsteuer), "PV-Anteil", euro(d.pvAn), "DBA-Verd.", "0,00", "AG-Zusch.PV", "0,00"],
    ["SolZ", euro(d.soli), "RV-Anteil", euro(d.rvAn), "ZWP", "0,00", "Zusch.Altersv.", "0,00"],
    ["KiSt", euro(d.kirchensteuer), "Alv-Anteil", euro(d.alvAn), "BTR II", "0,00", "vorh.Rabatt-FB", euro(d.rabattFb)],
    ["", "", "", "", "BARL", "0,00", "", ""],
  ];
  const kumLines = kumRows.map((r) =>
    line([
      { at: 0, text: r[0] },
      { end: 26, text: r[1] },
      { at: 28, text: r[2] },
      { end: 54, text: r[3] },
      { at: 57, text: r[4] },
      { end: 80, text: r[5] },
      { at: 84, text: r[6] },
      { end: 110, text: r[7] },
    ])
  );

  const hlClass = d.highlight ? "" : " no-hl";

  const html = `<div class="vw${hlClass}">
<div class="head">
  <div>
    <p class="title">Monatsabrechnung für ${m("abrechnungsmonat")}<br/>Gilt als Verdienstbescheinigung<br/>Bitte sorgfältig aufbewahren</p>
    <p class="small" style="margin-top:6px">Bescheinigung nach § 108 Absatz 3 Satz 1<br/>der Gewerbeordnung<br/>Blatt ${esc(d.blatt)}</p>
  </div>
  <div class="company">Volkswagen AG<br/>Berliner Ring 2<br/>38436 Wolfsburg</div>
  ${vwLogo}
  <div class="window">
    <div>Volkswagen AG * Brieffach 1403 * 38436 Wolfsburg</div>
    <div class="row"><span>${esc(d.postNr)} ${m("kostenstelle")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${m("abteilung")}</span><span>${esc(d.werkCode)}</span><span>${m("personalnummer")}</span></div>
    <div class="conf">-persönlich/vertraulich-</div>
    <div class="addr">
      <span class="tag">${m("zusatzNr")}</span>
      ${m("anrede")}<br/>${m("name")}<br/>${m("strasse")}<br/>${m("plzOrt")}
    </div>
  </div>
  <div class="pbox">
    <div class="t">PERSÖNLICHE DATEN SOWIE STEUER- UND SV-MERKMALE</div>
    <div>Name: ${m("name")}</div>
    <div class="r"><span>Personalnummer:</span>${plain("personalnummer")}</div>
    <div class="r"><span>Beginn der Beschäftigung:</span>${plain("beginnBeschaeftigung")}</div>
    <div class="r"><span>Ende der Beschäftigung:</span>${plain("endeBeschaeftigung")}</div>
    <div class="r"><span>Geburtsdatum:</span>${m("geburtsdatum")}</div>
    <div class="r"><span>Steueridentifikationsnummer:</span>${m("steuerId")}</div>
    <div class="r"><span>Steuerklasse / Faktor:</span><span style="margin-right:70px">${plain("steuerklasse")} / ${plain("faktor")}</span></div>
    <div class="r"><span>Zahl der Kinderfreibeträge:</span>${plain("kinderfreibetraege")}</div>
    <div class="r"><span>Konfession:</span>${plain("konfession")}</div>
    <div class="r"><span>Steuerfreibetrag Monat / Jahr:</span><span style="margin-right:70px">${plain("steuerfreibetrag")}</span></div>
    <div class="r"><span>Hinzurechnungsbetrag Monat / Jahr:</span><span style="margin-right:70px">${plain("hinzurechnungsbetrag")}</span></div>
    <div class="r"><span>Sozialversicherungsnummer:</span>${m("svNummer")}</div>
    <div class="r"><span>Beitragsgruppenschlüssel:</span>${m("beitragsgruppe")}</div>
    <div class="r"><span>Beitragszuschlag Pflegeversicherung:</span>${m("pvZuschlag")}</div>
    <div class="r"><span>Gleitzone / Mehrfachbeschäftigung:</span>${m("gleitzone")}</div>
    <div class="r"><span>Krankenkasse:</span>${m("krankenkasse")}</div>
    <div class="rates">
      <span>KV-AN:</span><span>${m("kvSatz", "g")}%</span><span>RV-AN:</span><span>${m("rvSatz", "r")}%</span>
      <span>PV-AN:</span><span>${m("pvSatz", "b")}%</span><span>Alv-AN:</span><span>${m("alvSatz", "p")}%</span>
    </div>
  </div>
</div>

<div class="tbl mono">
  <div class="tr top nob"><div class="l">${spaced("GESAMTBRUTTOVERDIENST")}</div><div class="v">Brutto/Netto
Rechnung EUR</div></div>
  <div class="tr"><div class="l" style="padding-top:4px">${line([{ at: 0, text: "GRUNDBEZÜGE/ZUSCHLÄGE" }, { at: 59, text: "Std." }, { at: 65, text: "Std-Satz" }])}
${line([{ at: 6, text: "Entgelt" }, { end: L - 3, ...mNum("entgelt") }])}</div><div class="v"></div></div>
  <div class="tr hd"><div class="l">${spaced("GESAMTBRUTTOENTGELT")}</div><div class="v">${euro(d.gesamtbrutto)}</div></div>
  <div class="tr"><div class="l">${line([{ at: 0, text: "Gesamtbruttoentgelt" }, { at: 41, text: "(EBV)" }, { end: 64, text: euro(d.gesamtbrutto) }])}</div><div class="v"></div></div>
  <div class="tr hd"><div class="l">${spaced("GESETZLICHE")}   ${spaced("ABZÜGE")}</div><div class="v"></div></div>
  <div class="tr"><div class="l">STEUERPFLICHTIGER ARBEITSLOHN
${steuerLines.join("\n")}
Summe Steuern</div><div class="v"><br/><br/><br/><br/>${euro(t.summeSteuern)}</div></div>
  <div class="tr"><div class="l">SOZIALVERSICHERUNGSBRUTTOENTGELT
${svLines.join("\n")}
Summe Sozialversicherung</div><div class="v"><br/><br/><br/>${euro(t.summeSv)}</div></div>
  <div class="tr hd"><div class="l">${spaced("NETTOENTGELT")}</div><div class="v">${euro(t.netto)}</div></div>
  <div class="tr"><div class="l">${line([{ at: 0, text: "Nettoentgelt" }, { at: 41, text: "(EBV)" }, { end: 64, text: euro(t.netto) }])}</div><div class="v"></div></div>
  <div class="tr hd"><div class="l">${spaced("SONSTIGE")}  ${spaced("ZULAGEN/ABZÜGE")}</div><div class="v"></div></div>
  <div class="tr"><div class="l"><div class="gap"></div>${line([{ at: 6, text: "Aufwertung Werkausweis" }, { end: L - 2, ...mNum("werkausweis", "y", true) }])}
${line([{ at: 6, text: "Restcentspende aus ULTIMO Vormonat" }, { end: L - 2, ...mNum("restcentspende", "y", true) }])}</div><div class="v"></div></div>
  <div class="tr"><div class="l">Summe Sonst. Zul./Abzüge</div><div class="v">${euroMinus(t.sonstige)}</div></div>
  <div class="tr hd"><div class="l">${spaced("ZAHLUNGEN/VORTRAG")}  ${spaced("FOLGEMONAT")}</div><div class="v"></div></div>
  <div class="tr"><div class="l"><div class="gap"></div>${line([{ at: 36, text: "IBAN" }])}
${line([{ at: 6, text: "Zahlung Ultimo" }, { at: 36, ...mark("iban", d.iban) }])}</div><div class="v"><br/><div class="gap"></div>${euro(t.auszahlung)}</div></div>
  <div class="tr nob"><div class="l" style="border-bottom:1px solid #111">${line([{ at: 0, text: "Auszahlungsbetrag" }, { at: 41, text: "(EBV)" }, { end: 64, text: euro(t.auszahlung) }])}</div><div class="v"></div></div>
</div>

<div class="ftbl mono">
  <div>${spaced("FREIZEITANGABEN")}</div>
  <div class="fgrid">
    <div class="l">${line([{ at: 0, text: "Freizeit in Stunden aus:" }, { at: 28, text: "Vormonat" }, { at: 38, text: "Zugang" }, { at: 47, text: "Entnahme" }, { at: 57, text: "Gesamt" }])}


${line([{ at: 6, text: "Flexikonto" }, { end: 36, text: d.flexVormonat, html: plain("flexVormonat") }, { end: 63, text: d.flexGesamt, html: plain("flexGesamt") }])}
${line([{ at: 6, text: "RA-Konto" }, { end: 36, text: d.raVormonat, html: plain("raVormonat") }, { end: 63, text: d.raGesamt, html: plain("raGesamt") }])}</div>
    <div style="padding-left:2px">${line([{ at: 0, text: "Freizeit in Tagen" }, { at: 23, text: "Gesamt" }, { at: 31, text: "Entn." }, { at: 39, text: "Rest" }])}

${line([{ at: 0, text: "Tarifurlaub" }, { at: 12, text: "Lfd.Jahr" }, { end: 27, text: d.urlaubGesamt, html: plain("urlaubGesamt") }, { end: 34, text: d.urlaubEntnahme, html: plain("urlaubEntnahme") }, { end: 43, text: d.urlaubRest, html: plain("urlaubRest") }])}

${line([{ at: 0, text: "Tarifl. Freist. Lfd.Jahr" }, { end: 29, text: d.freistGesamt }, { end: 36, text: d.freistEntnahme }, { end: 43, text: d.freistRest }])}

</div>
  </div>
</div>

<div class="kum mono">${spaced("KUMULATIVWERTE")}  ${spaced("LFD.")} ${spaced("JAHR")}
${kumLines.join("\n")}</div>
</div>`;

  return `<style>${css}</style>${html}`;
}

/** Full A4 HTML document, used by the Puppeteer PDF route. */
export function buildVolkswagenDocument(input: Partial<VwPayslipData> | null | undefined) {
  return `<!doctype html><html><head><meta charset="utf-8"/><style>@page{size:A4;margin:0}html,body{margin:0;padding:0;background:#fff}</style></head><body>${buildVolkswagenFragment(input)}</body></html>`;
}
