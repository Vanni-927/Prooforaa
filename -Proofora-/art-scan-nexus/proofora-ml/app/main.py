from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from app.compare import combined_similarity
from app.utils import load_image_bytes, compute_sha256_of_normalized
from app.config import SIMILARITY_THRESHOLD
import numpy as np

app = FastAPI(title="Proofora-ML")

@app.get("/")
async def root():
    return {
        "message": "Welcome to Proofora-ML API",
        "version": "1.0",
        "endpoints": {
            "compare": {
                "path": "/compare",
                "method": "POST",
                "description": "Compare two images for similarity"
            }
        }
    }

@app.post("/compare")
async def compare_images(
    original: UploadFile = File(...),
    suspect: UploadFile = File(...),
    store_proof: bool = Form(False),
    owner: str = Form(None)
):
    orig_bytes = await original.read()
    susp_bytes = await suspect.read()

    pil_orig = load_image_bytes(orig_bytes)
    pil_susp = load_image_bytes(susp_bytes)

    result = combined_similarity(pil_orig, pil_susp)
    score = result["score"]

    is_plagiarism = score >= SIMILARITY_THRESHOLD
    proof = None

    if (not is_plagiarism) and store_proof:
        orig_arr = np.array(pil_orig.resize((512,512)).convert("RGB"))
        metadata = {"owner": owner}
        proof_hash = compute_sha256_of_normalized(orig_arr, metadata)
        proof = {"hash": proof_hash}

    return JSONResponse({
        "similarity_score": round(score, 4),
        "is_plagiarism": bool(is_plagiarism),
        "breakdown": result["breakdown"],
        "proof": proof
    })

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/")
async def root():
    return {"message": "Proofora ML API is running 🚀"}
