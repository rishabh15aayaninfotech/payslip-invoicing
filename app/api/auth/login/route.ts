export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };

    return Response.json({
      ok: true,
      user: {
        email: body.email ?? "admin@payslip.in",
      },
    });
  } catch {
    return Response.json(
      { ok: false, message: "Invalid login payload" },
      { status: 400 },
    );
  }
}
