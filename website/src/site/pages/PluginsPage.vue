<script setup lang="ts">
/**
 * 插件开发页。
 *
 * 全站信息密度最高的一页，对应 PLUGIN.md。结构：
 *   双路线（照抄样例 / 从零手写）→ 最小插件源码 → manifest 字段表
 *   → SDK API 速查 → 生命周期 → 线程模型 → 打包上架 → 踩坑清单。
 *
 * 代码片段都取自 samples/ 与 PLUGIN.md，是可以直接编译的那种写法。
 */
import { computed, ref } from 'vue'

import WinButton from '../../components/WinButton.vue'
import WinInfoBar from '../../components/WinInfoBar.vue'
import WinTextBlock from '../../components/WinTextBlock.vue'
import { useReactiveI18n } from '../../components/i18n'

import PageHeader from '../components/PageHeader.vue'
import PageSection from '../components/PageSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import { apiRows, manifestFields } from '../services/features'
import { GITHUB_REPO, SDK_VERSION, TARGET_FRAMEWORK } from '../services/links'

const { t, locale } = useReactiveI18n()

/* --------------------------------------------------------------- 双路线 ---- */

const routes = computed(() => [
  {
    id: 'sample',
    glyph: '\uE8B7',
    title: t('pluginsPage.routeA'),
    note: t('pluginsPage.routeANote'),
    desc: t('pluginsPage.routeADesc'),
    steps: [1, 2, 3, 4].map((index) => ({
      title: t(`pluginsPage.routeA.step${index}`),
      desc: t(`pluginsPage.routeA.step${index}Desc`),
    })),
    accent: 'var(--brand-3)',
  },
  {
    id: 'scratch',
    glyph: '\uE943',
    title: t('pluginsPage.routeB'),
    note: t('pluginsPage.routeBNote'),
    desc: t('pluginsPage.routeBDesc'),
    steps: [1, 2, 3, 4].map((index) => ({
      title: t(`pluginsPage.routeB.step${index}`),
      desc: t(`pluginsPage.routeB.step${index}Desc`),
    })),
    accent: 'var(--brand-2)',
  },
])

const activeRoute = ref('sample')

/* --------------------------------------------------------- 最小插件源码 ---- */

const csprojSample = `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>${TARGET_FRAMEWORK}</TargetFramework>
    <UseWinUI>true</UseWinUI>
    <Nullable>enable</Nullable>
    <!-- 宿主已加载的 WinUI 程序集不要再复制一份到输出目录 -->
    <EnableDefaultPageItems>false</EnableDefaultPageItems>
  </PropertyGroup>

  <ItemGroup>
    <!-- SDK 是唯一需要引用的宿主侧依赖，它是独立可分发的 -->
    <PackageReference Include="luolan.winland.Core" Version="${SDK_VERSION}.0" />
  </ItemGroup>

</Project>`

const pluginSample = `using WinIsland.Core;

// 继承 IslandPluginBase 就能拿到 Context / Log / Settings / SetContent 这些便利成员
public sealed class HelloPlugin : IslandPluginBase
{
    private IslandLiveContent? _content;

    public override Task InitializeAsync(IPluginContext context)
    {
        // 一定要先把 context 交给基类，后面 Context 属主才有值
        base.Attach(context);

        // 岛上第一次露面的内容
        _content = new IslandLiveContent
        {
            CompactWidth = 148,
            Text = "Hello, island",
        };
        SetContent(_content);

        // 写一行日志，会进 logs/plugin.hello.log
        Log.Info("HelloPlugin initialized.");
        return Task.CompletedTask;
    }

    public override Task ShutdownAsync()
    {
        // 停订阅、停定时器、放掉窗口引用 —— 漏一个宿主就没法把 ALC 卸载干净
        _content = null;
        return Task.CompletedTask;
    }
}`

const manifestSample = `{
  "id": "hello-plugin",
  "name": "Hello Plugin",
  "version": "1.0.0",
  "author": "your-name",
  "description": "Smallest possible WinIsland plugin.",
  "api_version": ${SDK_VERSION},
  "min_host_version": "2.0.0",
  "entry": "HelloPlugin.dll",
  "icon": "Assets/icon.png",
  "settings_pages": [
    { "id": "main", "title": "Hello Plugin", "order": 200 }
  ]
}`

const messageSample = `// 临时消息：不走插件内容，宿主会自己画一张会自己消失的小卡
Context.Island.ShowMessage(new IslandMessage
{
    Title   = "已复制到剪贴板",
    Text    = "3 个文件的路径已写入",
    Glyph   = "\\uE8C8",
    // 不填 Accent 就用中性芯片色
});

// 超级展开：弹一张铺满全屏的聚光卡。
// 注意 Content 必须是插件自己的另一棵可视树 —— 一个窗口一棵树，
// 不能把岛上的元素直接塞进去。
Context.Island.OpenSpotlight(new IslandSpotlight
{
    Content = new MySpotlightView(),
    Size    = new Size(560, 340),
    OnClosed = () => Log.Info("spotlight closed"),
});`

const dropSample = `// 声明一个文件投放目标：拖进来的文件符合条件时，这张卡片才出现
Context.Island.AddDropTarget(new IslandDropTarget
{
    Id       = "hello.txt-to-clipboard",
    Title    = "复制到剪贴板",
    Glyph    = "\\uE8C8",
    // Order 小的排前面。宿主内置动作从 900 起，插件想排前就给小值
    Order    = 10,
    // 只接受文本类与图片类，其余拖进来时这张卡根本不出现
    Accepts  = IslandDropKind.Text | IslandDropKind.Image,
    OnDrop   = async ctx =>
    {
        foreach (var path in ctx.Paths)
            Log.Info($"dropped: {path}");
        await Task.CompletedTask;
    },
});`

/* --------------------------------------------------------------- 生命周期 ---- */

const lifecycle = computed(() => [
  { glyph: '\uE8B7', title: t('pluginsPage.life.discover'), desc: t('pluginsPage.life.discoverDesc') },
  { glyph: '\uE8F4', title: t('pluginsPage.life.load'), desc: t('pluginsPage.life.loadDesc') },
  { glyph: '\uE768', title: t('pluginsPage.life.init'), desc: t('pluginsPage.life.initDesc') },
  { glyph: '\uE7C1', title: t('pluginsPage.life.running'), desc: t('pluginsPage.life.runningDesc') },
  { glyph: '\uE71A', title: t('pluginsPage.life.shutdown'), desc: t('pluginsPage.life.shutdownDesc') },
  { glyph: '\uE74D', title: t('pluginsPage.life.unload'), desc: t('pluginsPage.life.unloadDesc') },
])

/* --------------------------------------------------------------- 线程模型 ---- */

const threading = computed(() => [
  { title: t('pluginsPage.thread.rule1'), desc: t('pluginsPage.thread.rule1Desc'), glyph: '\uE7F4' },
  { title: t('pluginsPage.thread.rule2'), desc: t('pluginsPage.thread.rule2Desc'), glyph: '\uE945' },
  { title: t('pluginsPage.thread.rule3'), desc: t('pluginsPage.thread.rule3Desc'), glyph: '\uE916' },
  { title: t('pluginsPage.thread.rule4'), desc: t('pluginsPage.thread.rule4Desc'), glyph: '\uE7BA' },
])

/* --------------------------------------------------------------- 踩坑清单 ---- */

const pitfalls = computed(() => [
  { title: t('pluginsPage.pitfall1'), desc: t('pluginsPage.pitfall1Desc') },
  { title: t('pluginsPage.pitfall2'), desc: t('pluginsPage.pitfall2Desc') },
  { title: t('pluginsPage.pitfall3'), desc: t('pluginsPage.pitfall3Desc') },
  { title: t('pluginsPage.pitfall4'), desc: t('pluginsPage.pitfall4Desc') },
  { title: t('pluginsPage.pitfall5'), desc: t('pluginsPage.pitfall5Desc') },
])

/* --------------------------------------------------------------- 打包 ---- */

const packSample = `# 仓库里自带打包脚本：把输出目录打成 .lwp（本质是个 zip）
pwsh ./tools/pack-plugin.ps1 -Project ./samples/HelloPlugin -Output ./dist

# 产出的 dist/HelloPlugin.lwp 可以直接拖进「设置 → 插件管理」安装
# 想投稿到社区市场，把 .lwp 传到你的 release，再往索引仓库提一个 PR`

const apiLang = computed(() => (locale.value === 'zh-CN' ? 'zh' : 'en'))

const openRepo = () => window.open(`${GITHUB_REPO}/tree/master/samples`, '_blank', 'noopener,noreferrer')
</script>

<template>
  <div class="plugins-page">
    <PageHeader
      :eyebrow="t('pluginsPage.eyebrow')"
      :title="t('pluginsPage.title')"
      :lead="t('pluginsPage.lead')"
      glyph="&#xEA86;"
    >
      <template #actions>
        <WinButton Style="AccentButtonStyle" Padding="18,10" @click="openRepo">
          <span class="icon" aria-hidden="true">&#xE943;</span>
          <span>{{ t('pluginsPage.ctaSamples') }}</span>
        </WinButton>
        <WinButton Padding="18,10" @click="$router.push('/market')">
          <span class="icon" aria-hidden="true">&#xE719;</span>
          <span>{{ t('nav.market') }}</span>
        </WinButton>
      </template>

      <div class="plugins-page__facts">
        <span class="site-chip site-chip--mono">SDK {{ SDK_VERSION }}</span>
        <span class="site-chip site-chip--mono">.lwp = zip</span>
        <span class="site-chip">{{ TARGET_FRAMEWORK }}</span>
      </div>
    </PageHeader>

    <!-- ======================================================= 双路线 ==== -->
    <PageSection width="wide" :title="t('pluginsPage.routeTitle')" :subtitle="t('pluginsPage.routeLead')">
      <div class="plugins-routes">
        <button
          v-for="route in routes"
          :key="route.id"
          type="button"
          class="plugins-route"
          :class="{ 'is-on': activeRoute === route.id }"
          :style="{ '--route-accent': route.accent }"
          @click="activeRoute = route.id"
        >
          <span class="plugins-route__chip icon" aria-hidden="true">{{ route.glyph }}</span>
          <span class="plugins-route__title">{{ route.title }}</span>
          <span class="plugins-route__note">{{ route.note }}</span>
        </button>
      </div>

      <div v-for="route in routes" v-show="activeRoute === route.id" :key="route.id" class="plugins-flow">
        <p class="plugins-flow__desc">{{ route.desc }}</p>
        <ol class="plugins-flow__steps">
          <li v-for="(step, index) in route.steps" :key="step.title" class="plugins-flow__step">
            <span class="plugins-flow__index">{{ index + 1 }}</span>
            <div>
              <span class="plugins-flow__step-title">{{ step.title }}</span>
              <p class="plugins-flow__step-desc">{{ step.desc }}</p>
            </div>
          </li>
        </ol>
      </div>
    </PageSection>

    <!-- =================================================== 最小插件 ==== -->
    <PageSection width="wide" :title="t('pluginsPage.minimalTitle')" :subtitle="t('pluginsPage.minimalLead')">
      <div class="plugins-code">
        <div>
          <p class="plugins-code__label">HelloPlugin.csproj</p>
          <CodeBlock :code="csprojSample" filename="HelloPlugin.csproj" lang="text" />
        </div>
        <div>
          <p class="plugins-code__label">HelloPlugin.cs</p>
          <CodeBlock :code="pluginSample" filename="HelloPlugin.cs" lang="csharp" />
        </div>
      </div>
    </PageSection>

    <!-- ==================================================== manifest ==== -->
    <PageSection width="wide" :title="t('pluginsPage.manifestTitle')" :subtitle="t('pluginsPage.manifestLead')">
      <div class="plugins-page__split">
        <div class="site-table-wrap">
          <table class="site-table">
            <thead>
              <tr>
                <th>{{ t('pluginsPage.colField') }}</th>
                <th class="site-table__nowrap">{{ t('pluginsPage.colRequired') }}</th>
                <th>{{ t('pluginsPage.colMeaning') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="field in manifestFields" :key="field.field">
                <td class="site-table__nowrap"><code>{{ field.field }}</code></td>
                <td class="site-table__nowrap">
                  <span class="site-chip" :class="{ 'site-chip--accent': field.required }">
                    {{ field.required ? t('common.required') : t('common.optional') }}
                  </span>
                </td>
                <td>{{ apiLang === 'zh' ? field.zh : field.en }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <p class="plugins-code__label">plugin.json</p>
          <CodeBlock :code="manifestSample" filename="plugin.json" lang="json" />
        </div>
      </div>

      <WinInfoBar
        class="plugins-page__bar"
        Severity="Warning"
        :Title="t('pluginsPage.versionRuleTitle')"
        :Message="t('pluginsPage.versionRule')"
        :IsOpen="true"
      />
    </PageSection>

    <!-- ==================================================== SDK 速查 ==== -->
    <PageSection width="wide" :title="t('pluginsPage.apiTitle')" :subtitle="t('pluginsPage.apiLead')">
      <div id="sdk" class="plugins-page__anchor" />
      <div class="site-table-wrap">
        <table class="site-table">
          <thead>
            <tr>
              <th>{{ t('pluginsPage.colMember') }}</th>
              <th>{{ t('pluginsPage.colDesc') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in apiRows" :key="row.member">
              <td class="site-table__nowrap"><code>{{ row.member }}</code></td>
              <td>{{ apiLang === 'zh' ? row.zh : row.en }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="plugins-code plugins-code--pair">
        <div>
          <p class="plugins-code__label">{{ t('pluginsPage.snippetMessage') }}</p>
          <CodeBlock :code="messageSample" filename="Messaging.cs" lang="csharp" />
        </div>
        <div>
          <p class="plugins-code__label">{{ t('pluginsPage.snippetDrop') }}</p>
          <CodeBlock :code="dropSample" filename="DropTarget.cs" lang="csharp" />
        </div>
      </div>
    </PageSection>

    <!-- ==================================================== 生命周期 ==== -->
    <PageSection width="wide" :title="t('pluginsPage.lifeTitle')" :subtitle="t('pluginsPage.lifeLead')">
      <div class="plugins-life">
        <div v-for="(stage, index) in lifecycle" :key="stage.title" class="plugins-life__item">
          <div class="plugins-life__marker">
            <span class="plugins-life__glyph icon" aria-hidden="true">{{ stage.glyph }}</span>
            <span v-if="index < lifecycle.length - 1" class="plugins-life__line" aria-hidden="true" />
          </div>
          <div class="plugins-life__body">
            <span class="plugins-life__title">{{ stage.title }}</span>
            <p class="plugins-life__desc">{{ stage.desc }}</p>
          </div>
        </div>
      </div>
    </PageSection>

    <!-- ==================================================== 线程模型 ==== -->
    <PageSection width="wide" :title="t('pluginsPage.threadTitle')" :subtitle="t('pluginsPage.threadLead')">
      <div class="site-grid site-grid--wide">
        <article v-for="rule in threading" v-reveal :key="rule.title" class="site-card">
          <span class="site-card__glyph icon" aria-hidden="true">{{ rule.glyph }}</span>
          <h3 class="site-card__title">{{ rule.title }}</h3>
          <p class="site-card__body">{{ rule.desc }}</p>
        </article>
      </div>
    </PageSection>

    <!-- ==================================================== 打包上架 ==== -->
    <PageSection width="wide" :title="t('pluginsPage.packTitle')" :subtitle="t('pluginsPage.packLead')">
      <CodeBlock :code="packSample" filename="pack-plugin.ps1" lang="powershell" />
    </PageSection>

    <!-- ==================================================== 踩坑清单 ==== -->
    <PageSection width="wide" :title="t('pluginsPage.pitfallsTitle')" :subtitle="t('pluginsPage.pitfallsLead')">
      <div class="plugins-pitfalls">
        <details v-for="(item, index) in pitfalls" :key="item.title" class="plugins-pitfall">
          <summary>
            <span class="plugins-pitfall__index">{{ index + 1 }}</span>
            <span class="plugins-pitfall__title">{{ item.title }}</span>
            <span class="icon plugins-pitfall__chevron" aria-hidden="true">&#xE70D;</span>
          </summary>
          <p class="plugins-pitfall__body">{{ item.desc }}</p>
        </details>
      </div>

      <WinInfoBar
        class="plugins-page__bar"
        Severity="Informational"
        :Title="t('pluginsPage.helpTitle')"
        :Message="t('pluginsPage.help')"
        :IsOpen="true"
      />
    </PageSection>
  </div>
</template>

<style scoped>
.plugins-page {
  padding-bottom: 40px;
}

.plugins-page__facts {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.plugins-page__bar {
  margin-top: 18px;
}

.plugins-page__anchor {
  scroll-margin-top: 130px;
}

/* ======================================================== 双路线 ==== */

.plugins-routes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

.plugins-route {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px;
  border-radius: 12px;
  border: 1px solid var(--card-stroke);
  font-family: inherit;
  text-align: left;
  background: var(--card-bg);
  cursor: pointer;
  transition: border-color var(--fast-duration) linear, background-color var(--fast-duration) linear;
}

.plugins-route:hover {
  border-color: color-mix(in srgb, var(--route-accent) 34%, var(--card-stroke));
}

.plugins-route.is-on {
  border-color: var(--route-accent);
  background: color-mix(in srgb, var(--route-accent) 7%, var(--card-bg));
}

.plugins-route__chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  font-size: 15px;
  color: var(--route-accent);
  background: color-mix(in srgb, var(--route-accent) 14%, transparent);
}

.plugins-route__title {
  font-size: 14.5px;
  font-weight: 600;
  color: var(--text-primary);
}

.plugins-route__note {
  font-size: 12px;
  line-height: 18px;
  color: var(--text-tertiary);
}

.plugins-flow__desc {
  margin: 0 0 18px;
  max-width: 80ch;
  font-size: 14px;
  line-height: 23px;
  color: var(--text-secondary);
}

.plugins-flow__steps {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 16px;
}

.plugins-flow__step {
  display: flex;
  gap: 12px;
}

.plugins-flow__index {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 11.5px;
  font-weight: 700;
  color: var(--text-on-accent);
  background: var(--accent-base);
}

.plugins-flow__step-title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-primary);
}

.plugins-flow__step-desc {
  margin: 5px 0 0;
  font-size: 12.5px;
  line-height: 20px;
  color: var(--text-secondary);
}

/* ======================================================== 代码 ==== */

.plugins-code {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.plugins-code--pair {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  align-items: start;
}

.plugins-code__label {
  margin: 0 0 8px;
  font-family: var(--mono-font);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-tertiary);
}

.plugins-page__split {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}

/* ==================================================== 生命周期 ==== */

.plugins-life {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 4px 24px;
}

.plugins-life__item {
  display: flex;
  gap: 14px;
}

.plugins-life__marker {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 auto;
}

.plugins-life__glyph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 14px;
  color: var(--accent-base);
  background: color-mix(in srgb, var(--accent-base) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent-base) 24%, transparent);
}

.plugins-life__line {
  flex: 1;
  width: 1px;
  min-height: 20px;
  background: var(--divider-stroke);
}

.plugins-life__body {
  padding-bottom: 22px;
}

.plugins-life__title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-primary);
}

.plugins-life__desc {
  margin: 5px 0 0;
  font-size: 12.5px;
  line-height: 20px;
  color: var(--text-secondary);
}

/* ==================================================== 踩坑清单 ==== */

.plugins-pitfalls {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.plugins-pitfall {
  border-radius: 10px;
  border: 1px solid var(--card-stroke);
  background: var(--card-bg);
  overflow: hidden;
}

.plugins-pitfall summary {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
  list-style: none;
}

.plugins-pitfall summary::-webkit-details-marker {
  display: none;
}

.plugins-pitfall summary:hover {
  background: var(--subtle-secondary);
}

.plugins-pitfall__index {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-secondary);
  background: var(--subtle-secondary);
}

.plugins-pitfall__title {
  flex: 1;
  min-width: 0;
}

.plugins-pitfall__chevron {
  flex: 0 0 auto;
  font-size: 12px;
  color: var(--text-tertiary);
  transition: transform var(--fast-duration) var(--fast-out-slow-in);
}

.plugins-pitfall[open] .plugins-pitfall__chevron {
  transform: rotate(180deg);
}

.plugins-pitfall__body {
  margin: 0;
  padding: 0 16px 16px 50px;
  font-size: 13px;
  line-height: 22px;
  color: var(--text-secondary);
  animation: win-nav-enter var(--normal-duration) var(--fast-out-slow-in);
}

@media (max-width: 1080px) {
  .plugins-page__split {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
