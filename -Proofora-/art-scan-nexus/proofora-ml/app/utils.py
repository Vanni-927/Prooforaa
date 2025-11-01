# utils.py

import cv2
import numpy as np
from PIL import Image
import imagehash
import io

def load_image_bytes(image_bytes):
    """Load image from bytes into PIL Image."""
    return Image.open(io.BytesIO(image_bytes))

def pil_to_np(pil_img: Image.Image, size=None):
    """Convert PIL Image to numpy array with optional resizing."""
    if size:
        pil_img = pil_img.resize(size)
    return np.array(pil_img)

def load_image(image_path):
    """Load image in grayscale."""
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise ValueError(f"Could not read image: {image_path}")
    return img

def calculate_phash(image_path, hash_size=16):
    """Compute perceptual hash (pHash) for image comparison."""
    image = Image.open(image_path)
    return imagehash.phash(image, hash_size=hash_size)

def calculate_orb_features(image, max_features=500):
    """Compute ORB keypoints and descriptors."""
    orb = cv2.ORB_create(nfeatures=max_features)
    keypoints, descriptors = orb.detectAndCompute(image, None)
    return keypoints, descriptors

def match_orb_features(desc1, desc2):
    """Compare two ORB descriptors and return match score."""
    if desc1 is None or desc2 is None:
        return 0.0

    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
    matches = bf.match(desc1, desc2)
    if not matches:
        return 0.0

    distances = [m.distance for m in matches]
    score = 1 - (sum(distances) / (len(distances) * 256))
    return max(0.0, min(score, 1.0))

def compute_sha256_of_normalized(image_bytes):
    """Compute SHA256 hash of normalized image bytes."""
    import hashlib
    pil_img = load_image_bytes(image_bytes)
    # Normalize the image by converting to grayscale and resizing
    normalized = pil_img.convert('L').resize((256, 256))
    # Convert back to bytes in PNG format
    with io.BytesIO() as byte_io:
        normalized.save(byte_io, format='PNG')
        return hashlib.sha256(byte_io.getvalue()).hexdigest()
