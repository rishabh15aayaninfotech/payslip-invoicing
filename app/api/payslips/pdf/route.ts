import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export const runtime = "nodejs";

type TemplateLayout = "Corporate" | "Minimal" | "Executive" | "Startup";

interface PayslipPdfPayload {
  templateLayout?: TemplateLayout;
  formData?: {
    id: string;
    companyName: string;
    companyAddress: string;
    cin: string;
    gstin: string;
    empCode: string;
    empName: string;
    email: string;
    designation: string;
    department: string;
    month: string;
    year: string;
    dateOfJoining: string;
    bankName: string;
    accountNo: string;
    ifsc: string;
    pan: string;
    uan: string;
    workingDays: number;
    paidDays: number;
    lopDays: number;
    basic: number;
    hra: number;
    specialAllowance: number;
    conveyance: number;
    bonus: number;
    pf: number;
    pt: number;
    tds: number;
    insurance: number;
    lop: number;
    showLogo: boolean;
    showCompanyAddress: boolean;
    showPanUan: boolean;
    showBankDetails: boolean;
    showAttendance: boolean;
    showAmountInWords: boolean;
    showSignatory: boolean;
    notes: string;
  };
}

function money(amount: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Number(amount) || 0);
}

function numberToWordsINR(amount: number): string {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  if (amount <= 0) return "Zero Rupees Only";

  const convertTwoDigits = (n: number) => {
    if (n < 20) return ones[n];
    const ten = Math.floor(n / 10);
    const one = n % 10;
    return `${tens[ten]}${one ? ` ${ones[one]}` : ""}`;
  };

  const convertThreeDigits = (n: number) => {
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    let out = "";
    if (hundred) out += `${ones[hundred]} Hundred`;
    if (rest) out += `${hundred ? " " : ""}${convertTwoDigits(rest)}`;
    return out;
  };

  let rem = Math.floor(amount);
  const crore = Math.floor(rem / 10000000);
  rem %= 10000000;
  const lakh = Math.floor(rem / 100000);
  rem %= 100000;
  const thousand = Math.floor(rem / 1000);
  rem %= 1000;
  const rest = rem;

  let words = "";
  if (crore) words += `${convertTwoDigits(crore)} Crore `;
  if (lakh) words += `${convertTwoDigits(lakh)} Lakh `;
  if (thousand) words += `${convertTwoDigits(thousand)} Thousand `;
  if (rest) words += convertThreeDigits(rest);
  return `${words.trim()} Rupees Only`;
}

function getTheme(layout: TemplateLayout) {
  switch (layout) {
    case "Minimal":
      return { accent: "#64748b", line: "#1f2937", bg: "#ffffff", muted: "#475569" };
    case "Executive":
      return { accent: "#059669", line: "#065f46", bg: "#ffffff", muted: "#475569" };
    case "Startup":
      return { accent: "#7c3aed", line: "#6d28d9", bg: "#ffffff", muted: "#475569" };
    case "Corporate":
    default:
      return { accent: "#2563eb", line: "#1d4ed8", bg: "#ffffff", muted: "#475569" };
  }
}

function buildHtml(payload: Required<PayslipPdfPayload>["formData"], layout: TemplateLayout) {
  const gross =
    (Number(payload.basic) || 0) +
    (Number(payload.hra) || 0) +
    (Number(payload.specialAllowance) || 0) +
    (Number(payload.conveyance) || 0) +
    (Number(payload.bonus) || 0);
  const deductions =
    (Number(payload.pf) || 0) +
    (Number(payload.pt) || 0) +
    (Number(payload.tds) || 0) +
    (Number(payload.insurance) || 0) +
    (Number(payload.lop) || 0);
  const net = gross - deductions;
  const theme = getTheme(layout);

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>
        @page { size: A4; margin: 0; }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: ${theme.bg};
          color: #0f172a;
        }
        .page {
          width: 100%;
          padding: 28px;
        }
        .sheet {
          border: 1px solid #dbeafe;
          border-radius: 18px;
          padding: 22px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
          border-bottom: 2px solid ${theme.line};
          padding-bottom: 16px;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .logo {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: ${theme.accent};
          color: #fff;
          font-weight: 700;
          font-size: 12px;
        }
        .title {
          font-size: 15px;
          font-weight: 700;
          margin: 0;
        }
        .muted {
          color: ${theme.muted};
          font-size: 11px;
          line-height: 1.5;
        }
        .badge {
          display: inline-block;
          padding: 6px 10px;
          border-radius: 8px;
          border: 1px solid #bfdbfe;
          color: ${theme.line};
          font-size: 11px;
          font-weight: 700;
        }
        .grid2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }
        .meta {
          padding: 16px 0;
          border-bottom: 1px solid #dbeafe;
          margin-bottom: 10px;
        }
        .meta-row {
          display: flex;
          gap: 10px;
          margin: 4px 0;
          font-size: 12px;
        }
        .label { width: 118px; color: #64748b; }
        .value { color: #0f172a; font-weight: 600; }
        .table {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid #dbeafe;
          border-bottom: 1px solid #dbeafe;
          margin-top: 8px;
        }
        .col {
          padding: 12px 0;
        }
        .col + .col {
          border-left: 1px solid #dbeafe;
          padding-left: 14px;
          margin-left: 14px;
        }
        .section-head {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 10px;
          text-transform: uppercase;
        }
        .section-head.earn { color: ${theme.line}; }
        .section-head.ded { color: #dc2626; }
        .row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          font-size: 12px;
          color: #334155;
          margin: 4px 0;
        }
        .totals {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border-bottom: 1px solid #dbeafe;
          padding: 12px 0;
          font-size: 12px;
          font-weight: 700;
        }
        .net {
          margin-top: 14px;
          border: 1px solid #bfdbfe;
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          background: #eff6ff;
        }
        .footer {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 14px;
          font-size: 11px;
          color: #64748b;
        }
        .sign {
          border-top: 1px dashed #94a3b8;
          min-width: 170px;
          padding-top: 6px;
          text-align: center;
          color: #334155;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="page">
        <div class="sheet">
          <div class="header">
            <div>
              <div class="brand">
                ${payload.showLogo ? '<div class="logo">PI</div>' : ""}
                <div>
                  <p class="title">${payload.companyName}</p>
                  ${payload.showCompanyAddress ? `<div class="muted">${payload.companyAddress}</div><div class="muted">${payload.cin} · ${payload.gstin}</div>` : ""}
                </div>
              </div>
            </div>
            <div style="text-align:right">
              <div class="badge">SALARY SLIP</div>
              <div style="margin-top:8px;font-size:12px;font-weight:700">${payload.month.toUpperCase()} ${payload.year}</div>
              <div class="muted">Ref: ${payload.id}</div>
            </div>
          </div>

          <div class="meta grid2">
            <div>
              <div class="meta-row"><div class="label">Employee Name</div><div class="value">: ${payload.empName}</div></div>
              <div class="meta-row"><div class="label">Employee Code</div><div class="value">: ${payload.empCode}</div></div>
              <div class="meta-row"><div class="label">Designation</div><div class="value">: ${payload.designation}</div></div>
              <div class="meta-row"><div class="label">Department</div><div class="value">: ${payload.department}</div></div>
              <div class="meta-row"><div class="label">Date of Joining</div><div class="value">: ${payload.dateOfJoining}</div></div>
            </div>
            <div>
              ${payload.showBankDetails ? `<div class="meta-row"><div class="label">Bank Name</div><div class="value">: ${payload.bankName}</div></div><div class="meta-row"><div class="label">Bank A/C No.</div><div class="value">: ${payload.accountNo}</div></div>` : ""}
              ${payload.showPanUan ? `<div class="meta-row"><div class="label">PAN / UAN</div><div class="value">: ${payload.pan} / ${payload.uan}</div></div>` : ""}
              ${payload.showAttendance ? `<div class="meta-row"><div class="label">Days Paid</div><div class="value">: ${payload.paidDays} / ${payload.workingDays}</div></div>` : ""}
            </div>
          </div>

          <div class="table">
            <div class="col">
              <div class="section-head earn"><span>Earnings Particulars</span><span>Amount (₹)</span></div>
              <div class="row"><span>Basic Salary</span><span>₹${money(payload.basic)}</span></div>
              <div class="row"><span>House Rent Allowance (HRA)</span><span>₹${money(payload.hra)}</span></div>
              <div class="row"><span>Special Allowance</span><span>₹${money(payload.specialAllowance)}</span></div>
              <div class="row"><span>Conveyance</span><span>₹${money(payload.conveyance)}</span></div>
              ${Number(payload.bonus) > 0 ? `<div class="row"><span>Bonus / Incentive</span><span>₹${money(payload.bonus)}</span></div>` : ""}
            </div>
            <div class="col">
              <div class="section-head ded"><span>Deductions Particulars</span><span>Amount (₹)</span></div>
              <div class="row"><span>Provident Fund (PF)</span><span>₹${money(payload.pf)}</span></div>
              <div class="row"><span>Professional Tax (PT)</span><span>₹${money(payload.pt)}</span></div>
              <div class="row"><span>Income Tax (TDS)</span><span>₹${money(payload.tds)}</span></div>
              <div class="row"><span>Health Insurance</span><span>₹${money(payload.insurance)}</span></div>
              ${Number(payload.lop) > 0 ? `<div class="row"><span>Loss of Pay (LOP)</span><span>₹${money(payload.lop)}</span></div>` : ""}
            </div>
          </div>

          <div class="totals">
            <div class="row" style="font-size:12px;font-weight:700;color:#0f172a">
              <span>Total Gross Earnings</span>
              <span>₹${money(gross)}</span>
            </div>
            <div class="row" style="font-size:12px;font-weight:700;color:#dc2626">
              <span>Total Deductions</span>
              <span>₹${money(deductions)}</span>
            </div>
          </div>

          <div class="net">
            <div>
              <div style="font-size:12px;font-weight:700;color:${theme.line};text-transform:uppercase">Net Take-Home Pay:</div>
              ${payload.showAmountInWords ? `<div style="font-size:11px;color:#1d4ed8;margin-top:4px"><strong>In Words:</strong> ${numberToWordsINR(net)}</div>` : ""}
            </div>
            <div style="font-size:22px;font-weight:700;color:${theme.line}">₹${money(net)}</div>
          </div>

          <div class="footer">
            <div style="max-width: 420px; line-height: 1.5">${payload.notes || ""}</div>
            ${payload.showSignatory ? `<div class="sign">Authorized Signatory</div>` : ""}
          </div>
        </div>
      </div>
    </body>
  </html>`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PayslipPdfPayload;
    if (!body?.formData) {
      return NextResponse.json({ success: false, error: "Payslip data is required" }, { status: 400 });
    }

    const layout = body.templateLayout || "Corporate";
    const html = buildHtml(body.formData, layout);

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1240, height: 1754, deviceScaleFactor: 1 });
      await page.setContent(html, { waitUntil: "load" });
      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "0", right: "0", bottom: "0", left: "0" },
      });

      return new NextResponse(Buffer.from(pdf), {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${body.formData.id || "payslip"}.pdf"`,
        },
      });
    } finally {
      await browser.close();
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to generate PDF";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
