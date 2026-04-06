import type { CommandData } from "./types";

const LANG_COLOR = "#79c0ff";

function makeLangCmd(
  slug: string,
  name: string,
  emoji: string,
  lang: string,
  type: "build" | "review" | "test",
  framework: string,
  testTool: string,
  relatedSlugs: string[]
): import("./types").CommandData {
  const typeLabel = { build: "建置修復", review: "程式碼審查", test: "TDD" }[type];
  const typeDesc = {
    build: `自動修復 ${lang} 建置錯誤，最小化改動`,
    review: `全面審查 ${lang} 程式碼品質、慣用模式和安全性`,
    test: `${lang} 測試驅動開發，先寫測試再實作`,
  }[type];

  const promptExamples = {
    build: `/${slug}`,
    review: `/${slug}`,
    test: `/${slug} 實作用戶認證邏輯`,
  };

  const claudeResponse = {
    build: `分析 ${lang} 建置錯誤...\n\n找到 2 個錯誤：\n- 型別不匹配（第 45 行）\n- 未使用的 import（第 12 行）\n\n正在修復...\n✅ 建置成功`,
    review: `審查 ${lang} 程式碼...\n\n🟡 HIGH（1 個）：未處理 null 可能性\n🟢 MEDIUM（2 個）：可以使用更慣用的寫法\n\n建議修復 HIGH 問題後合併。`,
    test: `RED 階段：先寫 ${testTool} 測試...\n→ 測試撰寫完成，確認失敗 ✅\n\nGREEN 階段：實作最小可行程式碼...\n→ 測試通過 ✅\n\nIMPROVE 階段：重構...\n→ 覆蓋率 92% ✅`,
  }[type];

  return {
    slug,
    name,
    emoji,
    category: "language",
    color: LANG_COLOR,
    shortDesc: `${lang} ${typeLabel}：${typeDesc}`,
    whatItDoes: `${name} 是專門為 ${lang} 開發設計的 ${typeLabel} 工具，使用 ${framework} 相關的最佳實踐和慣用模式。

它會呼叫對應的專業 Agent（${lang.toLowerCase()}-${type === "build" ? "build-resolver" : type === "review" ? "reviewer" : "guide"}），這個 Agent 深度了解 ${lang} 的語言特性、${framework} 的框架慣例，以及這個語言特有的常見問題。

相比通用的 /code-review 或 /build-fix，${name} 的建議更精準，因為它用了${lang}特有的標準來評估。`,
    whenToUse: [
      `你的專案使用 ${lang}`,
      type === "build" ? `${lang} 建置或編譯失敗` : "",
      type === "review" ? `完成 ${lang} 功能後做審查` : "",
      type === "test" ? `用 TDD 開發新的 ${lang} 功能` : "",
      `想要符合 ${lang} 慣用寫法（idiomatic ${lang}）的建議`,
    ].filter(Boolean),
    promptExample: promptExamples[type],
    claudeMessages: [
      { role: "user", content: promptExamples[type] },
      { role: "claude", content: claudeResponse },
    ],
    pitfalls: [
      {
        type: "tip",
        title: `只在 ${lang} 專案中使用`,
        content: `${name} 是針對 ${lang} 優化的，在非 ${lang} 專案中用通用的 /build-fix、/code-review 或 /tdd 就夠了。`,
      },
    ],
    relatedSlugs,
  };
}

export const languageCommands: CommandData[] = [
  // C++
  makeLangCmd("cpp-build", "/cpp-build", "➕", "C++", "build", "CMake/GCC/Clang", "GoogleTest", ["cpp-review", "cpp-test"]),
  makeLangCmd("cpp-review", "/cpp-review", "➕", "C++", "review", "Modern C++ / STL", "GoogleTest", ["cpp-build", "cpp-test"]),
  makeLangCmd("cpp-test", "/cpp-test", "➕", "C++", "test", "GoogleTest / gcov", "GoogleTest", ["cpp-build", "cpp-review"]),
  // Go
  makeLangCmd("go-build", "/go-build", "🐹", "Go", "build", "go vet / golangci-lint", "go test", ["go-review", "go-test"]),
  makeLangCmd("go-review", "/go-review", "🐹", "Go", "review", "Effective Go / golangci-lint", "go test", ["go-build", "go-test"]),
  makeLangCmd("go-test", "/go-test", "🐹", "Go", "test", "table-driven tests / go test -cover", "go test", ["go-build", "go-review"]),
  // Rust
  makeLangCmd("rust-build", "/rust-build", "🦀", "Rust", "build", "Cargo / borrow checker", "cargo test", ["rust-review", "rust-test"]),
  makeLangCmd("rust-review", "/rust-review", "🦀", "Rust", "review", "Ownership / Clippy", "cargo test", ["rust-build", "rust-test"]),
  makeLangCmd("rust-test", "/rust-test", "🦀", "Rust", "test", "cargo-llvm-cov", "cargo test", ["rust-build", "rust-review"]),
  // Kotlin
  makeLangCmd("kotlin-build", "/kotlin-build", "🍃", "Kotlin", "build", "Gradle / Kotlin compiler", "Kotest", ["kotlin-review", "kotlin-test"]),
  makeLangCmd("kotlin-review", "/kotlin-review", "🍃", "Kotlin", "review", "Kotlin idioms / Coroutines", "Kotest", ["kotlin-build", "kotlin-test"]),
  makeLangCmd("kotlin-test", "/kotlin-test", "🍃", "Kotlin", "test", "Kotest / Kover", "Kotest", ["kotlin-build", "kotlin-review"]),
  // Flutter/Dart
  makeLangCmd("flutter-build", "/flutter-build", "🦋", "Flutter", "build", "dart analyze / Flutter SDK", "flutter test", ["flutter-review", "flutter-test"]),
  makeLangCmd("flutter-review", "/flutter-review", "🦋", "Flutter", "review", "Flutter best practices / Effective Dart", "flutter test", ["flutter-build", "flutter-test"]),
  makeLangCmd("flutter-test", "/flutter-test", "🦋", "Flutter", "test", "flutter test / golden tests", "flutter test", ["flutter-build", "flutter-review"]),
  // Python
  {
    slug: "python-review",
    name: "/python-review",
    emoji: "🐍",
    category: "language",
    color: LANG_COLOR,
    shortDesc: "全面審查 Python 程式碼：PEP 8、型別提示、安全性和 Pythonic 慣用模式",
    whatItDoes: `/python-review 呼叫 Python 專業審查 Agent，檢查你的 Python 程式碼是否符合 PEP 8 風格指南、是否有適當的型別提示（Type Hints）、是否有安全漏洞，以及是否使用了 Pythonic 的慣用寫法。

Python 有很多語言特有的最佳實踐：List comprehension 比 for loop 更 Pythonic、應該用 context manager（with 語句）管理資源、型別提示對大型專案很重要……這些細節通用的 /code-review 可能不夠深入，/python-review 會更精準地指出這些問題。`,
    whenToUse: [
      "Python 或 Django/FastAPI/Flask 專案的程式碼審查",
      "想確認程式碼符合 PEP 8 和 Pythonic 風格",
      "增加型別提示前的現狀評估",
      "安全性審查（SQL 注入、輸入驗證）",
    ],
    promptExample: `/python-review`,
    claudeMessages: [
      { role: "user", content: "/python-review" },
      {
        role: "claude",
        content: `審查 Python 程式碼...

🟡 HIGH（2 個）：
- views.py:45：SQL 查詢用字串拼接，有注入風險
- models.py:23：缺少型別提示，建議加 -> Optional[User]

🟢 MEDIUM（3 個）：
- utils.py:12：用 for loop 建立列表，建議改 list comprehension
- api.py:78：未使用 context manager 開啟檔案

建議：先修 HIGH 問題，MEDIUM 可用 autopep8 自動修`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "搭配 /tdd 使用，保持 Pythonic 風格",
        content:
          "先用 /tdd 寫測試（pytest 風格），再用 /python-review 確認實作的風格符合 Python 最佳實踐。",
      },
    ],
    relatedSlugs: ["code-review", "security-review", "tdd"],
  },
  // Gradle
  {
    slug: "gradle-build",
    name: "/gradle-build",
    emoji: "🐘",
    category: "language",
    color: LANG_COLOR,
    shortDesc: "修復 Android 或 KMP 專案的 Gradle 建置錯誤",
    whatItDoes: `/gradle-build 專門處理 Android 和 Kotlin Multiplatform（KMP）專案的 Gradle 建置問題。Gradle 的錯誤訊息有時候非常難解讀——版本衝突、依賴解析失敗、configuration cache 問題……

這個指令會分析 Gradle 的建置輸出，找出根本原因（不只是表面錯誤），然後給出最小化的修復方案：可能是更新依賴版本、修改 build.gradle.kts 設定、或清除 Gradle 快取。`,
    whenToUse: [
      "Android 或 KMP 專案 Gradle 建置失敗",
      "升級 AGP（Android Gradle Plugin）後出現問題",
      "依賴版本衝突導致建置失敗",
      "Gradle sync 在 Android Studio 失敗",
    ],
    promptExample: `/gradle-build`,
    claudeMessages: [
      { role: "user", content: "/gradle-build" },
      {
        role: "claude",
        content: `分析 Gradle 建置錯誤...

錯誤：Duplicate class kotlin.collections.jdk8 found in modules kotlin-stdlib-1.8.x and kotlin-stdlib-jdk8-1.7.x

根本原因：Kotlin 版本衝突，AGP 4.x 自帶的 Kotlin 版本和你指定的版本衝突

修復 build.gradle.kts：
\`\`\`kotlin
configurations.all {
  resolutionStrategy.eachDependency {
    if (requested.group == "org.jetbrains.kotlin") {
      useVersion("1.9.0")
    }
  }
}
\`\`\`

✅ Gradle sync 成功`,
      },
    ],
    pitfalls: [
      {
        type: "gotcha",
        title: "先做 Gradle clean 再跑這個指令",
        content:
          "Gradle 快取有時會造成假問題。跑 /gradle-build 前先執行 ./gradlew clean，排除快取問題的干擾。",
      },
    ],
    relatedSlugs: ["kotlin-build", "kotlin-review", "build-fix"],
  },
];
