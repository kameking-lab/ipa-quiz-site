# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: study-presence.spec.ts >> many qualifications stay within a keyboard-scrollable small list
- Location: tests\e2e\study-presence.spec.ts:125:5

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByRole('region', { name: '前回取得時点の学習状況' }).getByRole('group', { name: '前回取得時点の集計に基づくチワワの自習室', exact: true })
Expected: "true"
Received: "false"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for getByRole('region', { name: '前回取得時点の学習状況' }).getByRole('group', { name: '前回取得時点の集計に基づくチワワの自習室', exact: true })
    14 × locator resolved to <div role="group" data-stage="2" class="study-room-scene" data-motion-visible="false" aria-label="前回取得時点の集計に基づくチワワの自習室">…</div>
       - unexpected value "false"

```

```yaml
- group "前回取得時点の集計に基づくチワワの自習室"
```

# Test source

```ts
  113 |   await page.clock.fastForward(45_001);
  114 |   const historical = page.getByRole("region", { name: "前回取得時点の学習状況" });
  115 |   await expect(historical.locator(".study-room-total")).toHaveText("4人");
  116 |   await expect(historical.locator("time")).toHaveAttribute("datetime", cached.snapshot.measuredAt);
  117 |   await expect(historical.getByText("学習者数は1時間ごとに取得します。リアルタイム表示ではありません。席と人数は前回取得時点の集計です。", { exact: true })).toBeVisible();
  118 |   await show(page, { mode: "stale", snapshot: null, previous: cached.snapshot, reason: "expired" });
  119 |   await expect(historical.locator("time")).toHaveAttribute("datetime", cached.snapshot.measuredAt);
  120 |   await expect(historical.locator(".study-room-total")).toHaveText("4人");
  121 |   const invalidPrevious = { ...cached.snapshot, validUntil: new Date(Date.parse(cached.snapshot.measuredAt) + 3_600_000).toISOString() };
  122 |   await show(page, { mode: "stale", snapshot: null, previous: invalidPrevious, reason: "unavailable" }, "学習のご案内");
  123 |   await expectGuidance(page);
  124 | });
  125 | test("many qualifications stay within a keyboard-scrollable small list", async ({ page }) => {
  126 |   await page.setViewportSize({ width: 320, height: 720 }); await page.goto("/");
  127 |   const codes = ["ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au", "denko2", "denken3"];
  128 |   // parseStudyPresence orders by count descending, then canonical code in English locale.
  129 |   // All fixture counts are one: this explicit oracle must not depend on the unsorted input order.
  130 |   const expectedOrder = [
  131 |     { exam: "ap", name: "応用情報技術者" },
  132 |     { exam: "au", name: "システム監査技術者" },
  133 |     { exam: "db", name: "データベーススペシャリスト" },
  134 |     { exam: "denken3", name: "電験三種" },
  135 |     { exam: "denko2", name: "第二種電気工事士" },
  136 |     { exam: "es", name: "エンベデッドシステムスペシャリスト" },
  137 |     { exam: "fe", name: "基本情報技術者" },
  138 |     { exam: "ip", name: "ITパスポート" },
  139 |     { exam: "nw", name: "ネットワークスペシャリスト" },
  140 |     { exam: "pm", name: "プロジェクトマネージャ" },
  141 |     { exam: "sa", name: "システムアーキテクト" },
  142 |     { exam: "sc", name: "情報処理安全確保支援士" },
  143 |     { exam: "sg", name: "情報セキュリティマネジメント" },
  144 |     { exam: "sm", name: "ITサービスマネージャ" },
  145 |     { exam: "st", name: "ITストラテジスト" },
  146 |   ];
  147 |   expect(expectedOrder.map(row => row.exam).sort()).toEqual([...codes].sort());
  148 |   await show(page, await measured(page, { count: codes.length, exams: codes.map(exam => ({ exam, count: 1 })) }));
  149 |   const region = page.getByRole("region", { name: "前回取得時点の学習状況" });
  150 |   const list = page.getByRole("list", { name: "資格別の学習人数" });
  151 |   await expect(list.getByRole("listitem")).toHaveCount(codes.length);
  152 |   await expect(list.getByRole("listitem")).toHaveText(expectedOrder.map(row =>
  153 |     `前回取得時点の直近5分に1人が${row.name}を学習しました。`));
  154 |   await expect(region.locator(".study-room-total")).toHaveText("15人");
  155 |   expect((await list.boundingBox())?.height).toBeLessThanOrEqual(220);
  156 |   await expect(list).toHaveAttribute("tabindex", "0");
  157 |   expect(await list.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
  158 |   expect(await list.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  159 |   await list.focus();
  160 |   await expect(list).toBeFocused();
  161 |   await page.keyboard.press("End");
  162 |   await expect.poll(() => list.evaluate(el => el.scrollTop)).toBeGreaterThan(0);
  163 |   await page.keyboard.press("Home");
  164 |   await expect.poll(() => list.evaluate(el => el.scrollTop)).toBe(0);
  165 | 
  166 |   // The accepted room expands in place. Numbered controls are separate from the decorative scene.
  167 |   const scene = region.getByRole("group", { name: "前回取得時点の集計に基づくチワワの自習室", exact: true });
  168 |   const seats = region.getByRole("group", { name: "自習室の席を選ぶ", exact: true }).getByRole("button");
  169 |   const expectSeatOrder = async () => {
  170 |     await expect(seats).toHaveCount(12);
  171 |     for (const [index, row] of expectedOrder.slice(0, 12).entries()) {
  172 |       await expect(seats.nth(index)).toHaveAccessibleName(`${index + 1} ${row.name}`);
  173 |       await expect(seats.nth(index)).toHaveAttribute("aria-controls", "study-room-selection");
  174 |     }
  175 |   };
  176 |   await expectSeatOrder();
  177 |   await expect(scene.getByRole("button")).toHaveCount(0);
  178 |   await expect(scene.locator('.study-room-seat[aria-hidden="true"]')).toHaveCount(12);
  179 |   await expect(scene).toHaveAttribute("data-stage", "2");
  180 |   await expect(region.getByText("イラスト 12体・ほか 3人", { exact: true })).toBeVisible();
  181 |   await expect(region.getByText("全15人の集計を一部イラストで表示", { exact: true })).toBeVisible();
  182 |   await expect(region.getByRole("navigation", { name: "自習室の部屋を選ぶ" })).toHaveCount(0);
  183 |   await expect(region.getByRole("button", { name: "次の部屋", exact: true })).toHaveCount(0);
  184 |   const scroll = region.getByLabel("広がる自習室。横にスクロールできます", { exact: true });
  185 |   expect(await scroll.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
  186 |   await scroll.focus();
  187 |   await page.keyboard.press("ArrowRight");
  188 |   await expect.poll(() => scroll.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
  189 | 
  190 |   const seat = seats.first();
  191 |   await seat.focus();
  192 |   await page.keyboard.press("Enter");
  193 |   await expect(seat).toHaveAttribute("aria-pressed", "true");
  194 |   const selectedQualification = region.locator("#study-room-selection").getByRole("heading", { name: expectedOrder[0].name, exact: true });
  195 |   await expect(selectedQualification).toBeVisible();
  196 |   const refreshed = await measured(page, { count: codes.length, exams: codes.map(exam => ({ exam, count: 1 })) });
  197 |   await show(page, { mode: "stale", snapshot: null, previous: refreshed.snapshot, reason: "unavailable" });
  198 |   await expectSeatOrder();
  199 |   await expect(selectedQualification).toBeVisible();
  200 |   await expect(seat).toHaveAttribute("aria-pressed", "true");
  201 |   await expect(seat).toBeFocused();
  202 |   await page.keyboard.press("Escape");
  203 |   await expect(seat).toHaveAttribute("aria-pressed", "false");
  204 |   await page.keyboard.press("Enter");
  205 |   await expect(seat).toHaveAttribute("aria-pressed", "true");
  206 |   await region.getByRole("button", { name: "選択を戻す", exact: true }).click();
  207 |   await expect(seat).toBeFocused();
  208 |   await expect(seat).toHaveAttribute("aria-pressed", "false");
  209 |   // Independent reward controls may exist; the room scene itself has no motion toggle.
  210 |   await expect(scene.getByRole("button", { name: /動き/ })).toHaveCount(0);
  211 |   await expect(region.getByText("静止表示", { exact: true })).toHaveCount(0);
  212 |   await scene.scrollIntoViewIfNeeded();
> 213 |   await expect(scene).toHaveAttribute("data-motion-visible", "true");
      |                       ^ Error: expect(locator).toHaveAttribute(expected) failed
  214 |   await page.emulateMedia({ reducedMotion: "reduce" });
  215 |   expect(await region.locator(".study-room-scene .study-mascot").evaluateAll(elements => elements.every(el => getComputedStyle(el).animationName === "none"))).toBe(true);
  216 |   await expectBounded(page);
  217 | });
  218 | test("a loaded quiz publishes only its real question qualification and automation sends no heartbeat", async ({ page }) => {
  219 |   let heartbeats = 0;
  220 |   page.on("request", request => { if (request.url().includes("/api/stats/study-presence") && request.method() === "POST") heartbeats++; });
  221 |   await page.goto("/quiz?mode=random&exam=fe");
  222 |   await expect(page.locator('[data-study-presence-exam="fe"]')).toBeVisible();
  223 |   expect(heartbeats).toBe(0);
  224 | });
  225 | 
```