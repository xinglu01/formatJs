module.exports = {
    extends: ["@commitlint/config-conventional"],
    "type-empty": [0],
    "scope-empty": [0],
    "header-max-length": 50,
    "type-enum": [
        2,
        "always",
        [
            "feat",
            "fix",
            "docs",
            "style",
            "refactor",
            "perf",
            "test",
            "build",
            "ci",
            "chore",
            "revert",
        ],
    ],
    "scope-enum": [2, "always", "time", "date", "app"],
};
