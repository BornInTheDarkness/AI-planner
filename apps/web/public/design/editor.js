window.AIHomeEditor = (root) => {
  const controller = new AbortController();
  const getById = (id) => root.querySelector("#" + id);
  const key = "ai-home-modeler-design-v1",
    briefKey = "ai-home-modeler-design-brief-v1",
    names = { sofa: "Диван", table: "Стол", storage: "Шкаф", chair: "Кресло" },
    colors = {
      sofa: "#cbbba5",
      table: "#af8d68",
      storage: "#9d8068",
      chair: "#b67962",
    },
    sizes = {
      sofa: [176, 72],
      table: [88, 56],
      storage: [96, 48],
      chair: [60, 60],
    };
  const variants = {
    a: [
      { id: "sofa-1", type: "sofa", x: 126, y: 168, w: 176, h: 72 },
      { id: "table-1", type: "table", x: 392, y: 160, w: 88, h: 56 },
      { id: "storage-1", type: "storage", x: 520, y: 272, w: 96, h: 48 },
    ],
    b: [
      { id: "sofa-1", type: "sofa", x: 180, y: 280, w: 176, h: 72 },
      { id: "table-1", type: "table", x: 365, y: 218, w: 88, h: 56 },
      { id: "storage-1", type: "storage", x: 520, y: 272, w: 96, h: 48 },
    ],
  };
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(key) || "null");
  } catch {}
  let items = Array.isArray(saved?.items)
      ? saved.items
      : structuredClone(variants.a),
    selected = items[0]?.id || null,
    version = saved?.version || 1,
    variant = saved?.variant || "a",
    dirty = false,
    history = [],
    future = [],
    drag = null;
  const $ = (id) => getById(id),
    svg = $("plan-svg"),
    layer = $("furniture-layer");
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  function current() {
    return items.find((i) => i.id === selected);
  }
  function saveState() {
    try {
      localStorage.setItem(key, JSON.stringify({ items, version, variant }));
    } catch {
      $("save-state").textContent = "Не удалось сохранить. Экспортируйте JSON.";
      return;
    }
    dirty = false;
    updateSave();
  }
  function updateSave() {
    const el = $("save-state");
    el.textContent = dirty
      ? "Есть несохранённые изменения"
      : "Изменения сохранены";
    el.classList.toggle("is-saved", !dirty);
  }
  function change() {
    dirty = true;
    updateSave();
    render();
  }
  function record() {
    history.push(JSON.stringify(items));
    if (history.length > 30) history.shift();
    future = [];
    updateUndo();
  }
  function updateUndo() {
    $("undo").disabled = !history.length;
    $("redo").disabled = !future.length;
  }
  function warning() {
    const p = current();
    const el = $("warning");
    if (!p) {
      el.classList.add("is-clear");
      el.querySelector("strong").textContent = "Объект не выбран";
      el.querySelector("p").textContent =
        "Выберите мебель на плане или добавьте объект из каталога.";
      return;
    }
    const nearDoor = p.x < 162 && p.y + p.h > 315;
    const collisions = items.some(
      (q) =>
        q.id !== p.id &&
        p.x < q.x + q.w &&
        p.x + p.w > q.x &&
        p.y < q.y + q.h &&
        p.y + p.h > q.y,
    );
    el.classList.toggle("is-clear", !nearDoor && !collisions);
    $("warning-dot").style.display = nearDoor || collisions ? "" : "none";
    $("warning-mark").style.display = nearDoor || collisions ? "" : "none";
    el.querySelector("strong").textContent = collisions
      ? "Пересечение объектов"
      : nearDoor
        ? "Проверьте проход"
        : "Пересечений не найдено";
    el.querySelector("p").textContent = collisions
      ? "Объекты мебели перекрывают друг друга. Сдвиньте выбранный предмет."
      : nearDoor
        ? "Мебель находится близко к дверному проёму. Сверьте фактическую ширину прохода."
        : "Положение мебели в этой демонстрационной модели не создаёт явных пересечений.";
  }
  function render() {
    layer.replaceChildren();
    for (const item of items) {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.classList.add("piece");
      if (item.id === selected) g.classList.add("selected");
      g.dataset.id = item.id;
      g.setAttribute("tabindex", "0");
      g.setAttribute("role", "button");
      g.setAttribute(
        "aria-label",
        `${names[item.type]}, положение ${Math.round((item.x - 81) / 0.8)} на ${Math.round((item.y - 79) / 0.8)} см, размеры ${Math.round(item.w / 0.8)} на ${Math.round(item.h / 0.8)} см`,
      );
      const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      r.setAttribute("x", item.x);
      r.setAttribute("y", item.y);
      r.setAttribute("width", item.w);
      r.setAttribute("height", item.h);
      r.setAttribute("rx", "3");
      r.setAttribute("fill", colors[item.type]);
      const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
      t.setAttribute("x", item.x + item.w / 2);
      t.setAttribute("y", item.y + item.h / 2);
      t.textContent = names[item.type];
      g.append(r, t);
      layer.append(g);
    }
    const p = current();
    $("item-title").textContent = p ? names[p.type] : "Ничего не выбрано";
    $("item-meta").textContent = p
      ? `${p.type.toUpperCase()} / ТИПОВОЙ ОБЪЕКТ`
      : "ВЫБЕРИТЕ МЕБЕЛЬ";
    for (const [f, val] of [
      ["x", p ? Math.round((p.x - 81) / 0.8) : ""],
      ["y", p ? Math.round((p.y - 79) / 0.8) : ""],
      ["w", p ? Math.round(p.w / 0.8) : ""],
      ["h", p ? Math.round(p.h / 0.8) : ""],
    ]) {
      $("field-" + f).value = val;
      $("field-" + f).disabled = !p;
    }
    $("remove").disabled = !p;
    $("version").textContent = version;
    warning();
    updateUndo();
  }
  function select(id) {
    selected = id;
    render();
  }
  function coords(e) {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }
  layer.addEventListener("pointerdown", (e) => {
    const g = e.target.closest(".piece");
    if (!g) return;
    const item = items.find((i) => i.id === g.dataset.id);
    if (!item) return;
    select(item.id);
    record();
    const p = coords(e);
    drag = { id: item.id, dx: p.x - item.x, dy: p.y - item.y };
    svg.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  svg.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const p = coords(e),
      item = items.find((i) => i.id === drag.id);
    if (!item) return;
    item.x = Math.round(clamp(p.x - drag.dx, 85, 675 - item.w) / 4) * 4;
    item.y = Math.round(clamp(p.y - drag.dy, 83, 439 - item.h) / 4) * 4;
    change();
  });
  svg.addEventListener("pointerup", () => (drag = null));
  svg.addEventListener("pointercancel", () => (drag = null));
  layer.addEventListener("click", (e) => {
    const g = e.target.closest(".piece");
    if (g) select(g.dataset.id);
  });
  layer.addEventListener("keydown", (e) => {
    const g = e.target.closest(".piece");
    if (!g) return;
    select(g.dataset.id);
    const item = current(),
      delta = e.shiftKey ? 40 : 4;
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      record();
      if (e.key === "ArrowLeft")
        item.x = clamp(item.x - delta, 85, 675 - item.w);
      if (e.key === "ArrowRight")
        item.x = clamp(item.x + delta, 85, 675 - item.w);
      if (e.key === "ArrowUp") item.y = clamp(item.y - delta, 83, 439 - item.h);
      if (e.key === "ArrowDown")
        item.y = clamp(item.y + delta, 83, 439 - item.h);
      change();
      layer.querySelector(`[data-id="${item.id}"]`)?.focus();
    }
    if (e.key === "Delete") {
      e.preventDefault();
      remove();
    }
  });
  for (const f of ["x", "y", "w", "h"])
    $("field-" + f).addEventListener("change", (e) => {
      const item = current(),
        n = Number(e.target.value);
      if (!item || !Number.isFinite(n)) return;
      record();
      if (f === "x") item.x = clamp(81 + n * 0.8, 85, 675 - item.w);
      if (f === "y") item.y = clamp(79 + n * 0.8, 83, 439 - item.h);
      if (f === "w") item.w = clamp(n * 0.8, 20, 675 - item.x);
      if (f === "h") item.h = clamp(n * 0.8, 20, 439 - item.y);
      change();
    });
  $("catalog").addEventListener("click", (e) => {
    const b = e.target.closest("[data-add]");
    if (!b) return;
    record();
    const type = b.dataset.add,
      [w, h] = sizes[type],
      id = `${type}-${Date.now()}`;
    items.push({ id, type, x: 290, y: 230, w, h });
    selected = id;
    change();
    layer.querySelector(`[data-id="${id}"]`)?.focus();
  });
  function remove() {
    if (!selected) return;
    record();
    items = items.filter((i) => i.id !== selected);
    selected = items[0]?.id || null;
    change();
  }
  $("remove").addEventListener("click", remove);
  $("save").addEventListener("click", () => {
    version++;
    saveState();
    render();
  });
  $("undo").addEventListener("click", () => {
    if (!history.length) return;
    future.push(JSON.stringify(items));
    items = JSON.parse(history.pop());
    selected = items[0]?.id || null;
    change();
  });
  $("redo").addEventListener("click", () => {
    if (!future.length) return;
    history.push(JSON.stringify(items));
    items = JSON.parse(future.pop());
    selected = items[0]?.id || null;
    change();
  });
  $("export").addEventListener("click", () => {
    const payload = {
      format: "AI Home Modeler design prototype",
      version,
      units: "cm",
      source: "демонстрационная геометрия",
      room: { name: "Гостиная", width: 640, height: 480 },
      furniture: items.map(({ id, type, x, y, w, h }) => ({
        id,
        type,
        x: Math.round((x - 81) / 0.8),
        y: Math.round((y - 79) / 0.8),
        width: Math.round(w / 0.8),
        depth: Math.round(h / 0.8),
      })),
      warning:
        "Ориентировочный эскиз; регулируемые изменения проверяет специалист.",
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ai-home-modeler-plan.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });
  $("variant-export").addEventListener("click", () => $("export").click());
  function go(step) {
    if (!["source", "plan", "brief", "variants"].includes(step)) step = "plan";
    root.querySelectorAll(".step").forEach((b) => {
      const on = b.dataset.step === step;
      b.classList.toggle("active", on);
      b.setAttribute("aria-current", on ? "step" : "false");
    });
    root
      .querySelectorAll(".panel")
      .forEach((p) => p.classList.toggle("active", p.id === step));
    window.history.replaceState(null, "", `?step=${step}`);
    scrollTo({ top: 0, behavior: "instant" });
  }
  root.querySelector(".stepbar").addEventListener("click", (e) => {
    const b = e.target.closest("[data-step]");
    if (b) go(b.dataset.step);
  });
  root
    .querySelectorAll("[data-go]")
    .forEach((b) => b.addEventListener("click", () => go(b.dataset.go)));
  $("manual-start").addEventListener("click", () => go("plan"));
  $("source-file").addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ok =
      ["image/png", "image/jpeg", "application/pdf"].includes(file.type) &&
      file.size <= 20 * 1024 * 1024;
    if (!ok) {
      $("file-status").textContent =
        "Поддерживаются PNG, JPEG или PDF до 20 МБ. Выберите другой файл.";
      return;
    }
    $("file-status").innerHTML =
      "<strong>Файл выбран:</strong> " +
      file.name.replace(/[<>]/g, "") +
      ". В прототипе файл не загружается; продолжите на демонстрационном плане.";
    go("plan");
  });
  function persistBrief() {
    const groups = {};
    root
      .querySelectorAll(".choices")
      .forEach(
        (g) =>
          (groups[g.dataset.group] =
            g.querySelector(".choice.active")?.textContent || ""),
      );
    localStorage.setItem(
      briefKey,
      JSON.stringify({
        groups,
        budgetMin: $("budget-min").value,
        budgetMax: $("budget-max").value,
        checks: [...root.querySelectorAll(".check input")].map(
          (c) => c.checked,
        ),
      }),
    );
  }
  root.querySelectorAll(".choices").forEach((group) =>
    group.addEventListener("click", (e) => {
      const b = e.target.closest(".choice");
      if (!b) return;
      group.querySelectorAll(".choice").forEach((c) => {
        c.classList.toggle("active", c === b);
        c.setAttribute("aria-pressed", c === b ? "true" : "false");
      });
      persistBrief();
    }),
  );
  [
    $("budget-min"),
    $("budget-max"),
    ...root.querySelectorAll(".check input"),
  ].forEach((el) => el.addEventListener("change", persistBrief));
  try {
    const previous = JSON.parse(localStorage.getItem(briefKey) || "null");
    if (previous) {
      root.querySelectorAll(".choices").forEach((g) =>
        g.querySelectorAll(".choice").forEach((c) => {
          const on = c.textContent === previous.groups?.[g.dataset.group];
          c.classList.toggle("active", on);
          c.setAttribute("aria-pressed", on ? "true" : "false");
        }),
      );
      $("budget-min").value = previous.budgetMin || "";
      $("budget-max").value = previous.budgetMax || "";
      root
        .querySelectorAll(".check input")
        .forEach((c, i) => (c.checked = previous.checks?.[i] ?? c.checked));
    }
  } catch {}
  root.querySelectorAll(".variant-card button").forEach((b) =>
    b.addEventListener("click", () => {
      const card = b.closest(".variant-card");
      variant = card.dataset.variant;
      root
        .querySelectorAll(".variant-card")
        .forEach((c) => c.classList.toggle("selected", c === card));
      record();
      items = structuredClone(variants[variant]);
      selected = items[0].id;
      change();
      go("plan");
    }),
  );
  render();
  updateSave();
  go(new URLSearchParams(location.search).get("step") || "plan");
  return () => controller.abort();
};
