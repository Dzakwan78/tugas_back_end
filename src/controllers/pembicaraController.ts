import type { Request, Response } from "express";
import type { Pembicara } from "../types/pembicara.js";

let pembicara: Pembicara[] = [];

// 1. Menampilkan semua pembicara
export const getAllPembicara = (req: Request, res: Response): void => {
    res.json(pembicara);
};

// 2. Menyimpan data pembicara baru
export const createPembicara = (req: Request, res: Response): any => {
    try {
        const { name, job, email, photo, bio, status } = req.body;

        if (!name || !job || !email || !bio || !status) {
            return res.status(400).json({ message: "Semua field wajib diisi kecuali foto" });
        }

        const newPembicara: Pembicara = {
            id: pembicara.length > 0 ? pembicara[pembicara.length - 1]!.id + 1 : 1,
            name,
            job,
            email,
            photo,
            bio,
            status
        };

        pembicara.push(newPembicara);
        res.status(201).json(newPembicara);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat membuat pembicara", error });
    }
};

// 3. Menampilkan data pembicara berdasarkan id
export const getPembicaraById = (req: Request, res: Response): any => {
    const id = Number(req.params.id);
    const p = pembicara.find(p => p.id === id);

    if (!p) {
        return res.status(404).json({ message: "Pembicara tidak ditemukan" });
    }
    res.json(p);
};

// 4. Mengupdate data pembicara berdasarkan id
export const updatePembicaraById = (req: Request, res: Response): any => {
    const id = Number(req.params.id);
    const { name, job, email, photo, bio, status } = req.body;
    const index = pembicara.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Pembicara tidak ditemukan" });
    }

    const existingPembicara = pembicara[index]!;

    const updatedPembicara: Pembicara = {
        id: existingPembicara.id,
        name: name || existingPembicara.name,
        job: job || existingPembicara.job,
        email: email || existingPembicara.email,
        photo: photo ?? existingPembicara.photo,
        bio: bio || existingPembicara.bio,
        status: status || existingPembicara.status
    };

    pembicara[index] = updatedPembicara;
    res.json(pembicara[index]);
};

// 5. Menghapus data pembicara berdasarkan id
export const deletePembicaraById = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    pembicara = pembicara.filter(p => p.id !== id);
    res.json({ message: `Pembicara dengan ID ${id} berhasil dihapus` });
};