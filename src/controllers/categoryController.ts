import type { Request, Response } from "express"; 
import type { Category } from "../types/category.js"; 

let categories: Category[] = [];

// 1. Menampilkan semua kategori
export const getAllCategories = (req: Request, res: Response): void => {
    res.json(categories);
};

// 2. Menyimpan data kategori baru
export const createCategory = (req: Request, res: Response): any => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name harus diisi" });
        }
        const newCategory: Category = {
            id: categories.length > 0 ? categories[categories.length - 1]!.id + 1 : 1,
            name
        };

        categories.push(newCategory);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat membuat kategori", error });
    }
};

// 3. Menampilkan data kategori berdasarkan id
export const getCategoryById = (req: Request, res: Response): any => {
    const id = Number(req.params.id);
    const category = categories.find(c => c.id === id);

    if (!category) {
        return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
    res.json(category);
};

// 4. Mengupdate data kategori berdasarkan id
export const updateCategoryById = (req: Request, res: Response): any => {
    const id = Number(req.params.id);
    const { name } = req.body;
    const index = categories.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    const existingCategory = categories[index]!;

    const updatedCategory: Category = {
        id: existingCategory.id,
        name: name || existingCategory.name
    };

    categories[index] = updatedCategory;
    res.json(categories[index]);
};

// 5. Menghapus data kategori berdasarkan id
export const deleteCategoryById = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    categories = categories.filter(c => c.id !== id);
    res.json({ message: `Kategori dengan ID ${id} berhasil dihapus` });
};