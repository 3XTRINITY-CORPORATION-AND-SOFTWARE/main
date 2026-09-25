"""Inert, deterministic security-deception batch generator."""

from .deception import BATCH_SIZE, VARIANT_SPACE, generate_batch, validate_batch

__all__ = ["BATCH_SIZE", "VARIANT_SPACE", "generate_batch", "validate_batch"]
