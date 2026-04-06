"use client";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import CommandBlock from "../../../components/CommandBlock";
import CodeDiff from "../../../components/CodeDiff";
import PitfallBox from "../../../components/PitfallBox";
import ChatDemo from "../../../components/ChatDemo";

const badPrompt = `/tdd 做登入`;

const goodPrompt = `/tdd 實作 JWT refresh token 邏輯，需求：
1. access token 過期（401）時自動用 refresh token 換新
2. 換新過程中的並發請求要 queue 起來，不能重複刷新
3. refresh token 本身過期時清除 session 並跳轉登入頁
4. 測試要涵蓋：正常刷新、並發刷新、refresh 過期三個 case`;

const redPhaseChat = [
  {
    role: "user" as const,
    content: "/tdd 實作 addToCart(item, quantity) 函式，應累加相同 item 的數量",
  },
  {
    role: "claude" as const,
    content: `先寫測試（RED 階段）：

\`\`\`typescript
// cart.test.ts
it('應累加相同 item 的數量', () => {
  const cart = new Cart();
  cart.addToCart({ id: 'a', price: 10 }, 1);
  cart.addToCart({ id: 'a', price: 10 }, 2);
  expect(cart.getItem('a')?.quantity).toBe(3);
});

it('不同 item 應分開計算', () => {
  const cart = new Cart();
  cart.addToCart({ id: 'a', price: 10 }, 1);
  cart.addToCart({ id: 'b', price: 20 }, 1);
  expect(cart.items).toHaveLength(2);
});
\`\`\`

現在跑測試 → 應該 FAIL（因為還沒實作）`,
  },
];

const greenPhaseChat = [
  {
    role: "claude" as const,
    content: `GREEN 階段 — 最小實作：

\`\`\`typescript
// cart.ts
addToCart(item: Item, quantity: number) {
  const existing = this.items.find(i => i.id === item.id);
  if (existing) {
    existing.quantity += quantity;  // 累加
  } else {
    this.items.push({ ...item, quantity });
  }
}
\`\`\`

跑測試 → 應該全部 PASS ✅`,
  },
  {
    role: "user" as const,
    content: "測試通過了！接下來呢？",
  },
  {
    role: "claude" as const,
    content: `IMPROVE 階段 — 重構但不改行為：

\`\`\`typescript
// 提取輔助函式，加入型別，提高可讀性
private findItem(id: string): CartItem | undefined {
  return this.items.find(item => item.id === id);
}

addToCart(item: Item, quantity: number): void {
  const existing = this.findItem(item.id);
  if (existing) {
    existing.quantity += quantity;
    return;
  }
  this.items.push({ ...item, quantity });
}
\`\`\`

重構完再跑一次測試確認仍然全綠 ✅`,
  },
];

const beforePrompt = `/tdd 做登入
→ Claude 產生：「我來幫你實作登入功能！」然後直接寫 LoginForm 元件...
（沒有先寫測試！）`;

const afterPrompt = `/tdd 實作 validateLoginForm(email, password) 驗證函式：
- email 格式不合法時回傳 { valid: false, error: "email 格式錯誤" }
- password 少於 8 字元時回傳 { valid: false, error: "密碼太短" }
- 兩者都合法時回傳 { valid: true }
→ Claude 先寫 3 個測試案例，跑 FAIL，再寫實作，跑 PASS ✅`;

export default function TddMasteryPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1117" }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="text-xs hover:underline" style={{ color: "#8b949e" }}>首頁</Link>
          <span style={{ color: "#6e7681" }}>/</span>
          <span className="text-xs" style={{ color: "#f85149" }}>高手情境</span>
          <span style={{ color: "#6e7681" }}>/</span>
          <span className="text-xs" style={{ color: "#ffa657" }}>TDD 完整實戰</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🧪</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold" style={{ color: "#e6edf3" }}>TDD 完整實戰</h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: "rgba(248,81,73,0.15)", color: "#f85149", border: "1px solid rgba(248,81,73,0.3)" }}>高手</span>
              </div>
              <p style={{ color: "#ffa657" }}>RED → GREEN → IMPROVE 三階段完整教學，含常見陷阱</p>
            </div>
          </div>
        </div>

        {/* TDD Cycle Visual */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "#e6edf3" }}>🔄 TDD 三階段</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { phase: "RED", desc: "先寫會失敗的測試", color: "#f85149", bg: "rgba(248,81,73,0.1)", detail: "明確定義你要的行為，測試跑起來要是紅的" },
              { phase: "GREEN", desc: "最小實作通過測試", color: "#3fb950", bg: "rgba(63,185,80,0.1)", detail: "只寫讓測試通過的最少程式碼，不多不少" },
              { phase: "IMPROVE", desc: "重構不改行為", color: "#58a6ff", bg: "rgba(88,166,255,0.1)", detail: "清理程式碼，全程保持測試是綠的" },
            ].map((p) => (
              <div key={p.phase} className="rounded-xl p-4" style={{ backgroundColor: p.bg, border: `1px solid ${p.color}25` }}>
                <div className="text-xl font-bold mb-1" style={{ color: p.color }}>{p.phase}</div>
                <div className="text-xs font-medium mb-2" style={{ color: "#e6edf3" }}>{p.desc}</div>
                <div className="text-xs" style={{ color: "#8b949e" }}>{p.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Prompt Quality Comparison */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "#e6edf3" }}>📝 提示詞品質對比</h2>
          <p className="text-sm mb-4" style={{ color: "#8b949e" }}>提示越具體，Claude 產出的測試越精準：</p>
          <CodeDiff
            before={beforePrompt}
            after={afterPrompt}
            beforeLabel="❌ 模糊提示（Claude 會跳過 RED）"
            afterLabel="✅ 具體提示（確保 RED → GREEN）"
            title="/tdd 提示詞品質"
          />
          <div className="mt-4">
            <PitfallBox type="gotcha" title="Claude 有時會跳過 RED 直接寫實作">
              如果你的提示太模糊（例如「做登入」），Claude 可能直接產生元件而不先寫測試。解法：在提示裡明確寫出「先寫測試，確認 FAIL 後再實作」。
            </PitfallBox>
          </div>
        </div>

        {/* RED Phase Demo */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "#e6edf3" }}>
            <span style={{ color: "#f85149" }}>RED</span> 階段示範
          </h2>
          <p className="text-sm mb-4" style={{ color: "#8b949e" }}>Claude 先寫測試，測試必須失敗才代表 RED 階段正確：</p>
          <ChatDemo messages={redPhaseChat} />
          <div className="mt-4">
            <PitfallBox type="warning" title="一定要確認測試真的 FAIL">
              如果 Claude 寫完測試後跑起來直接通過，代表測試沒有真正驗證任何東西。要求 Claude「現在跑測試，給我看 FAIL 的輸出」。
            </PitfallBox>
          </div>
        </div>

        {/* GREEN + IMPROVE Phase Demo */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "#e6edf3" }}>
            <span style={{ color: "#3fb950" }}>GREEN</span> + <span style={{ color: "#58a6ff" }}>IMPROVE</span> 階段示範
          </h2>
          <ChatDemo messages={greenPhaseChat} />
          <div className="mt-4">
            <PitfallBox type="tip" title="IMPROVE 階段只整理，不加功能">
              重構時只改程式碼的結構（提取函式、改命名、加型別），不加新邏輯。新邏輯 = 新的 RED 階段。
            </PitfallBox>
          </div>
        </div>

        {/* Coverage */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "#e6edf3" }}>📊 Coverage 怎麼看</h2>
          <p className="text-sm mb-4" style={{ color: "#8b949e" }}>跑 <code style={{ color: "#e6edf3" }}>npx vitest run --coverage</code> 後看報告：</p>
          <div className="rounded-xl p-4 font-mono text-xs" style={{ backgroundColor: "#161b22", border: "1px solid #30363d" }}>
            <div className="grid grid-cols-4 gap-2 mb-2 text-xs font-bold" style={{ color: "#8b949e" }}>
              <span>File</span><span>Stmts</span><span>Branch</span><span>Lines</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs" style={{ color: "#3fb950" }}>
              <span>cart.ts</span><span>100%</span><span>100%</span><span>100%</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs" style={{ color: "#ffa657" }}>
              <span>checkout.ts</span><span>72%</span><span>60%</span><span>71%</span>
            </div>
          </div>
          <p className="text-xs mt-2" style={{ color: "#8b949e" }}>
            Branch coverage 低 = 有 if/else 分支沒被測試到。優先補這些 case，而不是追求 100% 行覆蓋率。
          </p>
        </div>

        {/* Good /tdd prompt */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "#e6edf3" }}>🚀 好的 /tdd 提示詞範本</h2>
          <div className="space-y-3">
            <CommandBlock command={badPrompt} description="❌ 太模糊，Claude 可能跳過 RED" />
            <CommandBlock command={goodPrompt} description="✅ 具體明確，確保 RED → GREEN 流程" />
            <CommandBlock command="/tdd 實作 formatCurrency(amount, currency) 函式：TWD 用「NT$」前綴，USD 用「$」，超出範圍的 currency 要 throw Error" description="✅ 另一個好範例：明確指定邊界條件" />
          </div>
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between pt-6" style={{ borderTop: "1px solid #30363d" }}>
          <Link href="/scenarios/expert/hooks-setup" className="text-sm hover:underline" style={{ color: "#8b949e" }}>← Hooks 設定</Link>
          <Link href="/scenarios/expert/prompt-engineering" className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90" style={{ backgroundColor: "#bc8cff", color: "#0d1117" }}>
            下一個：提示工程 →
          </Link>
        </div>
      </div>
    </div>
  );
}
