import json
from pathlib import Path

from jsonschema import Draft202012Validator

ROOT = Path(__file__).resolve().parents[1]
SCHEMA_PATH = ROOT / "contracts" / "spatial-model" / "v1.schema.json"
EXAMPLES_PATH = ROOT / "contracts" / "spatial-model" / "examples"


def main() -> None:
    schema = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))
    Draft202012Validator.check_schema(schema)
    validator = Draft202012Validator(schema)

    for example_path in sorted(EXAMPLES_PATH.glob("*.json")):
        payload = json.loads(example_path.read_text(encoding="utf-8"))
        errors = sorted(validator.iter_errors(payload), key=lambda error: list(error.path))
        if errors:
            details = "\n".join(f"{list(error.path)}: {error.message}" for error in errors)
            raise SystemExit(f"{example_path} does not match the contract:\n{details}")
        print(f"validated {example_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
