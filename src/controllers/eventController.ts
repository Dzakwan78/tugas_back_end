import type { Request, Response } from "express";
import type { Event } from "../types/event.js"; 

let events: Event[] = []; 

export const getAllEvents = (req: Request, res: Response): void => {
    res.json(events);
};

export const createEvent = (req: Request, res: Response): void => {
    const { name, tanggal, lokasi, category, description, status } = req.body;
    const newId = events.length > 0 ? (events[events.length - 1]?.id || 0) + 1 : 1;

    const newEvent: Event = {
        id: newId,
        name: name || "Event Baru",
        date: tanggal || new Date().toISOString(),
        location: lokasi || "Lokasi",
        category: category || "Umum",
        description: description || "Deskripsi acara",
        status: status || "scheduled"
    };
    
    events.push(newEvent);
    res.status(201).json(newEvent);
};

export const getEventById = (req: Request, res: Response): any => {
    const id = Number(req.params.id);
    const event = events.find(e => e.id === id);
    if (!event) return res.status(404).json({ message: "Not Found" });
    return res.json(event);
};

export const updateEventById = (req: Request, res: Response): any => {
    const id = Number(req.params.id);
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return res.status(404).json({ message: "Not Found" });

    events[index] = { ...events[index], ...req.body };
    return res.json(events[index]);
};

export const deleteEventById = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    events = events.filter(e => e.id !== id);
    res.json({ message: "Deleted" });
};