window.AIHomeJourney = (root) => {
  const controller = new AbortController();
  const getById = (id) => root.querySelector("#" + id);
  const cleanup = () => {
    controller.abort();
    cancelAnimationFrame(frame);
    if (scene) {
      const geometries = new Set(),
        materials = new Set(),
        textures = new Set();
      scene.traverse((object) => {
        if (object.geometry) geometries.add(object.geometry);
        for (const m of Array.isArray(object.material)
          ? object.material
          : [object.material]) {
          if (!m) continue;
          materials.add(m);
          for (const value of Object.values(m))
            if (value?.isTexture) textures.add(value);
        }
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
    }
    renderer?.dispose();
    root.classList.remove("no-webgl");
  };

  const content = [
    {
      n: "01",
      name: "Прихожая",
      kicker: "Пространство для вашей жизни",
      title: "Дом начинается с вашего <i>плана</i>",
      desc: "От исходного чертежа до интерьера, который можно проверить, изменить и передать специалисту.",
      meta: "Прихожая · площадь уточняется",
      mat: "Дуб / известняк",
    },
    {
      n: "02",
      name: "Гостиная",
      kicker: "План, которому можно доверять",
      title: "Видеть больше, чем <i>картинку</i>",
      desc: "Сравнивайте варианты планировки: проходы, расстановку и компромиссы видно прямо в пространстве.",
      meta: "Гостиная · площадь уточняется",
      mat: "Дуб / букле",
    },
    {
      n: "03",
      name: "Кухня",
      kicker: "Реальные габариты",
      title: "Красота точно <i>по размеру</i>",
      desc: "Мебель и материалы связаны с размерами объектов. У каждого решения есть место на плане.",
      meta: "Кухня · площадь уточняется",
      mat: "Камень / тёплый дуб",
    },
    {
      n: "04",
      name: "Спальня",
      kicker: "Одна версия проекта",
      title: "Спокойствие в каждой <i>детали</i>",
      desc: "План, бриф и выбранный вариант остаются в одной актуальной редактируемой версии.",
      meta: "Спальня · площадь уточняется",
      mat: "Лён / орех",
    },
    {
      n: "05",
      name: "Ванная",
      kicker: "Идея становится проектом",
      title: "Готово к <i>разговору</i>",
      desc: "Соберите ориентировочную смету и экспорт для специалиста. Важные ограничения отмечены отдельно.",
      meta: "Ванная · площадь уточняется",
      mat: "Травертин / матовая латунь",
    },
  ];
  const experience = getById("experience"),
    canvas = getById("scene"),
    reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const refs = {
    kicker: getById("room-kicker"),
    title: getById("room-title"),
    desc: getById("room-description"),
    num: getById("room-number"),
    meta: getById("room-meta"),
    label: getById("plan-label"),
    name: getById("plan-room"),
    dot: getById("plan-dot"),
    line: getById("plan-progress"),
    hero: getById("hero-actions"),
    next: getById("room-actions"),
    copy: getById("room-copy"),
  };
  let active = 0,
    progress = 0,
    sceneReady = false,
    renderer,
    scene,
    camera,
    frame = 0;
  function setRoom(i) {
    i = Math.max(0, Math.min(4, i));
    if (i === active && sceneReady) return;
    active = i;
    const c = content[i];
    refs.kicker.textContent = c.kicker;
    refs.title.innerHTML = c.title;
    refs.desc.textContent = c.desc;
    refs.num.textContent = c.n;
    refs.meta.innerHTML =
      "<span>" + c.meta + "</span><span>" + c.mat + "</span>";
    refs.label.textContent = c.n + " / 05";
    refs.name.textContent = c.name;
    refs.hero.style.display = i === 0 ? "flex" : "none";
    refs.next.classList.toggle("is-visible", i > 0 && i < 4);
    refs.dot.setAttribute("cx", 25 + 42 * i);
    refs.line.setAttribute("d", `M25 34H${25 + 42 * i}`);
  }
  function scrollProgress() {
    if (reduced) return;
    const max = experience.offsetHeight - innerHeight;
    progress =
      max > 0
        ? Math.max(
            0,
            Math.min(1, -experience.getBoundingClientRect().top / max),
          )
        : 0;
    setRoom(Math.min(4, Math.floor(progress * 5 + 0.16)));
    if (sceneReady) requestFrame();
  }
  getById("next-room").addEventListener("click", () => {
    const next = Math.min(4, active + 1);
    window.scrollTo({
      top:
        experience.offsetTop +
        (experience.offsetHeight - innerHeight) * (next / 5 + 0.015),
      behavior: reduced ? "instant" : "smooth",
    });
  });
  addEventListener("scroll", scrollProgress, {
    passive: true,
    signal: controller.signal,
  });
  addEventListener(
    "resize",
    () => {
      resize();
      scrollProgress();
    },
    { passive: true, signal: controller.signal },
  );
  function fallback() {
    root.classList.add("no-webgl");
    sceneReady = false;
    setRoom(0);
  }
  if (!window.THREE) {
    fallback();
    return cleanup;
  }
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
      preserveDrawingBuffer: reduced,
    });
  } catch {
    fallback();
    return cleanup;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.78;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe7dfd1);
  scene.fog = new THREE.Fog(0xe7dfd1, 17, 48);
  camera = new THREE.PerspectiveCamera(67, 1, 0.06, 70);
  const mat = (color, rough = 0.82, metal = 0) =>
    new THREE.MeshStandardMaterial({
      color,
      roughness: rough,
      metalness: metal,
    });
  const M = {
    wall: mat(0xe8e0d3),
    ceiling: mat(0xf4eee3),
    oak: mat(0xb88859),
    oakLight: mat(0xc9a779),
    oakDark: mat(0x76533e),
    stone: mat(0xc6beb0),
    trav: mat(0xb9ad98),
    charcoal: mat(0x393a36),
    linen: mat(0xd8cbb9),
    cream: mat(0xece5d8),
    terracotta: mat(0xaa674f),
    brass: mat(0xb89a62, 0.38, 0.55),
    green: mat(0x526753),
    leaf: mat(0x658165),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0xcbd9d1,
      transparent: true,
      opacity: 0.35,
      roughness: 0.08,
      metalness: 0.1,
    }),
    white: mat(0xffffff),
    darkstone: mat(0x625e58),
    water: mat(0xe6ede9),
  };
  function surfaceTexture(kind) {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d");
    ctx.fillStyle =
      kind === "wood" ? "#f9f3e8" : kind === "stone" ? "#f6f1e9" : "#f7f4ef";
    ctx.fillRect(0, 0, 256, 256);
    let seed = kind.length * 311;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    if (kind === "wood") {
      for (let i = 0; i < 100; i++) {
        const y = rand() * 256;
        ctx.strokeStyle = `rgba(89,53,30,${0.018 + rand() * 0.055})`;
        ctx.lineWidth = 0.3 + rand() * 1.1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(
          70,
          y + rand() * 4 - 2,
          180,
          y + rand() * 4 - 2,
          256,
          y + rand() * 3 - 1.5,
        );
        ctx.stroke();
      }
      for (let y = 0; y < 256; y += 42) {
        ctx.fillStyle = "rgba(80,50,28,.10)";
        ctx.fillRect(0, y, 256, 1);
      }
    } else {
      for (let i = 0; i < 1000; i++) {
        const a = rand() * (kind === "stone" ? 0.055 : 0.025);
        ctx.fillStyle = `rgba(70,60,50,${a})`;
        const x = rand() * 256,
          y = rand() * 256,
          r = rand() * (kind === "stone" ? 2.2 : 1.1);
        ctx.fillRect(x, y, r, r);
      }
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(2, 2);
    t.anisotropy = 4;
    return t;
  }
  M.oak.map = surfaceTexture("wood");
  M.oakLight.map = surfaceTexture("wood");
  M.oakDark.map = surfaceTexture("wood");
  M.trav.map = surfaceTexture("stone");
  M.stone.map = surfaceTexture("stone");
  M.linen.map = surfaceTexture("cloth");
  M.cream.map = surfaceTexture("cloth");
  const box = (w, h, d, x, y, z, m, cast = true) => {
    const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    o.position.set(x, y, z);
    o.castShadow = cast;
    o.receiveShadow = true;
    scene.add(o);
    return o;
  };
  const cyl = (r, h, x, y, z, m, segments = 24) => {
    const o = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, segments), m);
    o.position.set(x, y, z);
    o.castShadow = true;
    o.receiveShadow = true;
    scene.add(o);
    return o;
  };
  function wallPanel(z) {
    box(2.72, 3.25, 0.18, -2.64, 1.625, z, M.wall);
    box(2.72, 3.25, 0.18, 2.64, 1.625, z, M.wall);
    box(2.02, 0.64, 0.18, 0, 2.93, z, M.wall);
    box(2.04, 0.1, 0.24, 0, 2.56, z, M.oakLight);
  }
  function lamp(x, z, y = 2.62) {
    const light = new THREE.PointLight(0xffd6a2, 0.48, 5);
    light.position.set(x, y - 0.25, z);
    scene.add(light);
    cyl(0.17, 0.025, x, y, z, M.brass);
    cyl(0.105, 0.25, x, y - 0.15, z, M.cream);
  }
  function plant(x, z, s = 1) {
    cyl(0.22 * s, 0.38 * s, x, 0.2 * s, z, M.trav);
    cyl(0.04 * s, 0.55 * s, x, 0.66 * s, z, M.oakDark);
    for (let j = 0; j < 7; j++) {
      const a = j * 2.4;
      const leaf = new THREE.Mesh(
        new THREE.SphereGeometry(0.13 * s, 8, 6),
        M.leaf,
      );
      leaf.scale.set(0.55, 1.6, 0.5);
      leaf.rotation.z = Math.cos(a) * 0.55;
      leaf.rotation.x = Math.sin(a) * 0.55;
      leaf.position.set(
        x + Math.cos(a) * 0.19 * s,
        0.95 * s + (j % 3) * 0.12 * s,
        z + Math.sin(a) * 0.19 * s,
      );
      scene.add(leaf);
    }
  }
  function rug(x, z, w, d, m = M.linen) {
    box(w, 0.035, d, x, 0.025, z, m, false);
  }
  function sideWindow(x, z, w = 2.2) {
    box(0.06, 1.63, w, x, 1.83, z, M.cream, false);
    box(0.065, 1.45, w - 0.15, x, 1.83, z, M.white, false);
    const glow = new THREE.MeshBasicMaterial({ color: 0xeef3df });
    box(0.068, 1.33, w - 0.27, x, 1.83, z, glow, false);
    box(0.09, 0.055, w - 0.1, x, 1.83, z, M.oakLight);
    box(0.09, 1.52, 0.055, x, 1.83, z, M.oakLight);
    const l = new THREE.PointLight(0xfff7df, 0.7, 8);
    l.position.set(x > 0 ? x - 1 : x + 1, 2, z);
    scene.add(l);
  }
  function shelf(x, z) {
    box(0.32, 2.2, 2.1, x, 1.1, z, M.oakDark);
    for (let i = 0; i < 4; i++) {
      box(0.36, 0.055, 2.11, x, 0.3 + i * 0.53, z, M.oakLight);
      for (let k = 0; k < 7; k++) {
        const c = [M.cream, M.terracotta, M.charcoal, M.trav][(i + k) % 4];
        box(
          0.22,
          0.24 + ((i + k) % 3) * 0.05,
          0.045,
          x - 0.23,
          0.43 + i * 0.53,
          z - 0.78 + k * 0.22,
          c,
        );
      }
    }
  }
  function art(x, y, z, w, h, c1, c2) {
    box(w + 0.06, h + 0.06, 0.05, x, y, z, M.oakDark);
    box(w, h, 0.056, x, y, z - 0.01, M.cream);
    box(w * 0.43, h * 0.75, 0.059, x - w * 0.12, y - h * 0.02, z - 0.02, c1);
    box(w * 0.24, h * 0.42, 0.061, x + w * 0.17, y - h * 0.12, z - 0.024, c2);
  }
  const roomCenters = [-1.8, -8.6, -15.4, -22.2, -29];
  for (let i = 0; i < 5; i++) {
    const z = roomCenters[i];
    box(8, 0.15, 6.8, 0, -0.1, z, i === 4 ? M.trav : M.oak, false);
    box(8, 0.12, 6.8, 0, 3.25, z, M.ceiling, false);
    box(0.16, 3.25, 6.8, -4, 1.625, z, i === 4 ? M.trav : M.wall, false);
    box(0.16, 3.25, 6.8, 4, 1.625, z, i === 4 ? M.trav : M.wall, false);
    box(0.1, 0.15, 6.8, -3.88, 0.11, z, M.oakLight, false);
    box(0.1, 0.15, 6.8, 3.88, 0.11, z, M.oakLight, false);
    if (i < 4) wallPanel(z - 3.4);
    lamp(0, z - 1.5);
  }
  box(8, 3.25, 0.2, 0, 1.625, -32.4, M.wall);
  box(2.7, 1.9, 0.08, 0, 1.65, -32.25, M.glass, false);
  box(2.6, 0.05, 0.1, 0, 0.7, -32.16, M.brass);
  // Прихожая: рейки, скамья, зеркало, мягкий свет.
  rug(0, -1.6, 1.2, 2.9, M.linen);
  box(0.34, 2.55, 2.8, -3.73, 1.35, -1.9, M.oakDark);
  for (let i = 0; i < 12; i++)
    box(0.07, 2.48, 0.065, -3.52, 1.35, -3.2 + i * 0.23, M.oakLight);
  box(0.7, 0.13, 1.42, 3.25, 0.55, -1.15, M.oakDark);
  box(0.45, 0.22, 1.24, 3.25, 0.68, -1.15, M.linen);
  for (const z of [-1.65, -0.7])
    box(0.07, 0.5, 0.07, 3.25, 0.28, z, M.charcoal);
  const mirror = new THREE.Mesh(new THREE.CircleGeometry(0.57, 32), M.glass);
  mirror.position.set(3.89, 1.82, -2.75);
  mirror.rotation.y = -Math.PI / 2;
  scene.add(mirror);
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(0.58, 0.025, 8, 40),
    M.brass,
  );
  rim.position.copy(mirror.position);
  rim.rotation.y = -Math.PI / 2;
  scene.add(rim);
  plant(2.9, 0.4, 0.9);
  art(-3.86, 1.8, 0, 0.03, 1, M.terracotta, M.charcoal);
  // Гостиная: диван, стол, кресло, библиотека и окно.
  rug(-1.05, -8.8, 3.9, 3.8, M.linen);
  box(1.12, 0.38, 2.35, -2.35, 0.39, -8.7, M.cream);
  box(0.32, 0.68, 2.35, -2.91, 0.69, -8.7, M.cream);
  box(1.08, 0.6, 0.24, -2.35, 0.76, -9.82, M.cream);
  box(1.08, 0.6, 0.24, -2.35, 0.76, -7.58, M.cream);
  for (const z of [-9.3, -8.65, -8])
    box(0.9, 0.12, 0.55, -2.3, 0.65, z, M.linen);
  box(0.55, 0.32, 0.25, -2.17, 0.78, -9.25, M.terracotta);
  box(0.54, 0.3, 0.25, -2.13, 0.78, -8.1, M.oakLight);
  cyl(0.57, 0.1, -0.15, 0.43, -8.6, M.trav);
  cyl(0.12, 0.36, -0.15, 0.21, -8.6, M.oakDark);
  box(0.55, 0.3, 0.66, 2.75, 0.48, -8.5, M.terracotta);
  box(0.1, 0.7, 0.1, 2.75, 0.27, -8.5, M.oakDark);
  shelf(3.58, -10.6);
  sideWindow(-3.94, -6.8, 2.3);
  plant(2.7, -6.5, 1.3);
  art(3.86, 1.8, -6.55, 0.03, 1, M.terracotta, M.charcoal);
  // Кухня: нижние и верхние фасады, каменная столешница, остров, стол и посуда.
  box(0.82, 0.88, 4.1, -3.45, 0.44, -15.5, M.oakDark);
  box(0.93, 0.1, 4.25, -3.42, 0.93, -15.5, M.trav);
  for (let i = 0; i < 5; i++) {
    box(0.02, 0.73, 0.73, -2.99, 0.49, -17.1 + i * 0.8, M.oakLight);
    box(0.4, 0.65, 0.77, -3.68, 2.43, -17.1 + i * 0.8, M.oakLight);
  }
  box(0.06, 1.3, 4.25, -3.91, 1.7, -15.5, M.trav, false);
  box(0.5, 0.85, 1.35, 2.8, 0.43, -15.9, M.oakDark);
  box(0.7, 0.1, 1.5, 2.8, 0.89, -15.9, M.trav);
  for (let z of [-16.35, -15.45]) cyl(0.21, 0.055, 2.8, 0.97, z, M.charcoal);
  cyl(0.63, 0.055, 1.95, 0.75, -13.7, M.oakDark);
  cyl(0.08, 0.72, 1.95, 0.37, -13.7, M.oakDark);
  for (let a of [0, 2.1, 4.2]) {
    const x = 1.95 + Math.cos(a) * 0.92,
      z = -13.7 + Math.sin(a) * 0.92;
    cyl(0.2, 0.38, x, 0.35, z, M.oakLight);
    cyl(0.055, 0.32, x, 0.16, z, M.charcoal);
  }
  sideWindow(3.94, -17.2, 2.3);
  plant(3.32, -12.8, 0.7);
  for (let z of [-14.1, -15.5]) lamp(1.8, z, 2.45);
  // Спальня: низкая кровать, мягкое изголовье, прикроватные предметы и текстиль.
  rug(-1.15, -22.5, 3.7, 4.25, M.linen);
  box(1.85, 0.3, 2.65, -2.05, 0.32, -22.5, M.oakDark);
  box(1.73, 0.28, 2.45, -2.02, 0.58, -22.5, M.cream);
  box(0.28, 0.8, 2.65, -3.15, 0.82, -22.5, M.linen);
  box(1.75, 0.08, 1.35, -2.01, 0.75, -22.55, M.white);
  box(0.7, 0.14, 0.55, -1.95, 0.83, -23.17, M.linen);
  box(0.7, 0.14, 0.55, -1.95, 0.83, -21.83, M.linen);
  box(0.5, 0.44, 0.7, -3.31, 0.35, -20.62, M.oakDark);
  box(0.5, 0.44, 0.7, -3.31, 0.35, -24.38, M.oakDark);
  box(0.5, 0.12, 1.6, 3.47, 0.6, -22.3, M.oakDark);
  box(0.55, 0.82, 1.7, 3.48, 1.08, -22.3, M.oakLight);
  sideWindow(3.94, -20.1, 2.3);
  plant(2.9, -24.7, 1.1);
  art(3.86, 1.76, -24.8, 0.03, 0.9, M.terracotta, M.oakDark);
  // Ванная: травертин, ванна, раковина, стеклянная перегородка и латунь.
  rug(0, -29, 1.15, 3.7, M.cream);
  box(1.27, 0.5, 2.4, 2.68, 0.39, -29.6, M.white);
  box(1.03, 0.19, 2.05, 2.68, 0.71, -29.6, M.water);
  box(0.5, 0.72, 1.55, -3.49, 0.5, -28.6, M.oakDark);
  box(0.65, 0.095, 1.68, -3.48, 0.92, -28.6, M.trav);
  cyl(0.26, 0.08, -3.24, 1.01, -28.6, M.white);
  cyl(0.035, 0.22, -3.18, 1.16, -28.6, M.brass);
  box(0.05, 2.1, 1.65, 1.48, 1.07, -29.6, M.glass, false);
  const bm = new THREE.Mesh(new THREE.CircleGeometry(0.59, 32), M.glass);
  bm.position.set(-3.89, 1.93, -29.2);
  bm.rotation.y = Math.PI / 2;
  scene.add(bm);
  const br = new THREE.Mesh(
    new THREE.TorusGeometry(0.6, 0.024, 8, 40),
    M.brass,
  );
  br.position.copy(bm.position);
  br.rotation.y = Math.PI / 2;
  scene.add(br);
  plant(-2.9, -31.2, 0.65);
  scene.add(new THREE.HemisphereLight(0xfff7e8, 0x9d8c76, 0.68));
  const sun = new THREE.DirectionalLight(0xffefcf, 1.12);
  sun.position.set(-3, 8, -10);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -9;
  sun.shadow.camera.right = 9;
  sun.shadow.camera.top = 9;
  sun.shadow.camera.bottom = -9;
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 40;
  sun.shadow.bias = -0.0004;
  scene.add(sun);
  function resize() {
    if (!renderer) return;
    const w = canvas.clientWidth,
      h = canvas.clientHeight;
    if (w && h) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w < 800 ? 73 : 67;
      camera.updateProjectionMatrix();
      requestFrame();
    }
  }
  function requestFrame() {
    if (frame || !sceneReady) return;
    frame = requestAnimationFrame(drawFrame);
  }
  const path = [
    { z: 1.0, x: 0, look: -3.2, lookX: 1.1 },
    { z: -7.1, x: 0.18, look: -9.3, lookX: -1.45 },
    { z: -14.2, x: -0.12, look: -16.3, lookX: 1.35 },
    { z: -21.4, x: 0.15, look: -23.3, lookX: -1.4 },
    { z: -28.3, x: -0.1, look: -30.2, lookX: 1.25 },
  ];
  function pose(t) {
    const f = Math.max(0, Math.min(3.999, t * 5)),
      i = Math.floor(f),
      u = f - i,
      s = u * u * (3 - 2 * u),
      a = path[i],
      b = path[Math.min(i + 1, 4)];
    return {
      x: a.x + (b.x - a.x) * s,
      z: a.z + (b.z - a.z) * s,
      look: a.look + (b.look - a.look) * s,
      lookX: a.lookX + (b.lookX - a.lookX) * s,
    };
  }
  let camZ = path[0].z,
    camX = 0,
    lookZ = path[0].look,
    lookX = path[0].lookX,
    last = 0;
  function drawFrame(ms) {
    frame = 0;
    if (ms - last < 15) {
      requestFrame();
      return;
    }
    last = ms;
    const p = pose(progress),
      ease = reduced ? 1 : 0.085;
    camZ += (p.z - camZ) * ease;
    camX += (p.x - camX) * ease;
    lookZ += (p.look - lookZ) * ease;
    lookX += (p.lookX - lookX) * ease;
    camera.position.set(camX, 1.57, camZ);
    camera.lookAt(lookX, 1.43, lookZ);
    renderer.render(scene, camera);
    if (Math.abs(p.z - camZ) > 0.006 || Math.abs(p.x - camX) > 0.006)
      requestFrame();
  }
  if (reduced) {
    renderer.setPixelRatio(1);
    renderer.setSize(900, 560, false);
    camera.aspect = 900 / 560;
    camera.fov = 67;
    camera.updateProjectionMatrix();
    const articles = root.querySelectorAll("#room-gallery article");
    for (let i = 0; i < 5; i++) {
      camera.position.set(path[i].x, 1.57, path[i].z);
      camera.lookAt(path[i].lookX, 1.43, path[i].look);
      renderer.render(scene, camera);
      const still = canvas.toDataURL("image/jpeg", 0.86);
      const img = document.createElement("img");
      img.src = still;
      img.alt = "Неподвижный вид: " + content[i].name.toLowerCase();
      img.width = 900;
      img.height = 560;
      articles[i].prepend(img);
      if (i === 0) {
        const cover = root.querySelector(".scene-fallback");
        cover.style.backgroundImage = `url(${still})`;
        cover.classList.add("has-still");
      }
    }
    canvas.style.display = "none";
    root.classList.add("no-webgl");
    setRoom(0);
    return cleanup;
  }
  sceneReady = true;
  resize();
  scrollProgress();
  requestFrame();
  document.addEventListener(
    "visibilitychange",
    () => {
      if (!document.hidden) requestFrame();
    },
    { signal: controller.signal },
  );
  return cleanup;
};
