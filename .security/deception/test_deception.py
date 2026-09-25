from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from deception import BATCH_SIZE, VARIANT_SPACE, generate_batch, validate_batch, variant_coordinates


class DeceptionBatchTests(unittest.TestCase):
    def test_symbolic_space_and_five_file_batch(self) -> None:
        self.assertEqual(VARIANT_SPACE, 898**5)
        self.assertEqual(len(variant_coordinates(0)), 5)
        with tempfile.TemporaryDirectory() as directory:
            manifest = generate_batch(Path(directory), start_index=11, count=BATCH_SIZE)
            self.assertEqual(manifest["count"], 5)
            self.assertEqual(len(list(Path(directory).glob("mirror-*.py"))), 5)
            self.assertEqual(validate_batch(Path(directory))["start_index"], 11)

    def test_batch_size_is_exactly_five(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            with self.assertRaisesRegex(ValueError, "exactly 5"):
                generate_batch(Path(directory), count=4)

    def test_tampering_is_rejected(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            generate_batch(root)
            first = next(root.glob("mirror-*.py"))
            first.write_text(first.read_text(encoding="utf-8") + "\n# tampered\n", encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "sha256 mismatch"):
                validate_batch(root)


if __name__ == "__main__":
    unittest.main()
