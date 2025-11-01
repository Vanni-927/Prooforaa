import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { compareImages } from "../services/comparisonService.ts";

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory for comparison
const uploadsDir = path.join(__dirname, "../../uploads/comparisons");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("✅ Created comparisons directory");
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Create multer upload instance
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|svg|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
}).fields([
  { name: "file1", maxCount: 1 },
  { name: "file2", maxCount: 1 },
]);

// Controller to handle image comparison request
export const compareDesigns = async (req: Request, res: Response) => {
  // Wrap multer middleware in a promise
  upload(req, res, async (err) => {
    try {
      // Handle multer errors
      if (err instanceof multer.MulterError) {
        console.error("❌ Multer error:", err);
        return res.status(400).json({
          message: `Upload error: ${err.message}`,
          code: err.code,
        });
      } else if (err) {
        console.error("❌ Upload error:", err);
        return res.status(400).json({ message: err.message });
      }

      console.log("📥 Comparison request received");
      console.log("Files:", req.files);
      console.log("Body:", req.body);

      // Check if files exist
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      if (!files || !files.file1 || !files.file2) {
        return res.status(400).json({
          message: "Both images are required for comparison",
          received: {
            file1: !!files?.file1,
            file2: !!files?.file2,
          },
        });
      }

      const file1 = files.file1[0];
      const file2 = files.file2[0];

      console.log("✅ File 1:", file1.filename);
      console.log("✅ File 2:", file2.filename);

      // Call comparison service
      const similarityScore = await compareImages(file1.path, file2.path);

      console.log(`✅ Comparison complete. Similarity: ${similarityScore}%`);

      // Clean up uploaded files after comparison (optional)
      // Uncomment if you want to delete files after comparison
      // fs.unlinkSync(file1.path);
      // fs.unlinkSync(file2.path);

      res.status(200).json({
        message: "Comparison completed successfully",
        similarityScore,
        file1: {
          name: file1.originalname,
          size: file1.size,
        },
        file2: {
          name: file2.originalname,
          size: file2.size,
        },
      });
    } catch (error: any) {
      console.error("❌ Comparison error:", error);
      res.status(500).json({
        message: error.message || "Comparison failed",
        error: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    }
  });
};
