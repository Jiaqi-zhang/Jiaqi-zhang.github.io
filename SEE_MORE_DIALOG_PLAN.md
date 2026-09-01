# “See More” 完整摘要弹窗修改方案

## 1. 修改目标

将研究成果卡片和预印本卡片中的 `See More` 从外部链接改为页面内弹窗：

- 点击后不跳转、不打开新标签页，也不改变当前页面地址。
- 弹出带遮罩层的圆角对话框，显示该成果的标题和完整摘要。
- 弹窗根据手机、平板和桌面设备的可用视口自动调整宽度与高度。
- 摘要过长时只让弹窗内容区滚动，页面主体保持原位置。
- 支持关闭按钮、点击遮罩关闭、`Esc` 关闭和键盘焦点管理。
- 保留卡片中原有的 `Paper`、`Code`、`Video`、`Project` 等外部链接行为。

## 2. 当前代码分析

### 涉及入口

目前有两个相互独立但实现几乎相同的 `See More` 入口：

1. `src/components/research/ResearchList.tsx`
   - 摘要超过 `250` 个字符时截断。
   - `See More` 当前是 `<a>` 链接，跳转到 `w.links.paper`；没有论文链接时使用 `#`。

2. `src/components/preprints/PreprintsList.tsx`
   - 使用相同的 `250` 字符截断方式。
   - `See More` 同样跳转到论文链接或 `#`。

### 可复用能力

项目已经安装 `@radix-ui/react-dialog`，并提供了封装组件：

- `src/components/ui/dialog.tsx`

它已经处理 Portal、遮罩层、打开/关闭动画、`Esc`、焦点锁定及关闭后的焦点恢复。因此无需新增依赖，也不建议重新手写一套弹窗状态和键盘逻辑。

需要注意：现有 `DialogContent` 默认是 `w-full max-w-lg`，且圆角只从 `sm` 断点开始生效。完整摘要弹窗需要在自己的组件中覆盖这些样式，才能保证手机端也留出边距并始终显示圆角。

## 3. 推荐实现结构

### 3.1 新增共享组件

新增：

- `src/components/common/AbstractDialog.tsx`

建议组件接口：

```ts
interface AbstractDialogProps {
  title: string
  abstract: string
  triggerLabel?: string
}
```

组件职责：

- 使用现有 `Dialog`、`DialogTrigger`、`DialogContent`、`DialogHeader`、`DialogTitle` 和 `DialogDescription`。
- 触发器使用 `button type="button"`，外观保持当前 `See More` 的行内文字链接样式。
- 弹窗标题显示当前成果标题，正文显示未截断的 `abstract`。
- 不在组件内读取论文链接，确保该操作不可能触发页面跳转。
- 默认显示文字仍为 `See More`，避免本次行为修改额外改变页面文案。

共享组件能让两个列表保持一致，并把响应式尺寸、滚动和无障碍逻辑集中在一处。

### 3.2 替换两个列表中的链接

分别修改：

- `src/components/research/ResearchList.tsx`
- `src/components/preprints/PreprintsList.tsx`

保留现有摘要截断判断和卡片预览文字，只将长摘要后的 `<a>` 替换为 `AbstractDialog`：

- `title={w.title}`
- `abstract={abstractText}`
- `triggerLabel="See More"`

这样短摘要仍完整显示且不出现按钮，只有超过 `ABSTRACT_MAX_CHARS` 的摘要才提供弹窗入口。

## 4. 弹窗布局与响应式规则

建议仅在 `AbstractDialog` 的 `DialogContent` 上设置以下约束，不修改全局 `ui/dialog.tsx`：

| 项目 | 手机 | 平板 / 桌面 |
| --- | --- | --- |
| 宽度 | `calc(100vw - 2rem)`，左右至少各留 `1rem` | 同样自适应，最大宽度限制为 `max-w-2xl` |
| 高度 | 内容自适应，最大为 `calc(100dvh - 2rem)` | 内容自适应，仍受视口最大高度限制 |
| 圆角 | 强制 `rounded-xl` | 保持 `rounded-xl` |
| 内边距 | 较紧凑，约 `1rem` 至 `1.25rem` | 可提升至约 `1.5rem` |
| 超长内容 | 摘要正文区域纵向滚动 | 摘要正文区域纵向滚动 |

关键样式策略：

- 使用动态视口单位 `dvh`，避免移动浏览器地址栏变化时弹窗超出可视区域。
- 弹窗容器使用 `overflow-hidden`，正文使用 `min-h-0 overflow-y-auto`。
- 标题和正文使用 `break-words`，避免较长单词、URL 或技术术语撑破弹窗。
- 关闭按钮区域为标题预留右侧空间，避免标题文字与关闭图标重叠。
- 字号采用固定的响应式层级，不按视口宽度连续缩放。
- 继续兼容项目现有亮色和暗色主题。

## 5. 交互与无障碍行为

预期交互流程：

1. 用户点击 `See More`。
2. 当前页面不跳转，弹窗在视口中央打开，背景出现遮罩。
3. 焦点进入弹窗，屏幕阅读器读取成果标题和完整摘要。
4. 用户可通过右上角关闭按钮、`Esc` 或点击遮罩关闭。
5. 关闭后焦点回到刚才点击的 `See More` 按钮，页面滚动位置不变。

实现细节：

- 使用真正的 `<button>`，而不是无 `href` 的链接或带 `#` 的链接。
- `DialogTitle` 使用成果标题，为弹窗提供可访问名称。
- `DialogDescription` 承载完整摘要，为弹窗提供可访问描述。
- 复用 Radix Dialog 的焦点锁定和关闭逻辑，不另行监听全局键盘事件。
- 触发器保留清晰的 `focus-visible` 样式，保证键盘用户能看到焦点位置。

## 6. 文件改动范围

计划改动：

| 文件 | 计划内容 |
| --- | --- |
| `src/components/common/AbstractDialog.tsx` | 新增共享完整摘要弹窗 |
| `src/components/research/ResearchList.tsx` | 将 `See More` 外链替换为弹窗触发器 |
| `src/components/preprints/PreprintsList.tsx` | 将 `See More` 外链替换为弹窗触发器 |

明确不改动：

- `src/components/ui/dialog.tsx`：避免改变图库等其他现有弹窗。
- `src/config/content.ts`：摘要和论文数据保持不变。
- `package.json` / `package-lock.json`：现有依赖已经足够。
- `Paper` 等按钮：仍按当前逻辑打开外部链接。

## 7. 实施顺序

1. 新建 `AbstractDialog`，完成标题、完整摘要、关闭按钮和响应式滚动区域。
2. 在 `ResearchList` 中导入该组件，并替换当前 `See More` 的 `<a>`。
3. 在 `PreprintsList` 中做同样替换。
4. 运行 TypeScript/Vite 构建，确认没有类型或打包错误。
5. 在浏览器中验证桌面和移动视口下的尺寸、滚动、暗色模式与关闭行为。

## 8. 验收清单

- [ ] 点击任一长摘要的 `See More` 后，URL 和当前标签页均不变化。
- [ ] 弹窗显示与该卡片匹配的标题和完整摘要，没有二次截断。
- [ ] 手机竖屏、手机横屏、平板和桌面均不会超出视口。
- [ ] 所有尺寸下弹窗都有明显圆角，且与屏幕边缘保留安全距离。
- [ ] 超长摘要可以在弹窗内部滚动，背景页面不跟随滚动。
- [ ] 标题、正文和右上角关闭按钮不重叠。
- [ ] 亮色模式和暗色模式下文字、边框及背景对比度正常。
- [ ] `Esc`、遮罩和关闭按钮都能关闭弹窗。
- [ ] 键盘可聚焦 `See More`，关闭后焦点返回原按钮。
- [ ] 原有 `Paper`、`Code`、`Video`、`Project`、`BibTeX` 和分页功能不受影响。
- [ ] `npm run build` 通过。

## 9. 风险与处理

- **摘要过长导致弹窗溢出**：通过动态视口最大高度和正文独立滚动处理。
- **手机端没有圆角**：在业务弹窗上显式设置基础断点圆角，不依赖现有的 `sm:rounded-lg`。
- **两个列表行为不一致**：使用同一个共享组件，避免复制弹窗样式和逻辑。
- **影响项目其他弹窗**：不修改全局 `DialogContent` 默认样式，只做局部覆盖。
- **误触发外部跳转**：触发器改为 `button`，并从摘要弹窗组件接口中移除链接参数。

---

本文件仅记录修改方案。本阶段不修改任何页面组件、样式、配置或数据代码。
