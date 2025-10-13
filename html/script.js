
document.addEventListener('DOMContentLoaded', () => {
    const npcs = [{"id":"npc-1759815142486","name":"＠NULL_WIZARD","shortDescription":"怪しいアカウント。","description":"カルト教団の動向を追っているフリーのハッカー兼魔術師。\nカルト教団の情報をすっぱ抜こうとしたところ、「Kruschtya.exe」を複数送り付けられ自身のコンピューターが爆散。\n復讐の機会をうかがっている。\n言動がどことなくダルい。\n固定ツイートは「クリスピーな終末 アポカリカリプス」\nbioは「十分に発達した科学技術は、魔法と見分けがつかない。」","borderColor":"#241570","bubbleColor":"#ffffff","images":[{"name":"@NULL_WIZARD_通常","src":"images/npc_null_wizard_0_0.png"},{"name":"@NULL_WIZARD_Black","src":"images/npc_null_wizard_1_1.png"},{"name":"@NULL_WIZARD_バックファイア","src":"images/npc_null_wizard_2_3.png"},{"name":"@NULL_WIZARD_やったな","src":"images/npc_null_wizard_3_4.png"},{"name":"@NULL_WIZARD_俺の愛機が！","src":"images/npc_null_wizard_4_5.png"},{"name":"@NULL_WIZARD_メガネクイｯ","src":"images/npc_null_wizard_5_2.png"}],"stats":{},"commands":""}];
    const headings = [{"id":"heading-1759814664197-0","text":"シナリオ概要","level":1},{"id":"heading-1759814766419-1","text":"シナリオ背景","level":1},{"id":"heading-1759814982174-2","text":"NPC","level":2},{"id":"heading-1759815182201-4","text":"▼Q&A","level":2},{"id":"heading-1759815223828-5","text":"シナリオ本文","level":1},{"id":"heading-1759815235011-6","text":"導入","level":2},{"id":"heading-1759815282541-7","text":"共通導入","level":2},{"id":"heading-1759815731556-8","text":"マルウェアを何とかしよう！","level":2},{"id":"heading-1759816131129-9","text":"ウイルスの特定","level":2},{"id":"heading-1759816257825-10","text":"削除の試み","level":2},{"id":"heading-1759816422284-11","text":"SNSで検索しよう！","level":2},{"id":"heading-1759816493542-12","text":"魔術師とコンタクト","level":2},{"id":"heading-1759816709294-13","text":"反撃の時間","level":2},{"id":"heading-1759818130774-14","text":"END分岐","level":2},{"id":"heading-1759818145313-15","text":"END A：サーバーへの逆襲","level":3},{"id":"heading-1759818203557-16","text":"END B：バックファイア","level":3},{"id":"heading-1759818478527-17","text":"END C：遅すぎた決断","level":3},{"id":"heading-1759818503923-18","text":"あとがき","level":1}];
    const npcGroups = [{"id":"npc-group-mgg46j5f-rkl4o","name":"未分類","collapsed":false,"npcOrder":["npc-1759815142486"]}];
    const settings = {"headingStyles":{"p":{"color":"#1f2937","bg":"transparent","font":"inherit","size":"16px","underlineColor":"transparent","underlineWidth":"0","underlineStyle":"solid"},"h1":{"color":"#ffffff","bg":"#000000","font":"inherit","size":"40px","underlineColor":"#d1d5db","underlineWidth":"0","underlineStyle":"solid"},"h2":{"color":"#1f2937","bg":"#ffffff","font":"inherit","size":"32px","underlineColor":"#434447","underlineWidth":"2px","underlineStyle":"solid"},"h3":{"color":"#1f2937","bg":"#ffffff","font":"inherit","size":"24px","underlineColor":"#208097","underlineWidth":"1px","underlineStyle":"dashed"},"h4":{"color":"#1f2937","bg":"transparent","font":"inherit","size":"18px","underlineColor":"transparent","underlineWidth":"0","underlineStyle":"solid"},"h5":{"color":"#1f2937","bg":"transparent","font":"inherit","size":"16px","underlineColor":"transparent","underlineWidth":"0","underlineStyle":"solid"},"h6":{"color":"#1f2937","bg":"transparent","font":"inherit","size":"15px","underlineColor":"transparent","underlineWidth":"0","underlineStyle":"solid"}},"panelWidths":{"npc":220}};

    const main = document.getElementById('viewer-main');
    const body = document.body;
    const root = document.documentElement;
    const headingsPanel = document.getElementById('headings-panel-export');
    const npcPanel = document.getElementById('npc-panel-export');
    const npcPanelResizer = document.getElementById('npc-panel-resizer-export');
    const NPC_PANEL_DEFAULT_WIDTH = 260;
    const NPC_PANEL_MIN_WIDTH = 220;
    const NPC_PANEL_MAX_WIDTH = 640;
    let npcPanelWidth = clampNpcPanelWidth(
        settings && settings.panelWidths ? settings.panelWidths.npc : undefined,
        NPC_PANEL_DEFAULT_WIDTH
    );
    let isNpcPanelResizing = false;
    let npcPanelResizeStartX = 0;
    let npcPanelResizeStartWidth = npcPanelWidth;
    setNpcPanelWidth(npcPanelWidth, true);
    const COPY_BTN_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zM-1 1.5A1.5 1.5 0 0 1 .5 0h3A1.5 1.5 0 0 1 5 1.5v1A1.5 1.5 0 0 1 3.5 4h-3A1.5 1.5 0 0 1-1 2.5v-1z"/></svg>';
    const copyBaseSelector = 'p, .npc-dialogue, .info-box, .gm-memo, .secret-box, .handout-box, .skill-box, blockquote';
    const copyWrapperSelector = 'div[data-page-index]';
    function addCopyButton(el){
        if (!el || el.querySelector('.copy-btn-export')) return;
        var text = (el.innerText || '').trim();
        if (!text) return;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'copy-btn-export';
        btn.title = 'Copy to clipboard';
        btn.innerHTML = COPY_BTN_SVG;
        el.classList.add('copy-target-export');
        el.appendChild(btn);
    }
    function ensureCopyButtons(container) {
        var root = container || main;
        root.querySelectorAll(copyBaseSelector).forEach(addCopyButton);
        root.querySelectorAll(copyWrapperSelector).forEach(function(el){
            if (el.matches(copyBaseSelector)) return;
            if (el.querySelector(copyBaseSelector)) return;
            addCopyButton(el);
        });
    }
    function esc(s){
        var str = (s==null ? '' : String(s));
        return str
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#39;');
    }

    function normalizePathname(pathname){
        if (typeof pathname !== 'string') return '';
        var trimmed = pathname.trim();
        if (!trimmed) return '';
        return trimmed.replace(/\/+$/, '') || '/';
    }

    function decodeHashFragment(fragment){
        if (!fragment) return '';
        var value = fragment.charAt(0) === '#' ? fragment.slice(1) : fragment;
        if (!value) return '';
        try {
            return decodeURIComponent(value);
        } catch (err) {
            return value;
        }
    }

    function getLocalAnchorId(href){
        if (!href) return '';
        var trimmed = String(href).trim();
        if (!trimmed) return '';
        if (trimmed === '#') return '';
        if (trimmed.charAt(0) === '#') {
            return decodeHashFragment(trimmed);
        }
        try {
            var resolved = new URL(trimmed, window.location.href);
            if (!resolved.hash || resolved.hash === '#') return '';
            if (resolved.protocol !== window.location.protocol) return '';
            if (resolved.host !== window.location.host) return '';
            if (normalizePathname(resolved.pathname) !== normalizePathname(window.location.pathname)) return '';
            if (resolved.search !== window.location.search) return '';
            return decodeHashFragment(resolved.hash);
        } catch (err) {
            return '';
        }
    }

    function findPageIndexForElement(element){
        if (!element) return -1;
        var node = element;
        while (node && node !== main && node.parentElement !== main) {
            node = node.parentElement;
        }
        if (!node || node === main) return -1;
        var pageIndex = elementPageIndex.get(node);
        return typeof pageIndex === 'number' ? pageIndex : -1;
    }

    function scrollToAnchorTarget(targetElement){
        if (!targetElement) return;
        requestAnimationFrame(function(){
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    function syncPageWithHash(){
        if (!window.location || !window.location.hash) return;
        var targetId = getLocalAnchorId(window.location.hash);
        if (!targetId) return;
        var targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        if (isPaged) {
            var targetPage = findPageIndexForElement(targetElement);
            if (targetPage >= 0 && targetPage !== currentPage) {
                renderPage(targetPage);
            }
        }
        scrollToAnchorTarget(targetElement);
    }

    function handleInternalNavigation(event){
        if (event.defaultPrevented) return;
        if (typeof event.button === 'number' && event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        var anchor = event.target && event.target.closest ? event.target.closest('a[href]') : null;
        if (!anchor) return;
        var href = anchor.getAttribute('href');
        var targetId = getLocalAnchorId(href);
        if (!targetId) return;
        var targetAttr = anchor.getAttribute('target');
        if (targetAttr) {
            var targetLower = targetAttr.toLowerCase();
            if (targetLower && targetLower !== '_self' && targetLower !== 'self') return;
        }
        if (anchor.hasAttribute('download')) return;
        var targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        event.preventDefault();

        if (isPaged) {
            var targetPage = findPageIndexForElement(targetElement);
            if (targetPage >= 0 && targetPage !== currentPage) {
                renderPage(targetPage);
            }
        }

        scrollToAnchorTarget(targetElement);

        var hashId = targetElement.id || targetId;
        if (hashId) {
            try {
                var urlForHash = new URL(window.location.href);
                var previousHash = urlForHash.hash;
                urlForHash.hash = hashId;
                if (urlForHash.hash !== window.location.hash) {
                    if (typeof history !== 'undefined' && typeof history.pushState === 'function') {
                        history.pushState(null, '', urlForHash.toString());
                    } else {
                        window.location.hash = hashId;
                    }
                } else if (!previousHash) {
                    // Ensure hash is set when previously empty
                    window.location.hash = hashId;
                }
            } catch (err) {
                window.location.hash = hashId;
            }
        }
    }

    function classifyLinkType(href){
        if (!href) return '';
        var trimmed = String(href).trim();
        if (!trimmed) return '';
        if (getLocalAnchorId(trimmed)) return 'internal';
        if (/^(mailto:|tel:)/i.test(trimmed)) return 'external';
        if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return 'external';
        return 'external';
    }

    function annotateLinks(container){
        var scope = container || main;
        if (!scope) return;
        scope.querySelectorAll('a[href]').forEach(function(anchor){
            var href = anchor.getAttribute('href');
            var type = classifyLinkType(href);
            if (!type) {
                anchor.removeAttribute('data-link-type');
                return;
            }
            anchor.setAttribute('data-link-type', type);
            if (!anchor.getAttribute('title')) anchor.setAttribute('title', href);
            if (type === 'external') {
                if (!anchor.target) anchor.target = '_blank';
                var rel = anchor.getAttribute('rel') || '';
                if (!/noopener/i.test(rel)) {
                    anchor.setAttribute('rel', (rel + ' noopener noreferrer').trim());
                }
            }
        });
    }

    function clampNpcPanelWidth(value, fallback){
        if (typeof value === 'string') {
            value = parseFloat(value);
        }
        var numeric = Number(value);
        if (!Number.isFinite(numeric)) return fallback;
        if (numeric < NPC_PANEL_MIN_WIDTH) return NPC_PANEL_MIN_WIDTH;
        if (numeric > NPC_PANEL_MAX_WIDTH) return NPC_PANEL_MAX_WIDTH;
        return numeric;
    }

    function setNpcPanelWidth(width, force){
        var reference = Number.isFinite(npcPanelWidth) ? npcPanelWidth : NPC_PANEL_DEFAULT_WIDTH;
        var next = clampNpcPanelWidth(width, reference);
        if (!force && next === npcPanelWidth) return npcPanelWidth;
        npcPanelWidth = next;
        root.style.setProperty('--npc-panel-width', npcPanelWidth + 'px');
        return npcPanelWidth;
    }

    function beginNpcPanelResize(startX){
        isNpcPanelResizing = true;
        npcPanelResizeStartX = startX;
        npcPanelResizeStartWidth = npcPanelWidth;
        body.classList.add('npc-panel-resizing');
        if (npcPanelResizer) npcPanelResizer.classList.add('dragging');
    }

    function updateNpcPanelResize(currentX){
        if (!isNpcPanelResizing) return;
        var delta = npcPanelResizeStartX - currentX;
        setNpcPanelWidth(npcPanelResizeStartWidth + delta, true);
    }

    function finishNpcPanelResize(){
        if (!isNpcPanelResizing) return;
        isNpcPanelResizing = false;
        body.classList.remove('npc-panel-resizing');
        if (npcPanelResizer) npcPanelResizer.classList.remove('dragging');
        npcPanelResizeStartWidth = npcPanelWidth;
    }

    function handleNpcPanelResizerPointerDown(event){
        if (event.pointerType === 'mouse' && typeof event.button === 'number' && event.button !== 0) return;
        event.preventDefault();
        var pointerId = event.pointerId;
        beginNpcPanelResize(event.clientX);
        var moveHandler = function(moveEvent){
            if (moveEvent.pointerId !== pointerId) return;
            moveEvent.preventDefault();
            updateNpcPanelResize(moveEvent.clientX);
        };
        var endHandler = function(endEvent){
            if (endEvent.pointerId !== pointerId) return;
            endEvent.preventDefault();
            finishNpcPanelResize();
            window.removeEventListener('pointermove', moveHandler);
            window.removeEventListener('pointerup', endHandler);
            window.removeEventListener('pointercancel', endHandler);
        };
        window.addEventListener('pointermove', moveHandler);
        window.addEventListener('pointerup', endHandler);
        window.addEventListener('pointercancel', endHandler);
    }

    function handleNpcPanelResizerKeydown(event){
        if (!npcPanelResizer) return;
        var step = event.shiftKey ? 20 : 10;
        var prev = npcPanelWidth;
        if (event.key === 'ArrowLeft') {
            setNpcPanelWidth(npcPanelWidth + step, true);
        } else if (event.key === 'ArrowRight') {
            setNpcPanelWidth(npcPanelWidth - step, true);
        } else if (event.key === 'Home') {
            setNpcPanelWidth(NPC_PANEL_MAX_WIDTH, true);
        } else if (event.key === 'End') {
            setNpcPanelWidth(NPC_PANEL_MIN_WIDTH, true);
        } else {
            return;
        }
        if (npcPanelWidth !== prev) {
            npcPanelResizeStartWidth = npcPanelWidth;
        }
        event.preventDefault();
    }

    if (settings && settings.headingStyles) {
        const hs = settings.headingStyles;
        ['p','h1','h2','h3','h4','h5','h6'].forEach(function(lv){
            const s = hs[lv];
            if (!s) return;
            if (lv === 'p') {
                if (s.size) root.style.setProperty('--p-font-size', s.size);
            } else {
                if (s.color) root.style.setProperty('--' + lv + '-color', s.color);
                if (s.bg) root.style.setProperty('--' + lv + '-bg', s.bg);
                if (s.font) root.style.setProperty('--' + lv + '-font', s.font);
                if (s.size) root.style.setProperty('--' + lv + '-size', s.size);
                if (s.underlineColor) root.style.setProperty('--' + lv + '-ul-color', s.underlineColor);
                if (s.underlineWidth) root.style.setProperty('--' + lv + '-ul-width', s.underlineWidth);
                if (s.underlineStyle) root.style.setProperty('--' + lv + '-ul-style', s.underlineStyle);
            }
        });
    }

    // Resolve NPC icons in dialogues from NPC data (avoid per-message images)
    function resolveDialogueIcons() {
        main.querySelectorAll('.npc-dialogue').forEach(block => {
            const npcId = block.dataset.npcId;
            const exp = block.dataset.expressionName;
            const npc = npcs.find(n => n.id === npcId);
            const icon = block.querySelector('.npc-icon');
            if (!npc || !icon) return;
            const img = (npc.images || []).find(im => im.name === exp) || (npc.images || [])[0];
            if (img && img.src) icon.src = img.src;
            if (npc.borderColor) icon.style.borderColor = npc.borderColor;
            const bubble = block.querySelector('.npc-bubble');
            if (bubble && npc.bubbleColor) bubble.style.setProperty('--bubble-bg', npc.bubbleColor);
            block.style.setProperty('--speaker-color', npc.borderColor || '#1f2937');
        });
    }

    resolveDialogueIcons();
    ensureCopyButtons(main);
    annotateLinks(main);
    const copyObserver = new MutationObserver(function(mutations){
        var needsUpdate = false;
        for (var i = 0; i < mutations.length; i++) {
            var m = mutations[i];
            if (m.type === 'childList' && m.addedNodes && m.addedNodes.length) {
                needsUpdate = true;
                break;
            }
        }
        if (needsUpdate) {
            requestAnimationFrame(function(){
                ensureCopyButtons(main);
                annotateLinks(main);
            });
        }
    });
    copyObserver.observe(main, { childList: true, subtree: true });

    // Panel Logic
    document.getElementById('toggle-headings-btn-export').addEventListener('click', () => {
        headingsPanel.classList.toggle('closed');
        body.classList.toggle('headings-closed');
    });
    document.getElementById('toggle-npcs-btn-export').addEventListener('click', () => {
        npcPanel.classList.toggle('closed');
        body.classList.toggle('npcs-open');
    });

    if (npcPanelResizer) {
        npcPanelResizer.addEventListener('pointerdown', handleNpcPanelResizerPointerDown);
        npcPanelResizer.addEventListener('keydown', handleNpcPanelResizerKeydown);
    }

    

    // Populate Panels
    const headingsList = document.getElementById('headings-list-export');
    if (headings.length > 0) {
        headingsList.innerHTML = headings.map(function(h){
            return '<li style="padding-left: ' + (h.level - 1) + 'rem"><a href="#' + h.id + '">' + h.text + '</a></li>';
        }).join('');
    } else {
        headingsList.innerHTML = '<li>見出しはありません</li>';
    }
    const npcList = document.getElementById('npc-list-export');
    const npcGroupState = {};
    if (Array.isArray(npcGroups)) {
        npcGroups.forEach(group => {
            if (!group || group.id == null) return;
            npcGroupState[String(group.id)] = Boolean(group.collapsed);
        });
    }
    // Pre-compute dialogue count per NPC
    const dialogueCountByNpc = {};
    Array.from(main.querySelectorAll('.npc-dialogue')).forEach(el => {
        const id = el.dataset.npcId;
        if (!id) return;
        dialogueCountByNpc[id] = (dialogueCountByNpc[id] || 0) + 1;
    });

    function buildNpcItemHtml(npc) {
        if (!npc) return '';
        const imagesArr = Array.isArray(npc.images) ? npc.images : [];
        const img = imagesArr.find(i => (i.name || '').toLowerCase() === 'default') || imagesArr[0];
        const src = img && img.src ? img.src : '';
        const name = esc(npc.name || '');
        const fullDesc = npc.description || npc.profile || '';
        const firstLine = (String(fullDesc)
            .replace(/\r\n|\r|\n/g, '\n')
            .split('\n')
            .find(Boolean) || '');
        const shortDesc = (npc.shortDescription && npc.shortDescription.trim())
            ? npc.shortDescription.trim()
            : (firstLine.length > 80 ? firstLine.slice(0, 80) + '…' : firstLine);
        const profShort = esc(shortDesc);
        const border = npc.borderColor || '';
        const accent = border ? esc(border) : '#c7d2fe';
        const count = dialogueCountByNpc[npc.id] || 0;
        const convBadge = count ? '<span class="npc-conv">会話 ' + count + '件</span>' : '';
        return '<div class="npc-item-export" data-npc-id="' + esc(npc.id || '') + '" style="--npc-accent:' + accent + ';">'
            + '<img src="' + src + '" alt="' + name + '" referrerpolicy="no-referrer" style="border-color:' + accent + '">'
            + '<div class="npc-meta">'
            +   '<div class="npc-header"><strong class="npc-name">' + name + '</strong>'
            +   convBadge
            +   '<button class="npc-ccfol-btn button-pill button-pill-secondary button-pill-compact" type="button" title="ココフォリア用JSONをコピー">JSON</button>'
            +   '</div>'
            +   (profShort ? '<div class="npc-profile">' + profShort + '</div>' : '')
            + '</div>'
        + '</div>';
    }

    function renderNpcListExport() {
        if (!npcList) return;
        if (npcs.length === 0) {
            npcList.innerHTML = '<p>NPCはいません</p>';
            return;
        }
        const npcMap = new Map(npcs.map(npc => [String(npc.id), npc]));
        let groups = Array.isArray(npcGroups) && npcGroups.length
            ? npcGroups.map(group => {
                  const id = String(group && group.id != null ? group.id : '');
                  const order = Array.isArray(group && group.npcOrder)
                      ? group.npcOrder.map(id => String(id))
                      : [];
                  const name = group && group.name ? String(group.name) : 'NPC';
                  const collapsed = Object.prototype.hasOwnProperty.call(
                      npcGroupState,
                      id,
                  )
                      ? npcGroupState[id]
                      : Boolean(group && group.collapsed);
                  npcGroupState[id] = collapsed;
                  return { id, name, collapsed, npcOrder: order };
              })
            : [];
        if (!groups.length) {
            groups = [
                {
                    id: 'viewer-default',
                    name: 'NPC',
                    collapsed: false,
                    npcOrder: Array.from(npcMap.keys()),
                },
            ];
        }
        const assigned = new Set();
        groups.forEach((group) => {
            group.npcOrder = group.npcOrder.filter((id) => npcMap.has(id));
            group.npcOrder.forEach((id) => assigned.add(id));
        });
        const fallback = groups[0];
        if (fallback) {
            if (!Object.prototype.hasOwnProperty.call(npcGroupState, fallback.id)) {
                npcGroupState[fallback.id] = Boolean(fallback.collapsed);
            }
            npcMap.forEach((_, id) => {
                if (!assigned.has(id)) fallback.npcOrder.push(id);
            });
        }
        npcList.innerHTML = groups
            .map((group) => {
                const items = group.npcOrder
                    .map((id) => buildNpcItemHtml(npcMap.get(id)))
                    .filter(Boolean)
                    .join('');
                const bodyHtml =
                    items || '<p class="npc-group-empty-export">NPCはいません</p>';
                const safeName = esc(group.name || 'NPC');
                const collapsedClass = group.collapsed ? ' collapsed' : '';
                const count = group.npcOrder.length;
                return (
                    '<div class="npc-group-export' +
                    collapsedClass +
                    '" data-group-id="' +
                    esc(group.id || '') +
                    '">' +
                    '<div class="npc-group-header-export">' +
                    '<button type="button" class="npc-group-toggle-export" aria-expanded="' +
                    (!group.collapsed) +
                    '">' +
                    (group.collapsed ? '▶' : '▼') +
                    '</button>' +
                    '<span class="npc-group-title-export">' +
                    safeName +
                    '</span>' +
                    '<span class="npc-group-count-export">' +
                    count +
                    '</span>' +
                    '</div>' +
                    '<div class="npc-group-body-export">' +
                    bodyHtml +
                    '</div>' +
                    '</div>'
                );
            })
            .join('');
    }

    if (npcList) {
        renderNpcListExport();
        npcList.addEventListener('click', function (e) {
            const toggleBtn = e.target.closest('.npc-group-toggle-export');
            if (toggleBtn) {
                const groupEl = toggleBtn.closest('.npc-group-export');
                if (groupEl) {
                    const groupId = groupEl.getAttribute('data-group-id') || '';
                    const collapsed = groupEl.classList.toggle('collapsed');
                    toggleBtn.textContent = collapsed ? '▶' : '▼';
                    toggleBtn.setAttribute('aria-expanded', String(!collapsed));
                    if (groupId) npcGroupState[groupId] = collapsed;
                }
                return;
            }
            const jsonBtn = e.target.closest('.npc-ccfol-btn');
            if (jsonBtn) {
                const item = jsonBtn.closest('.npc-item-export');
                const id = item && item.getAttribute('data-npc-id');
                if (id) copyCcfolForNpc(id, jsonBtn);
                return;
            }
            const item = e.target.closest('.npc-item-export');
            if (!item) return;
            const id = item.getAttribute('data-npc-id');
            if (id) openNpcDetail(id);
        });
    }

    function nl2br(s){ return esc(s||'').replace(/\r\n|\r|\n/g,'<br>'); }

    function openNpcDetail(id){
        const npc = npcs.find(n=>String(n.id)===String(id));
        if(!npc) return;
        const modal = document.getElementById('npc-detail-modal');
        const box = modal.querySelector('.modal-content');
        const imagesArr = Array.isArray(npc.images) ? npc.images : [];
        const img = imagesArr.find(i => (i.name||'').toLowerCase()==='default') || imagesArr[0];
        const src = img && img.src ? img.src : '';
        const stats = npc.stats || {};
        const statusEntries = [];
        const paramEntries = [];
        const isCustomMode = npc.statusMode === "custom";
        const customStatus = isCustomMode ? npc.customStatus || null : null;

        if (customStatus) {
            if (Array.isArray(customStatus.statuses)) {
                customStatus.statuses.forEach((item) => {
                    if (!item) return;
                    const label = (item.label || "").trim();
                    const value = (item.value || "").trim();
                    const max = (item.max || "").trim();
                    if (!label) return;
                    if (!value && !max) return;
                    let display = "";
                    if (value && max) {
                        display = value + " / " + max;
                    } else if (value) {
                        display = value;
                    } else {
                        display = max;
                    }
                    statusEntries.push({
                        label,
                        value: display,
                    });
                });
            }
            if (Array.isArray(customStatus.params)) {
                customStatus.params.forEach((item) => {
                    if (!item) return;
                    const label = (item.label || "").trim();
                    const value = (item.value || "").trim();
                    if (!label) return;
                    paramEntries.push({
                        label,
                        value,
                    });
                });
            }
        }

        if (!isCustomMode || (!statusEntries.length && !paramEntries.length)) {
            const primaryKeys = ["HP", "MP", "SAN"];
            primaryKeys.forEach((key) => {
                if (!Object.prototype.hasOwnProperty.call(stats, key)) return;
                const value = stats[key];
                if (value == null || String(value).trim() === "") return;
                statusEntries.push({ label: key, value: String(value) });
            });
            Object.keys(stats)
                .filter((key) => !primaryKeys.includes(key))
                .forEach((key) => {
                    const value = stats[key];
                    if (value == null || String(value).trim() === "") return;
                    paramEntries.push({ label: key, value: String(value) });
                });
        }

        const initiativeDisplay = (() => {
            const customInit = customStatus
                ? toNum(customStatus.initiative)
                : undefined;
            const manualInit = toNum(npc.initiative);
            if (typeof customInit !== "undefined") return customInit;
            if (typeof manualInit !== "undefined") return manualInit;
            const dexVal = toNum(stats.DEX);
            if (typeof dexVal !== "undefined") return dexVal;
            return "";
        })();
        const renderEntryGrid = (entries) =>
            entries.length
                ? '<div class="stat-grid">' +
                  entries
                      .map(
                          (entry) =>
                              '<div class="stat-item"><strong>' +
                              esc(entry.label) +
                              '</strong> ' +
                              esc(entry.value) +
                              "</div>",
                      )
                      .join("") +
                  "</div>"
                : '<div style="color:#6b7280">(なし)</div>';
        const statusHtml = renderEntryGrid(statusEntries);
        const paramsHtml = renderEntryGrid(paramEntries);
        const hasInitiative =
            initiativeDisplay !== "" &&
            initiativeDisplay !== null &&
            initiativeDisplay !== undefined;
        const initiativeHtml =
            '<div class="stat-meta" style="margin-top:8px;">イニシアティブ: ' +
            (hasInitiative
                ? esc(String(initiativeDisplay))
                : '<span style="color:#6b7280">(未設定)</span>') +
            "</div>";
        const commands = npc.commands || '';
        const shortDesc = (npc.shortDescription && npc.shortDescription.trim()) ? npc.shortDescription.trim() : '';
        box.innerHTML = [
            '<div class="modal-header">',
                '<h2>' + esc(npc.name||'') + '</h2>',
                '<div>',
                    '<button class="npc-ccfol-btn button-pill button-pill-secondary button-pill-compact modal-close-json" type="button" data-npc-id="' + esc(npc.id||'') + '" title="ココフォリア用JSONをコピー">JSON</button>',
                    '<button class="modal-close" type="button" id="npc-detail-close">閉じる</button>',
                '</div>',
            '</div>',
            '<div class="detail-body">',
                (src ? '<section class="hero"><img src="' + src + '" alt="' + esc(npc.name||'') + '" referrerpolicy="no-referrer"><div><div class="section-title">簡易説明</div>' + (shortDesc ? nl2br(shortDesc) : '<span style="color:#6b7280">(未設定)</span>') + '</div></section>' : '<section><div class="section-title">簡易説明</div>' + (shortDesc ? nl2br(shortDesc) : '<span style="color:#6b7280">(未設定)</span>') + '</section>'),
                '<section>',
                    '<div class="section-title">詳細説明</div>',
                    nl2br(npc.description||''),
                '</section>',
                '<section>',
                    '<div class="section-title">ステータス</div>',
                    statusHtml,
                    initiativeHtml,
                '</section>',
                '<section>',
                    '<div class="section-title">パラメーター（その他能力値）</div>',
                    paramsHtml,
                '</section>',
                '<section>',
                    '<div class="section-title">チャットパレット</div>',
                    commands ? '<pre class="commands">' + esc(commands) + '</pre><button class="npc-cmd-copy" type="button">コピー</button>' : '<div style="color:#6b7280">(なし)</div>',
                '</section>',
            '</div>'
        ].join('');
        modal.classList.add('show');
        // bind close and copy
        box.querySelector('#npc-detail-close').addEventListener('click', closeNpcDetail);
        modal.addEventListener('click', function onbg(e){ if(e.target===modal) { modal.removeEventListener('click', onbg); closeNpcDetail(); } });
        const copyBtn = box.querySelector('.npc-cmd-copy');
        if (copyBtn) { copyBtn.addEventListener('click', ()=>{ copyText(commands, copyBtn); }); }
        const jsonBtn = box.querySelector('.modal-close-json');
        if (jsonBtn) { jsonBtn.addEventListener('click', ()=> copyCcfolForNpc(npc.id, jsonBtn)); }
    }
    function closeNpcDetail(){ document.getElementById('npc-detail-modal').classList.remove('show'); }
    function copyText(text, btn){
        const fallback=()=>{ const ta=document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); };
        if (!text) return;
        try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(()=>{ if(btn){ const o=btn.textContent; btn.textContent='Copied!'; setTimeout(()=>btn.textContent=o,1000);} }); } else { fallback(); } } catch(_) { fallback(); }
    }

    function deriveCcfolSections(npc){
        const mode = npc && npc.statusMode === 'custom' ? 'custom' : 'coc';
        const stats = npc && npc.stats ? npc.stats : {};
        const status = [];
        const params = [];
        if (mode === 'custom' && npc && npc.customStatus) {
            const cfg = npc.customStatus;
            if (Array.isArray(cfg.statuses)) {
                cfg.statuses.forEach(item => {
                    if (!item) return;
                    const label = (item.label || '').trim();
                    if (!label) return;
                    const valueNum = toNum(item.value);
                    const hasMax =
                        item.max !== undefined &&
                        item.max !== null &&
                        String(item.max).trim() !== '';
                    const maxNum = hasMax ? toNum(item.max) : undefined;
                    if (
                        typeof valueNum === 'undefined' &&
                        typeof maxNum === 'undefined'
                    ) {
                        return;
                    }
                    const resolvedValue =
                        typeof valueNum !== 'undefined'
                            ? valueNum
                            : typeof maxNum !== 'undefined'
                                ? maxNum
                                : 0;
                    const resolvedMax =
                        typeof maxNum !== 'undefined'
                            ? maxNum
                            : resolvedValue;
                    status.push({
                        label,
                        value: resolvedValue,
                        max: resolvedMax
                    });
                });
            }
            if (Array.isArray(cfg.params)) {
                cfg.params.forEach(item => {
                    if (!item) return;
                    const label = (item.label || '').trim();
                    const value = (item.value || '').trim();
                    if (!label && !value) return;
                    params.push({
                        label,
                        value
                    });
                });
            }
            if (!status.length && !params.length && Object.keys(stats).length) {
                ['HP','MP','SAN'].forEach(key => {
                    const val = toNum(stats[key]);
                    if (typeof val !== 'undefined') {
                        status.push({ label: key, value: val, max: val });
                    }
                });
                Object.keys(stats)
                    .filter(key => ['HP','MP','SAN'].indexOf(key) === -1)
                    .forEach(key => {
                        params.push({ label: key, value: String(stats[key]) });
                    });
            }
        } else {
            ['HP','MP','SAN'].forEach(key => {
                const val = toNum(stats[key]);
                if (typeof val !== 'undefined') {
                    status.push({ label: key, value: val, max: val });
                }
            });
            Object.keys(stats)
                .filter(key => ['HP','MP','SAN'].indexOf(key) === -1)
                .forEach(key => {
                    params.push({ label: key, value: String(stats[key]) });
                });
        }
        const manualInitiative = toNum(npc && npc.initiative);
        let initiative = 0;
        if (mode === 'custom' && npc && npc.customStatus) {
            const customInit = toNum(npc.customStatus.initiative);
            if (typeof customInit !== 'undefined') {
                initiative = customInit;
            } else if (typeof manualInitiative !== 'undefined') {
                initiative = manualInitiative;
            }
        } else if (typeof manualInitiative !== 'undefined') {
            initiative = manualInitiative;
        } else {
            const dexVal = toNum(stats.DEX);
            if (typeof dexVal !== 'undefined') initiative = dexVal;
        }
        return { status, params, initiative };
    }

    function composeCcfolCharacterPayload(npc){
        const sections = deriveCcfolSections(npc);
        const memo = npc && npc.shortDescription && npc.shortDescription.trim()
            ? npc.shortDescription.trim()
            : String(npc && npc.description ? npc.description : '')
                  .split(/\\r?\\n/)
                  .find(line => line && line.trim()) || '';
        return {
            kind: 'character',
            data: {
                name: npc && npc.name ? npc.name : '',
                memo,
                initiative: sections.initiative,
                externalUrl: '',
                status: sections.status,
                params: sections.params,
                color: npc && npc.borderColor ? npc.borderColor : '#888888',
                commands: npc && npc.commands ? npc.commands : ''
            }
        };
    }

    function toNum(v){
        if (v==null) return undefined; const n=parseFloat(String(v).replace(/[^0-9.+-]/g,'')); return Number.isFinite(n)?n:undefined;
    }
    function buildCcfolFromNpc(npc){
        return composeCcfolCharacterPayload(npc);
    }
    async function copyCcfolForNpc(id, btn){
        const npc = npcs.find(n=>String(n.id)===String(id));
        if(!npc) return; const payload = buildCcfolFromNpc(npc); const text = JSON.stringify(payload,null,2);
        const fallback=()=>{ const ta=document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); };
        try { if(navigator.clipboard && navigator.clipboard.writeText){ await navigator.clipboard.writeText(text); } else { fallback(); } if(btn){ const o=btn.textContent; btn.textContent='Copied!'; setTimeout(()=>btn.textContent=o,1000);} } catch(_){ fallback(); }
    }

    // View Mode Logic
    const viewModeToggle = document.getElementById('view-mode-toggle');
    const dialogueStyleToggle = document.getElementById('dialogue-style-toggle');
    const rubyToggle = document.getElementById('ruby-toggle');
    const paginationAreas = [
        {
            container: document.getElementById('pagination-controls-export'),
            pageInfo: document.getElementById('page-info-export'),
            prev: document.getElementById('prev-page-btn-export'),
            next: document.getElementById('next-page-btn-export')
        },
        {
            container: document.getElementById('pagination-controls-export-top'),
            pageInfo: document.getElementById('page-info-export-top'),
            prev: document.getElementById('prev-page-btn-export-top'),
            next: document.getElementById('next-page-btn-export-top')
        }
    ].filter(area => area.container && area.pageInfo && area.prev && area.next);
    let isPaged = false;
    let currentPage = 0;
    let pages = [];
    let elementPageIndex = new WeakMap();
    let isRubyVisible = true;

    function registerPageContent(content, pageIndex) {
        if (!content || !content.length) return;
        content.forEach(el => {
            elementPageIndex.set(el, pageIndex);
        });
    }

    function splitPages() {
        pages = [];
        elementPageIndex = new WeakMap();
        let currentPageContent = [];
        Array.from(main.children).forEach(el => {
            if (el.classList && el.classList.contains('page-break')) {
                registerPageContent(currentPageContent, pages.length);
                // flush current page, do not include the break element
                pages.push(currentPageContent);
                currentPageContent = [];
                return;
            }
            currentPageContent.push(el);
        });
        registerPageContent(currentPageContent, pages.length);
        pages.push(currentPageContent);
    }

    function setPaginationVisibility(visible) {
        paginationAreas.forEach(area => {
            if (!area.container) return;
            if (visible) {
                area.container.classList.add('is-active');
                area.container.removeAttribute('hidden');
            } else {
                area.container.classList.remove('is-active');
                area.container.setAttribute('hidden', '');
            }
        });
    }

    function updatePaginationUi(pageIndex) {
        const total = pages.length;
        const displayIndex = total > 0 ? pageIndex + 1 : 0;
        paginationAreas.forEach(area => {
            area.pageInfo.textContent = displayIndex + ' / ' + total;
            area.prev.disabled = pageIndex === 0;
            area.next.disabled = pageIndex >= total - 1;
        });
    }

    function renderPage(pageIndex) {
        const safeIndex = Math.max(0, Math.min(pageIndex, Math.max(pages.length - 1, 0)));
        Array.from(main.children).forEach(el => el.classList.add('page-hidden'));
        if (pages[safeIndex]) {
            pages[safeIndex].forEach(el => el.classList.remove('page-hidden'));
        }
        updatePaginationUi(safeIndex);
        currentPage = safeIndex;
        annotateLinks(main);
    }

    viewModeToggle.addEventListener('click', () => {
        isPaged = !isPaged;
        viewModeToggle.textContent = isPaged ? '全て表示' : 'ページ表示';
        viewModeToggle.classList.toggle('active', isPaged);
        if (isPaged) {
            splitPages();
            setPaginationVisibility(true);
            renderPage(currentPage);
            if (window.location.hash) {
                syncPageWithHash();
            }
        } else {
            setPaginationVisibility(false);
            Array.from(main.children).forEach(el => el.classList.remove('page-hidden'));
            annotateLinks(main);
        }
    });

    const goPrev = () => {
        if (currentPage > 0) {
            renderPage(currentPage - 1);
        }
    };
    const goNext = () => {
        if (currentPage < pages.length - 1) {
            renderPage(currentPage + 1);
        }
    };

    paginationAreas.forEach(area => {
        area.prev.addEventListener('click', goPrev);
        area.next.addEventListener('click', goNext);
    });
    document.addEventListener('click', handleInternalNavigation);
    window.addEventListener('hashchange', syncPageWithHash);
    if (window.location.hash) {
        syncPageWithHash();
    }

    // Dialogue Style Logic
    dialogueStyleToggle.addEventListener('click', () => {
        const isBubble = dialogueStyleToggle.textContent.includes('吹き出し');
        const newStyle = isBubble ? 'quote' : 'bubble';
        // Avoid nested template literals in generated code to keep String.raw safe
        dialogueStyleToggle.textContent = '会話: ' + (isBubble ? 'かぎかっこ' : '吹き出し');
        dialogueStyleToggle.classList.toggle('active', !isBubble);
        main.querySelectorAll('.npc-dialogue').forEach(d => d.dataset.style = newStyle);
    });

    if (rubyToggle) {
        rubyToggle.textContent = 'ルビ: ' + (isRubyVisible ? '表示' : '非表示');
        rubyToggle.classList.toggle('active', !isRubyVisible);
        rubyToggle.addEventListener('click', () => {
            isRubyVisible = !isRubyVisible;
            rubyToggle.textContent = 'ルビ: ' + (isRubyVisible ? '表示' : '非表示');
            rubyToggle.classList.toggle('active', !isRubyVisible);
            body.classList.toggle('hide-ruby', !isRubyVisible);
        });
    }

    function convertRubySpansToElements(scope){
        if (!scope || !scope.querySelectorAll) return;
        var selector = 'span[data-ruby-reading]';
        var targets = [];
        if (scope.matches && scope.matches(selector)) targets.push(scope);
        scope.querySelectorAll(selector).forEach(function(span){
            targets.push(span);
        });
        targets.forEach(function(span){
            if (!span.parentNode) return;
            var ruby = document.createElement('ruby');
            while (span.firstChild) ruby.appendChild(span.firstChild);
            var reading = span.getAttribute('data-ruby-reading') || '';
            if (reading) {
                var rt = document.createElement('rt');
                rt.textContent = reading;
                ruby.appendChild(rt);
            }
            span.replaceWith(ruby);
        });
    }
    convertRubySpansToElements(main);

    function flattenRubyForPlainText(root, options = {}){
        const { includeReading = true } = options;
        if (!root) return;
        convertRubySpansToElements(root);
        root.querySelectorAll('ruby').forEach(ruby => {
            if (!ruby.parentNode) return;
            const baseClone = ruby.cloneNode(true);
            baseClone.querySelectorAll('rt, rp').forEach(node => node.remove());
            const baseText = baseClone.textContent || '';
            const readings = Array.from(ruby.querySelectorAll('rt'))
                .map(rt => (rt.textContent || '').trim())
                .filter(Boolean);
            const readingJoined = readings.join('・');
            let replacementText = baseText;
            if (readingJoined && includeReading) {
                replacementText = (baseText || '') + '（' + readingJoined + '）';
                if (!baseText) replacementText = readingJoined;
            }
            ruby.parentNode.replaceChild(document.createTextNode(replacementText), ruby);
        });
    }

    function extractPlainTextForCopy(root){
        if (!root) return '';
        const blockTags = new Set([
            'P',
            'DIV',
            'SECTION',
            'ARTICLE',
            'HEADER',
            'FOOTER',
            'MAIN',
            'ASIDE',
            'FIGURE',
            'BLOCKQUOTE',
            'UL',
            'OL',
            'LI',
            'PRE',
            'TABLE',
            'THEAD',
            'TBODY',
            'TFOOT',
            'TR',
            'TH',
            'TD',
            'HR',
            'H1',
            'H2',
            'H3',
            'H4',
            'H5',
            'H6'
        ]);
        let result = '';
        const endsWithNewline = () => result.endsWith('\n');
        const appendText = (text) => {
            if (!text) return;
            result += text;
        };
        const appendLineBreak = () => {
            if (!result) {
                result = '\n';
                return;
            }
            if (!endsWithNewline()) {
                result += '\n';
            }
        };
        const walk = (node) => {
            if (!node) return;
            if (node.nodeType === Node.TEXT_NODE) {
                let text = node.nodeValue;
                if (!text) return;
                text = text.replace(/\r/g, '');
                text = text.replace(/\n[ \t]+/g, '\n');
                if (!result) {
                    text = text.replace(/^\n+/, '');
                }
                appendText(text);
                return;
            }
            if (node.nodeType !== Node.ELEMENT_NODE) return;
            const tag = node.tagName;
            if (tag === 'BR') {
                appendLineBreak();
                return;
            }
            if (tag === 'PRE') {
                appendLineBreak();
                appendText((node.textContent || '').replace(/\r/g, ''));
                appendLineBreak();
                return;
            }
            const isBlock = blockTags.has(tag);
            if (isBlock && result && !endsWithNewline()) {
                appendLineBreak();
            }
            for (let child = node.firstChild; child; child = child.nextSibling) {
                walk(child);
            }
            if (isBlock) {
                appendLineBreak();
            }
        };
        walk(root);
        let cleaned = result.replace(/\r/g, '');
        cleaned = cleaned.replace(/^\n+/, '');
        cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
        cleaned = cleaned.replace(/[ \t]+\n/g, '\n');
        return cleaned.replace(/\n+$/, '');
    }

    // Copy (HTML + text, with fallbacks)
    main.addEventListener('click', e => {
        if (!e.target.classList.contains('copy-btn-export')) return;
        const parent = e.target.parentElement;
        const cloneForHtml = parent.cloneNode(true);
        cloneForHtml.querySelectorAll('.copy-btn-export').forEach(b => b.remove());
        convertRubySpansToElements(cloneForHtml);
        let htmlToCopy = '';
        if (parent.classList.contains('npc-dialogue')) {
            htmlToCopy = cloneForHtml.outerHTML;
        } else {
            htmlToCopy = cloneForHtml.innerHTML || cloneForHtml.outerHTML;
        }
        const cloneForText = cloneForHtml.cloneNode(true);
        const includeRubyReading = !body.classList.contains('hide-ruby');
        flattenRubyForPlainText(cloneForText, { includeReading: includeRubyReading });
        let textToCopy = '';
        if (parent.classList.contains('npc-dialogue')) {
            const textEl = cloneForText.querySelector('.npc-text');
            const content = textEl
                ? extractPlainTextForCopy(textEl)
                : extractPlainTextForCopy(cloneForText);
            // Avoid nested template literals inside generated JS
            textToCopy = '「' + content + '」';
        } else {
            textToCopy = extractPlainTextForCopy(cloneForText);
        }
        if (navigator.clipboard && window.ClipboardItem) {
            const items = [new ClipboardItem({'text/plain': new Blob([textToCopy], {type:'text/plain'}), 'text/html': new Blob([htmlToCopy], {type:'text/html'})})];
            navigator.clipboard.write(items).then(()=>{
                e.target.textContent='Copied!';
                setTimeout(()=>{
                    e.target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zM-1 1.5A1.5 1.5 0 0 1 .5 0h3A1.5 1.5 0 0 1 5 1.5v1A1.5 1.5 0 0 1 3.5 4h-3A1.5 1.5 0 0 1-1 2.5v-1z"/></svg>';
                },1000);
            }).catch(()=>fallbackCopy());
        } else { fallbackCopy(); }
        function fallbackCopy(){
            const container=document.createElement('div');
            container.style.position='fixed';
            container.style.left='-9999px';
            container.innerHTML=htmlToCopy;
            document.body.appendChild(container);
            const range=document.createRange();
            range.selectNodeContents(container);
            const sel=window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            document.execCommand('copy');
            sel.removeAllRanges();
            document.body.removeChild(container);
            e.target.textContent='Copied!';
            setTimeout(()=>{
                e.target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zM-1 1.5A1.5 1.5 0 0 1 .5 0h3A1.5 1.5 0 0 1 5 1.5v1A1.5 1.5 0 0 1 3.5 4h-3A1.5 1.5 0 0 1-1 2.5v-1z"/></svg>';
            },1000);
        }
    });
});
        