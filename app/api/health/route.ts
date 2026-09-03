export function GET() {
  return Response.json({
    ok: true,
    service: "payslip-invoicing",
    timestamp: new Date().toISOString(),
  });
}
