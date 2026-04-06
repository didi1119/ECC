import Link from "next/link";
import { RefreshCw, BookOpen, MessageSquare, Rocket, ChevronRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import CommandBlock from "../../components/CommandBlock";
import ChatDemo from "../../components/ChatDemo";
import StepFlow from "../../components/StepFlow";

const steps = [
  { number: 1, title: "用 /plan 拆解需求", description: "把需求告訴 Claude，它會拆成具體的實作步驟並等你確認", command: "/plan 新增購物車功能", color: "#60a5fa" },
  { number: 2, title: "用 /tdd 開始測試驅動開發", description: "先寫測試（RED）→ 再實作（GREEN）→ 重構（IMPROVE）", command: "/tdd", color: "#34d399" },
  { number: 3, title: "遇到建置錯誤用 /build-fix", description: "不用自己看錯誤訊息，讓 build-error-resolver agent 自動修", command: "/build-fix", color: "#fb923c" },
  { number: 4, title: "完成後 /code-review 審查", description: "確認沒有安全漏洞或品質問題", command: "/code-review", color: "#7c6aef" },
];

const tddMessages = [
  { role: "user" as const, content: "/tdd 實作購物車的新增商品功能" },
  { role: "claude" as const, content: `## 🔴 RED：先寫測試\n\n\`\`\`ts\n// cart.test.ts\ndescribe('Cart', () => {\n  it('新增商品後數量應增加', () => {\n    const cart = new Cart();\n    cart.addItem({ id: '1', name: 'T-Shirt', price: 299 });\n    expect(cart.items).toHaveLength(1);\n  });\n\n  it('同商品重複新增應累加數量', () => {\n    const cart = new Cart();\n    cart.addItem({ id: '1', name: 'T-Shirt', price: 299 });\n    cart.addItem({ id: '1', name: 'T-Shirt', price: 299 });\n    expect(cart.items[0].quantity).toBe(2);\n  });\n});\n\`\`\`\n\n測試目前會 FAIL ✓（因為還沒有實作）\n\n準備進入 🟢 GREEN 階段？` },
  { role: "user" as const, content: "yes" },
  { role: "claude" as const, content: `## 🟢 GREEN：最小實作讓測試通過\n\n\`\`\`ts\n// cart.ts\nexport class Cart {\n  items: CartItem[] = [];\n\n  addItem(product: Product) {\n    const existing = this.items.find(i => i.id === product.id);\n    if (existing) {\n      existing.quantity += 1;\n    } else {\n      this.items.push({ ...product, quantity: 1 });\n    }\n  }\n}\n\`\`\`\n\n✅ 2/2 測試通過\n\n準備進入 🔵 IMPROVE 重構階段？` },
];

const buildFixMessages = [
  { role: "user" as const, content: "/build-fix" },
  { role: "claude" as const, content: `## 🔧 Build Error Resolver\n\n偵測到錯誤：\n\`\`\`\nTS2345: Argument of type 'string' is not assignable\nto parameter of type 'number'\n  at cart.ts:15\n\`\`\`\n\n**問題分析：**\nprice 欄位定義為 number，但傳入了 string "299"\n\n**修復方案：**\n\`\`\`ts\n// 修復前\ncart.addItem({ id: '1', price: "299" })\n\n// 修復後\ncart.addItem({ id: '1', price: 299 })\n\`\`\`\n\n✅ 已修復 1 個 TypeScript 錯誤\n✅ Build 成功` },
];

export default function FeatureDevPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/" className="text-xs hover:underline" style={{ color: "var(--text-secondary)" }}>首頁</Link>
            <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />
            <span className="text-xs" style={{ color: "var(--accent-blue)" }}>功能開發</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <Rocket size={36} style={{ color: "var(--accent-blue)" }} />
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>功能開發</h1>
              <p style={{ color: "var(--accent-blue)" }}>從需求到上線</p>
            </div>
          </div>
          <div className="rounded-xl p-5" style={{ backgroundColor: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.2)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--accent-blue)" }}>📖 情境故事</p>
            <p style={{ color: "var(--text-secondary)" }}>
              阿偉接到需求：「本週五前要上線購物車功能」。他用 <code style={{ color: "var(--accent-blue)" }}>/plan</code> 把需求拆解成具體步驟，
              再用 <code style={{ color: "var(--accent-blue)" }}>/tdd</code> 先寫測試再實作，
              中途遇到 TypeScript 錯誤，一鍵 <code style={{ color: "var(--accent-blue)" }}>/build-fix</code> 搞定。
              週四下午就提交 PR 了。
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}><RefreshCw size={20} style={{ color: "var(--accent-green)" }} /> 什麼是 TDD？</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { phase: "🔴 RED", title: "先寫測試", desc: "測試會 FAIL，因為還沒實作", color: "var(--accent-rose)" },
              { phase: "🟢 GREEN", title: "最小實作", desc: "讓測試通過，不多不少", color: "var(--accent-green)" },
              { phase: "🔵 IMPROVE", title: "重構優化", desc: "保持測試通過的同時改善程式碼", color: "var(--accent-blue)" },
            ].map((item) => (
              <div key={item.phase} className="p-4 rounded-lg text-center" style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)" }}>
                <div className="text-2xl mb-2">{item.phase}</div>
                <div className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{item.title}</div>
                <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-3 text-center" style={{ color: "var(--text-tertiary)" }}>
            ECC 的 /tdd 指令會自動引導你完成這三個階段
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: "var(--text-primary)" }}><BookOpen size={20} style={{ color: "var(--accent-blue)" }} /> 完整開發流程</h2>
          <StepFlow steps={steps} />
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: "var(--text-primary)" }}><MessageSquare size={20} style={{ color: "var(--accent-brand)" }} /> /tdd 實際示範</h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>ECC 的 tdd-guide agent 會引導你完整走過 RED → GREEN → IMPROVE</p>
          <ChatDemo messages={tddMessages} title="情境示範 — /tdd 購物車功能" />
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: "var(--text-primary)" }}><MessageSquare size={20} style={{ color: "var(--accent-orange)" }} /> /build-fix 自動修錯</h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            遇到建置錯誤不用自己看錯誤訊息，<code style={{ color: "var(--accent-orange)" }}>/build-fix</code> 幫你分析並自動修復
          </p>
          <ChatDemo messages={buildFixMessages} title="情境示範 — /build-fix 修復 TypeScript 錯誤" />
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}><Rocket size={20} style={{ color: "var(--accent-blue)" }} /> 現在就試試看</h2>
          <div className="space-y-3">
            <CommandBlock command="/plan 我想新增使用者登入功能" description="規劃新功能" />
            <CommandBlock command="/tdd 實作 JWT 驗證邏輯" description="TDD 開發" />
            <CommandBlock command="/build-fix" description="遇到建置錯誤時執行" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-6" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <Link href="/scenarios/beginner" className="text-sm hover:underline" style={{ color: "var(--text-secondary)" }}>← 新手入門</Link>
          <Link href="/scenarios/code-quality" className="nav-cta-btn px-4 py-2 rounded-lg text-sm font-medium transition-all" style={{ backgroundColor: "var(--accent-brand)", color: "#fff" }}>下一章：程式碼品質 →</Link>
        </div>
      </div>
    </div>
  );
}
