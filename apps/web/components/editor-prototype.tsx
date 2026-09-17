"use client";

import { PointerEvent, useMemo, useState } from "react";

type Step = "source" | "editor" | "brief" | "variants";

type FurnitureItem = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
};

const STEPS: Array<{ id: Step; number: string; label: string }> = [
  { id: "source", number: "01", label: "Источник" },
  { id: "editor", number: "02", label: "План" },
  { id: "brief", number: "03", label: "Бриф" },
  { id: "variants", number: "04", label: "Варианты" },
];

const INITIAL_ITEMS: FurnitureItem[] = [
  {
    id: "sofa",
    label: "Диван",
    x: 130,
    y: 126,
    width: 154,
    height: 64,
    color: "#d19d75",
  },
  {
    id: "table",
    label: "Стол",
    x: 372,
    y: 132,
    width: 82,
    height: 82,
    color: "#718f84",
  },
  {
    id: "storage",
    label: "Хранение",
    x: 486,
    y: 292,
    width: 62,
    height: 132,
    color: "#a4a0b7",
  },
];

export function EditorPrototype() {
  const [step, setStep] = useState<Step>("editor");
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [selectedId, setSelectedId] = useState("sofa");
  const [saved, setSaved] = useState(true);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(
    null,
  );

  const selected = useMemo(
    () => items.find((item) => item.id === selectedId) ?? items[0],
    [items, selectedId],
  );

  const moveSelected = (
    field: "x" | "y" | "width" | "height",
    value: number,
  ) => {
    setSaved(false);
    setItems((current) =>
      current.map((item) =>
        item.id === selectedId ? { ...item, [field]: value } : item,
      ),
    );
  };

  const beginDrag = (
    event: PointerEvent<SVGRectElement>,
    item: FurnitureItem,
  ) => {
    const bounds = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
    if (!bounds) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelectedId(item.id);
    setDragOffset({
      x: ((event.clientX - bounds.left) * 680) / bounds.width - item.x,
      y: ((event.clientY - bounds.top) * 500) / bounds.height - item.y,
    });
  };

  const drag = (event: PointerEvent<SVGRectElement>) => {
    if (!dragOffset) return;
    const bounds = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
    if (!bounds) return;
    const x = Math.max(
      70,
      Math.min(
        568 - selected.width,
        ((event.clientX - bounds.left) * 680) / bounds.width - dragOffset.x,
      ),
    );
    const y = Math.max(
      70,
      Math.min(
        438 - selected.height,
        ((event.clientY - bounds.top) * 500) / bounds.height - dragOffset.y,
      ),
    );
    setSaved(false);
    setItems((current) =>
      current.map((item) =>
        item.id === selectedId
          ? { ...item, x: Math.round(x), y: Math.round(y) }
          : item,
      ),
    );
  };

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="AI Home Modeler">
          <span className="brand-mark">A</span>
          <span>AI Home Modeler</span>
        </a>
        <div className="project-title">
          <span className="eyebrow">Проект</span>
          <strong>Квартира на Лесной</strong>
        </div>
        <div className="topbar-actions">
          <span className={saved ? "save-state saved" : "save-state"}>
            <i /> {saved ? "Все изменения сохранены" : "Есть изменения"}
          </span>
          <button className="button ghost" type="button">
            Поделиться
          </button>
          <button className="avatar" type="button" aria-label="Профиль">
            AK
          </button>
        </div>
      </header>

      <nav className="steps" aria-label="Этапы проекта">
        {STEPS.map((item) => (
          <button
            className={item.id === step ? "step active" : "step"}
            key={item.id}
            onClick={() => setStep(item.id)}
            type="button"
          >
            <span>{item.number}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {step === "editor" ? (
        <section className="workspace" id="top">
          <aside className="tool-rail" aria-label="Инструменты плана">
            <button className="tool active" type="button" aria-label="Выбор">
              ↖
            </button>
            <button className="tool" type="button" aria-label="Стена">
              ╱
            </button>
            <button className="tool" type="button" aria-label="Проём">
              ▯
            </button>
            <button className="tool" type="button" aria-label="Мебель">
              ▰
            </button>
            <span className="tool-separator" />
            <button className="tool" type="button" aria-label="Отменить">
              ↶
            </button>
            <button className="tool" type="button" aria-label="Повторить">
              ↷
            </button>
          </aside>

          <section className="canvas-panel" aria-label="Редактор плана">
            <div className="canvas-heading">
              <div>
                <span className="eyebrow">Редактирование плана</span>
                <h1>Гостиная · 28,4 м²</h1>
              </div>
              <div className="canvas-controls">
                <button type="button">−</button>
                <span>82%</span>
                <button type="button">＋</button>
              </div>
            </div>

            <div className="canvas-wrap">
              <svg
                className="floor-plan"
                viewBox="0 0 680 500"
                role="img"
                aria-label="Интерактивный план гостиной"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke="#dfe2dc"
                      strokeWidth="0.7"
                    />
                  </pattern>
                  <filter
                    id="shadow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="3"
                      stdDeviation="4"
                      floodOpacity="0.16"
                    />
                  </filter>
                </defs>
                <rect width="680" height="500" fill="url(#grid)" />
                <path className="wall" d="M70 70 H568 V438 H70 V70" />
                <path className="window" d="M238 70 H390" />
                <path className="door-gap" d="M70 326 V392" />
                <path className="door" d="M70 392 A66 66 0 0 1 136 326" />
                <text className="dimension" x="278" y="54">
                  6,40 м
                </text>
                <text className="dimension vertical" x="49" y="278">
                  4,80 м
                </text>
                <text className="zone-label" x="84" y="100">
                  ГОСТИНАЯ
                </text>
                {items.map((item) => (
                  <g
                    key={item.id}
                    filter={item.id === selectedId ? "url(#shadow)" : undefined}
                  >
                    <rect
                      className={
                        item.id === selectedId
                          ? "furniture selected"
                          : "furniture"
                      }
                      fill={item.color}
                      height={item.height}
                      onPointerDown={(event) => beginDrag(event, item)}
                      onPointerMove={drag}
                      onPointerUp={() => setDragOffset(null)}
                      rx="8"
                      width={item.width}
                      x={item.x}
                      y={item.y}
                    />
                    <text
                      className="furniture-label"
                      x={item.x + item.width / 2}
                      y={item.y + item.height / 2 + 4}
                    >
                      {item.label}
                    </text>
                  </g>
                ))}
                <circle className="warning-dot" cx="548" cy="304" r="11" />
                <text className="warning-mark" x="548" y="308">
                  !
                </text>
              </svg>
              <div className="prototype-note">
                Прототип · данные не отправляются
              </div>
            </div>
          </section>

          <aside className="properties">
            <div className="properties-head">
              <span className="eyebrow">Выбранный объект</span>
              <h2>{selected.label}</h2>
              <span className="object-id">
                {selected.id.toUpperCase()} · типовой объект
              </span>
            </div>
            <div className="form-section">
              <h3>Положение</h3>
              <div className="field-grid">
                <label>
                  X, см
                  <input
                    type="number"
                    value={Math.round(selected.x / 0.8)}
                    onChange={(event) =>
                      moveSelected("x", Number(event.target.value) * 0.8)
                    }
                  />
                </label>
                <label>
                  Y, см
                  <input
                    type="number"
                    value={Math.round(selected.y / 0.8)}
                    onChange={(event) =>
                      moveSelected("y", Number(event.target.value) * 0.8)
                    }
                  />
                </label>
              </div>
            </div>
            <div className="form-section">
              <h3>Габариты</h3>
              <div className="field-grid">
                <label>
                  Ширина, см
                  <input
                    type="number"
                    value={Math.round(selected.width / 0.8)}
                    onChange={(event) =>
                      moveSelected("width", Number(event.target.value) * 0.8)
                    }
                  />
                </label>
                <label>
                  Глубина, см
                  <input
                    type="number"
                    value={Math.round(selected.height / 0.8)}
                    onChange={(event) =>
                      moveSelected("height", Number(event.target.value) * 0.8)
                    }
                  />
                </label>
              </div>
            </div>
            <div className="notice">
              <span>!</span>
              <div>
                <strong>Проверьте проход</strong>
                <p>До шкафа осталось 54 см. Рекомендуем не менее 70 см.</p>
              </div>
            </div>
            <div className="selection-list">
              <h3>Объекты в комнате</h3>
              {items.map((item) => (
                <button
                  className={
                    item.id === selectedId ? "selection active" : "selection"
                  }
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  type="button"
                >
                  <i style={{ background: item.color }} /> {item.label}
                  <span>›</span>
                </button>
              ))}
            </div>
            <button
              className="button primary"
              onClick={() => setSaved(true)}
              type="button"
            >
              Сохранить версию
            </button>
            <p className="version-copy">
              Версия 3 · изменения останутся редактируемыми
            </p>
          </aside>
        </section>
      ) : (
        <JourneyPanel step={step} onStepChange={setStep} />
      )}
    </main>
  );
}

function JourneyPanel({
  step,
  onStepChange,
}: {
  step: Exclude<Step, "editor">;
  onStepChange: (step: Step) => void;
}) {
  if (step === "source") {
    return (
      <section className="journey" id="top">
        <div className="journey-heading">
          <span className="eyebrow">Шаг 1 из 4</span>
          <h1>С чего начнём?</h1>
          <p>
            Добавьте существующий план или создайте простую комнату вручную.
          </p>
        </div>
        <div className="source-options">
          <article className="source-card featured">
            <span className="source-icon">⌁</span>
            <div>
              <span className="tag">Рекомендуем</span>
              <h2>Загрузить план</h2>
              <p>
                PNG, JPEG или PDF до 20 МБ. После распознавания вы проверите
                каждый размер.
              </p>
            </div>
            <button
              className="button primary"
              onClick={() => onStepChange("editor")}
              type="button"
            >
              Выбрать пример плана
            </button>
          </article>
          <article className="source-card">
            <span className="source-icon">□</span>
            <div>
              <h2>Создать вручную</h2>
              <p>
                Подойдёт, если у вас есть длина и ширина комнаты, но нет файла
                плана.
              </p>
            </div>
            <button
              className="button"
              onClick={() => onStepChange("editor")}
              type="button"
            >
              Создать комнату
            </button>
          </article>
        </div>
        <div className="privacy-line">
          <strong>Ваш план — чувствительные данные.</strong>
          <span>
            В прототипе файлы не загружаются и не отправляются внешним
            AI-сервисам.
          </span>
        </div>
      </section>
    );
  }

  if (step === "brief") {
    return (
      <section className="journey brief" id="top">
        <div className="journey-heading">
          <span className="eyebrow">Шаг 3 из 4</span>
          <h1>Расскажите, как вы живёте</h1>
          <p>
            Ответы станут проверяемыми ограничениями, а не только текстом для
            AI.
          </p>
        </div>
        <div className="brief-grid">
          <fieldset className="brief-card">
            <legend>Кто будет жить в квартире?</legend>
            <div className="choice-row">
              <button className="choice active" type="button">
                Двое взрослых
              </button>
              <button className="choice" type="button">
                Есть дети
              </button>
              <button className="choice" type="button">
                Есть питомцы
              </button>
            </div>
          </fieldset>
          <fieldset className="brief-card">
            <legend>Что важнее всего?</legend>
            <div className="choice-row">
              <button className="choice active" type="button">
                Больше хранения
              </button>
              <button className="choice active" type="button">
                Рабочее место
              </button>
              <button className="choice" type="button">
                Принимать гостей
              </button>
            </div>
          </fieldset>
          <fieldset className="brief-card">
            <legend>Ориентир бюджета</legend>
            <div className="budget-row">
              <label>
                От, ₽<input defaultValue="800 000" inputMode="numeric" />
              </label>
              <label>
                До, ₽<input defaultValue="1 400 000" inputMode="numeric" />
              </label>
            </div>
            <p>
              Цены будут отмечены как ориентировочные до подтверждения
              поставщиком.
            </p>
          </fieldset>
          <fieldset className="brief-card">
            <legend>Неизменяемые условия</legend>
            <label className="check">
              <input defaultChecked type="checkbox" /> Не переносить мокрые зоны
            </label>
            <label className="check">
              <input defaultChecked type="checkbox" /> Сохранить существующие
              окна
            </label>
            <label className="check">
              <input type="checkbox" /> Нужен безбарьерный проход
            </label>
          </fieldset>
        </div>
        <div className="journey-actions">
          <button
            className="button"
            onClick={() => onStepChange("editor")}
            type="button"
          >
            Вернуться к плану
          </button>
          <button
            className="button primary compact"
            onClick={() => onStepChange("variants")}
            type="button"
          >
            Показать варианты
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="journey variants" id="top">
      <div className="journey-heading split-heading">
        <div>
          <span className="eyebrow">Шаг 4 из 4</span>
          <h1>Сравните варианты</h1>
          <p>
            Все варианты прошли проверку схемы; предупреждения требуют вашего
            решения.
          </p>
        </div>
        <span className="generation-state">
          <i /> 3 варианта готовы
        </span>
      </div>
      <div className="variant-grid">
        {[
          {
            id: "A",
            title: "Больше воздуха",
            score: "91%",
            cost: "1,18 млн ₽",
            warning: "1 предупреждение",
            color: "warm",
          },
          {
            id: "B",
            title: "Больше хранения",
            score: "88%",
            cost: "1,31 млн ₽",
            warning: "Без коллизий",
            color: "green",
          },
          {
            id: "C",
            title: "Рабочая зона",
            score: "84%",
            cost: "1,09 млн ₽",
            warning: "2 предупреждения",
            color: "violet",
          },
        ].map((variant, index) => (
          <article
            className={index === 0 ? "variant-card selected" : "variant-card"}
            key={variant.id}
          >
            <div className={`mini-plan ${variant.color}`}>
              <span className="mini-room room-one" />
              <span className="mini-room room-two" />
              <span className="mini-room room-three" />
              <strong>{variant.id}</strong>
            </div>
            <div className="variant-copy">
              <span className="eyebrow">Вариант {variant.id}</span>
              <h2>{variant.title}</h2>
              <dl>
                <div>
                  <dt>Бриф</dt>
                  <dd>{variant.score}</dd>
                </div>
                <div>
                  <dt>Смета</dt>
                  <dd>{variant.cost}</dd>
                </div>
                <div>
                  <dt>Проверка</dt>
                  <dd>{variant.warning}</dd>
                </div>
              </dl>
              <button
                className={index === 0 ? "button primary" : "button"}
                onClick={() => onStepChange("editor")}
                type="button"
              >
                {index === 0 ? "Открыть в редакторе" : "Выбрать вариант"}
              </button>
            </div>
          </article>
        ))}
      </div>
      <p className="ai-disclaimer">
        AI-варианты являются эскизами. Изменения конструкций и регулируемых зон
        должен проверить специалист.
      </p>
    </section>
  );
}
