import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import type { Lead, LeadStatus } from "@/lib/types";

const allowedStatuses: LeadStatus[] = ["New", "Negotiation", "Discussion", "Qualified", "Won", "Lost"];

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = (await req.json()) as Partial<Lead>;

  const db = await readDb();
  const index = db.leads.findIndex((item) => item.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const current = db.leads[index];
  db.leads[index] = {
    ...current,
    name: body.name?.trim() ?? current.name,
    contact: body.contact?.trim() ?? current.contact,
    phone: body.phone?.trim() ?? current.phone,
    owner: body.owner?.trim() ?? current.owner,
    label: body.label?.trim() ?? current.label,
    status: allowedStatuses.includes(body.status as LeadStatus) ? (body.status as LeadStatus) : current.status,
  };

  await writeDb(db);
  return NextResponse.json(db.leads[index]);
}

export async function DELETE(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const db = await readDb();
  const before = db.leads.length;
  db.leads = db.leads.filter((item) => item.id !== id);

  if (db.leads.length === before) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  await writeDb(db);
  return NextResponse.json({ ok: true });
}
