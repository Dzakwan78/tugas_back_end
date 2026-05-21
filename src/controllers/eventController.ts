import type { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// GET ALL EVENTS (Termasuk data Kategori & Pembicara)
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
      include: { 
        category: true,   // Ambil data kategori
        pembicara: true,  // ← Ambil data pembicara sekalian
      }, 
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data event", error });
  }
};

// CREATE EVENT
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, tanggal, lokasi, categoryId, pembicaraId, description } = req.body;

    const newEvent = await prisma.event.create({
      data: {
        name,
        dateEvent: new Date(tanggal),
        location: lokasi,
        categoryId: Number(categoryId),
        pembicaraId: Number(pembicaraId), // ← Hubungkan data pembicara di sini
        description,
      },
    });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Gagal menambah event", error });
  }
};

// GET BY ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const event = await prisma.event.findUnique({
      where: { id },
      include: { 
        category: true,
        pembicara: true, // ← Tampilkan data pembicara di detail
      },
    });
    if (!event) return res.status(404).json({ message: "Event tidak ditemukan" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil detail event", error });
  }
};

// UPDATE EVENT
export const updateEventById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, tanggal, lokasi, categoryId, pembicaraId, description } = req.body;

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        name,
        dateEvent: new Date(tanggal),
        location: lokasi,
        categoryId: Number(categoryId),
        pembicaraId: Number(pembicaraId), // ← Izinkan update pembicara
        description,
      },
    });

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Gagal update event", error });
  }
};

// DELETE EVENT
export const deleteEventById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.event.delete({ where: { id } });
    res.json({ message: "Event berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus event", error });
  }
};