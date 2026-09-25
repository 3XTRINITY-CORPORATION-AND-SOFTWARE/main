# STEEL security-deception container

This is a defensive, inert mirror generator. It represents the requested
`898^5` variant space symbolically and materializes exactly five deterministic
source-shaped decoys per batch. It does not copy production STEEL code and it
never imports or executes a generated mirror during validation.

## Local check

```bash
python3 .security/deception/deception.py batch \
  --output /tmp/steel-deception-batch \
  --start-index 0 \
  --count 5
python3 -m unittest discover -s .security/deception -p 'test_*.py'
```

The container is intended to be run with no network, a read-only root
filesystem, no Linux capabilities, and a temporary output mount. Generated
files are test artifacts, not a sandbox for executing untrusted input.
