import Link from "next/link";
import Navbar from "../../components/Navbar";
import CommandBlock from "../../components/CommandBlock";
import ChatDemo from "../../components/ChatDemo";
import StepFlow from "../../components/StepFlow";

const steps = [
  {
    number: 1,
    title: "用 /plan 拆解需求",
    description: "把需求告訴 Claude，它會拆成具體的實作步驟並等你確認",
    command: "/plan 新增購物車功能",
    color: "#58a6ff",
  },
  {
    number: 2,
    title: "用 /tdd 開始測試驅動開發",
    description: "先寫測試（RED）→ 再實作（GREEN）→ 重構（IMPROVE）",
    command: "/tdd",
    color: "#3fb950",
  },
  {
    number: 3,
    title: "遇到建置錯誤用 /build-fix",
    description: "不用自己看錯誤訊息，讓 build-error-resolver agent 自動修",
    command: "/build-fix",
    color: "#ffa657",
  },
  {
    number: 4,
    title: "完成後 /code-review 審查",
    description: "確認沒有安全漏洞或品質問題",
    command: "/code-review",
    color: "#bc8cff",
  },
];

const tddMessages = [
  {
    role: "user" as const,
    content: "/tdd 實作購物車的新增商品功能",
  },
  {
    role: "claude" as const,
    content: `## 🔴 RED：先寫測試

\`\`\`ts
// cart.test.ts
describe('Cart', () => {
  it('新增商品後數量應增加', () => {
    const cart = new Cart();
    cart.addItem({ id: '1', name: 'T-Shirt', price: 299 });
    expect(cart.items).toHaveLength(1);
  });

  it('同商品重複新增應累加數量', () => {
    const cart = new Cart();
    cart.addItem({ id: '1', name: 'T-Shirt', price: 299 });
    cart.addItem({ id: '1', name: 'T-Shirt', price: 299 });
    expect(cart.items[0].quantity).toBe(2);
  });
});
\`\`\`

測試目前會 FAIL ✓（因為還沒有實作）

準備進入 🟢 GREEN 階段？`,
  },
  {
    role: "user" as const,
    content: "yes",
  },
  {
    role: "claude" as const,
    content: `## 🟢 GREEN：最小實作讓測試通過

\`\`\`ts
// cart.ts
export class Cart {
  items: CartItem[] = [];

  addItem(product: Product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
  }
}
\`\`\`

✅ 2/2 測試通過

準備進入 🔵 IMPROVE 重構階段？`,
  },
];

const buildFixMessages = [
  {
    role: "user" as const,
    content: "/build-fix",
  },
  {
    role: "claude" as const,
    content: `## 🔧 Build Error Resolver

偵測到錯誤：
\`\`\`
TS2345: Argument of type 'string' is not assignable
to parameter of type 'number'
  at cart.ts:15
\`\`\`

**問題分析：**
price 欄位定義為 number，但傳入了 string "299"

**修復方案：**
\`\`\`ts
// 修復前
cart.addItem({ id: '1', price: "299" })

// 修復後
cart.addItem({ id: '1', price: 299 })
\`\`\`

✅ 已修復 1 個 TypeScript 錯誤
✅ Build 成功`,
  },
];

export default function FeatureDevPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1117" }}>
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/" className="text-xs hover:underline" style={{ color: "#8b949e" }}>首頁</Link>
            <span style={{ color: "#6e7681" }}>/</span>
            <span className="text-xs" style={{ color: "#58a6ff" }}>功能開發</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🚀</span>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "#e6edf3" }}>功能開發</h1>
              <p style={{ color: "#58a6ff" }}>從需求到上線</p>
            </div>
          </div>

          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "rgba(88,166,255,0.06)", border: "1px solid rgba(88,166,255,0.2)" }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: "#58a6ff" }}>📖 情境故事</p>
            <p style={{ color: "#8b949e" }}>
              阿偉接到需求：「本週五前要上線購物車功能」。他用 <code style={{ color: "#58a6ff" }}>/plan</code> 把需求拆解成具體步驟，
              再用 <code style={{ color: "#58a6ff" }}>/tdd</code> 先寫測試再實作，
              中途遇到 TypeScript 錯誤，一鍵 <code style={{ color: "#58a6ff" }}>/build-fix</code> 搞定。
              週四下午就提交 PR 了。
            </p>
          </div>
        </div>

        {/* TDD Concept */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "#e6edf3" }}>🔄 什麼是 TDD？</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { phase: "🔴 RED", title: "先寫測試", desc: "測試會 FAIL，因為還沒實作", color: "#f85149" },
              { phase: "🟢 GREEN", title: "最小實作", desc: "讓測試通過，不多不少", color: "#3fb950" },
              { phase: "🔵 IMPROVE", title: "重構優化", desc: "保持測試通過的同時改善程式碼", color: "#58a6ff" },
            ].map((item) => (
              <div
                key={item.phase}
                className="p-4 rounded-lg text-center"
                style={{ backgroundColor: "#161b22", border: `1px solid ${item.color}30` }}
              >
                <div className="text-2xl mb-2">{item.phase}</div>
                <div className="font-semibold text-sm mb-1" style={{ color: "#e6edf3" }}>{item.title}</div>
                <div className="text-xs" style={{ color: "#8b949e" }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-3 text-center" style={{ color: "#6e7681" }}>
            ECC 的 /tdd 指令會自動引導你完成這三個階段
          </p>
        </div>

        {/* Step Flow */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-6" style={{ color: "#e6edf3" }}>📚 完整開發流程</h2>
          <StepFlow steps={steps} />
        </div>

        {/* Demo: /tdd */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "#e6edf3" }}>💬 /tdd 實際示範</h2>
          <p className="text-sm mb-4" style={{ color: "#8b949e" }}>
            ECC 的 tdd-guide agent 會引導你完整走過 RED → GREEN → IMPROVE
          </p>
          <ChatDemo messages={tddMessages} title="情境示範 — /tdd 購物車功能" />
        </div>

        {/* Demo: /build-fix */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "#e6edf3" }}>💬 /build-fix 自動修錯</h2>
          <p className="text-sm mb-4" style={{ color: "#8b949e" }}>
            遇到建置錯誤不用自己看錯誤訊息，<code style={{ color: "#ffa657" }}>/build-fix</code> 幫你分析並自動修復
          </p>
          <ChatDemo messages={buildFixMessages} title="情境示範 — /build-fix 修復 TypeScript 錯誤" />
        </div>

        {/* Try it */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "#e6edf3" }}>🚀 現在就試試看</h2>
          <div className="space-y-3">
            <CommandBlock command="/plan 我想新增使用者登入功能" description="規劃新功能" />
            <CommandBlock command="/tdd 實作 JWT 驗證邏輯" description="TDD 開發" />
            <CommandBlock command="/build-fix" description="遇到建置錯誤時執行" />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6" style={{ borderTop: "1px solid #30363d" }}>
          <Link href="/scenarios/beginner" className="text-sm hover:underline" style={{ color: "#8b949e" }}>
            ← 新手入門
          </Link>
          <Link
            href="/scenarios/code-quality"
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: "#bc8cff", color: "#0d1117" }}
          >
            下一章：程式碼品質 →
          </Link>
        </div>
      </div>
    </div>
  );
}
