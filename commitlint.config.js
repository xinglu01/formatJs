module.exports = {
    extends: ["@commitlint/config-conventional"],
    "type-empty": [2, 'never'],
    "scope-empty": [2, 'never'],
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
    "scope-enum": [2, "always", ["common", "app"]],
};
