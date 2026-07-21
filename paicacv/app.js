// ============================================================================
// CONSTANTS & INITIAL DATA (Copied from models.py)
// ============================================================================

const MM_CO2 = 44.0;
const MM_CaO = 56.0;
const CO2_OVER_CaO = MM_CO2 / MM_CaO; // ≈ 0.7857

const DEFAULT_CEMENT_COEFFS = {
    "CP I":     { kc: 19.80, k_fc: 1.70, k_ad: 0.24, k_co2: 18.80, k_UR: 1300.0 },
    "CP II E":  { kc: 22.48, k_fc: 1.50, k_ad: 0.32, k_co2: 15.50, k_UR: 1300.0 },
    "CP II F":  { kc: 21.68, k_fc: 1.50, k_ad: 0.24, k_co2: 18.80, k_UR: 1100.0 },
    "CP II Z":  { kc: 23.66, k_fc: 1.50, k_ad: 0.32, k_co2: 15.50, k_UR: 1300.0 },
    "CP III":   { kc: 30.50, k_fc: 1.70, k_ad: 0.32, k_co2: 15.50, k_UR: 1300.0 },
    "CP IV":    { kc: 33.27, k_fc: 1.70, k_ad: 0.32, k_co2: 15.50, k_UR: 1000.0 },
    "CP V ARI": { kc: 19.80, k_fc: 1.70, k_ad: 0.24, k_co2: 18.80, k_UR: 1300.0 },
};

const CP_TO_CEM_MAP = {
    "CP I": "CEM I",
    "CP II E": "CEM II/A",
    "CP II F": "CEM II/A",
    "CP II Z": "CEM II/A",
    "CP III": "CEM II/B",
    "CP IV": "CEM II/B",
    "CP V ARI": "CEM I",
};

const EN_UTCC_BY_CEM = {
    "CEM I": 0.49,
    "CEM II/A": 0.41,
    "CEM II/B": 0.36
};

const SIDAC_MATERIALS = {
    "Mortar (1:6)":      { category: "Mortar",   fc: 6.0,  cement: 273.40, lime: 0.00,   cement_type: "CP II F" },
    "Mortar (1:2:9)":    { category: "Mortar",   fc: 6.0,  cement: 157.40, lime: 52.88,  cement_type: "CP II F" },
    "Mortar (1:2:8)":    { category: "Mortar",   fc: 6.0,  cement: 165.82, lime: 185.72, cement_type: "CP II F" },
    "Mortar (1:1:6)":    { category: "Mortar",   fc: 10.0, cement: 239.70, lime: 134.23, cement_type: "CP II F" },
    "Mortar (1:4)":      { category: "Mortar",   fc: 10.0, cement: 382.90, lime: 0.00,   cement_type: "CP II F" },
    "Mortar (1:3)":      { category: "Mortar",   fc: 10.0, cement: 478.60, lime: 0.00,   cement_type: "CP II F" },
    "Concrete 20Mpa":    { category: "Concrete", fc: 20.0, cement: 260.00, lime: 0.00,   cement_type: "CP II F" },
    "Concrete 25Mpa":    { category: "Concrete", fc: 25.0, cement: 298.00, lime: 0.00,   cement_type: "CP II F" },
    "Concrete 30Mpa":    { category: "Concrete", fc: 30.0, cement: 340.00, lime: 0.00,   cement_type: "CP II F" },
    "Concrete 35Mpa":    { category: "Concrete", fc: 35.0, cement: 385.00, lime: 0.00,   cement_type: "CP II F" },
    "Concrete 40Mpa":    { category: "Concrete", fc: 40.0, cement: 420.00, lime: 0.00,   cement_type: "CP II F" },
    "Lean concrete":     { category: "Concrete", fc: 15.0, cement: 174.00, lime: 0.00,   cement_type: "CP II F" },
};

const SIDAC_EMISSIONS = {
    "Mortar (1:6)": 235.4,
    "Mortar (1:2:9)": 288.3,
    "Mortar (1:2:8)": 300.5,
    "Mortar (1:1:6)": 315.8,
    "Mortar (1:4)": 315.0,
    "Mortar (1:3)": 384.6,
    "Concrete 20Mpa": 226.2,
    "Concrete 25Mpa": 253.2,
    "Concrete 30Mpa": 283.8,
    "Concrete 35Mpa": 315.1,
    "Concrete 40Mpa": 339.5,
    "Lean concrete": 151.1
};

// ============================================================================
// I18N DICTIONARY & LANGUAGE CONTROLLER
// ============================================================================

const PAIC_TRANSLATIONS = {
  pt: {
    tab_workspace: "Parâmetros",
    tab_citation: "Citação",
    tab_glossary: "Glossário / Referências",
    panel_factors: "Fatores/Modelos",
    sec_lifetime: "Vida Útil & Ambiente",
    label_t_use: "Tempo de Uso T_uso (anos):",
    label_t_eol: "Horizonte EoL T_eol (anos):",
    label_co2: "Teor de CO₂ (ppm):",
    label_ur: "Umidade Relativa UR (%):",
    label_eol_thick: "Brita no EoL (mm):",
    sec_collins: "Estequiometria Collins",
    label_r: "Grau de Carbonatação r:",
    label_cao_cim: "Fração CaO Cimento:",
    label_cao_cal: "Fração CaO Cal:",
    sec_en: "Fatores da Norma EN",
    label_en_w: "Fator w (CaO Carbonatável):",
    label_en_cc: "Fator Cc (Teor Clínquer):",
    btn_cement_coeff: "⚙ Coef. Cimento (Possan)",
    btn_sidac_mat: "🧪 Materiais SIDAC",
    title_elements: "Materiais e Elementos Estruturais",
    th_name: "Nome do Elemento",
    th_area: "Área (m²)",
    th_thick: "Esp. (m)",
    th_vol: "Vol. (m³)",
    th_material: "Material SIDAC",
    th_exposure: "Classe de Exposição",
    btn_add_elem: "➕ Adicionar Elemento",
    btn_import: "📥 Importar Planilha",
    chart_tab_uptake: "Sequestro CO₂ Cumulativo",
    chart_tab_depth: "Frente Carbonatação",
    chart_tab_pie: "Contribuição Elemento",
    chart_tab_compare: "Comparar Métodos",
    chart_tab_balance: "Balanço Carbono",
    metric_use: "Fase de Uso (T_uso Anos)",
    metric_eol: "Fim de Vida (EoL Potencial)",
    metric_total: "Sequestro Total (Uso + EoL)",
    btn_export_excel: "📊 Exportar Excel (.xlsx)",
    btn_export_csv: "📄 Exportar CSV (.csv)",
    citation_head: "Como citar este trabalho / How to cite this work:",
    glossary_head: "Glossário de Variáveis e Parâmetros",
    ref_head: "Referências Bibliográficas",
    chart_lbl_time: "Tempo (Anos)",
    chart_lbl_uptake_kg: "Captura de CO₂ (kg)",
    chart_lbl_depth_mm: "Profundidade Capped (mm)",
    chart_lbl_en_conc: "EN (Concreto)",
    chart_lbl_col_conc: "Collins (Concreto)",
    chart_lbl_en_mort: "EN (Argamassa)",
    chart_lbl_col_mort: "Collins (Argamassa)",
    chart_lbl_use_phase: "Fase de uso",
    chart_lbl_start_eol: "Início EoL",
    chart_lbl_pie_title: "Contribuição por Elemento (EN 16757)",
    chart_lbl_initial_emissions: "Emissão Inicial",
    chart_lbl_total_uptake: "Captura Total",
    chart_lbl_net_balance: "Balanço Líquido"
  },
  en: {
    tab_workspace: "Parameters",
    tab_citation: "Citation",
    tab_glossary: "Glossary / References",
    panel_factors: "Factors/Models",
    sec_lifetime: "Service Life & Environment",
    label_t_use: "Use Time T_use (years):",
    label_t_eol: "EoL Horizon T_eol (years):",
    label_co2: "CO₂ Level (ppm):",
    label_ur: "Relative Humidity RH (%):",
    label_eol_thick: "Crushed Aggregate EoL (mm):",
    sec_collins: "Collins Stoichiometry",
    label_r: "Carbonation Degree r:",
    label_cao_cim: "CaO Fraction Cement:",
    label_cao_cal: "CaO Fraction Lime:",
    sec_en: "EN Standard Factors",
    label_en_w: "Factor w (Carbonatable CaO):",
    label_en_cc: "Factor Cc (Clinker Content):",
    btn_cement_coeff: "⚙ Cement Coeffs (Possan)",
    btn_sidac_mat: "🧪 SIDAC Materials",
    title_elements: "Materials and Structural Elements",
    th_name: "Element Name",
    th_area: "Area (m²)",
    th_thick: "Thick. (m)",
    th_vol: "Vol. (m³)",
    th_material: "SIDAC Material",
    th_exposure: "Exposure Class",
    btn_add_elem: "➕ Add Element",
    btn_import: "📥 Import Spreadsheet",
    chart_tab_uptake: "Cumulative CO₂ Sequestration",
    chart_tab_depth: "Carbonation Front",
    chart_tab_pie: "Element Contribution",
    chart_tab_compare: "Compare Methods",
    chart_tab_balance: "Carbon Balance",
    metric_use: "Use Phase (T_use Years)",
    metric_eol: "End of Life (EoL Potential)",
    metric_total: "Total Sequestration (Use + EoL)",
    btn_export_excel: "📊 Export Excel (.xlsx)",
    btn_export_csv: "📄 Export CSV (.csv)",
    citation_head: "How to cite this work:",
    glossary_head: "Glossary of Variables and Parameters",
    ref_head: "Bibliographic References",
    chart_lbl_time: "Time (Years)",
    chart_lbl_uptake_kg: "CO₂ Capture (kg)",
    chart_lbl_depth_mm: "Capped Depth (mm)",
    chart_lbl_en_conc: "EN (Concrete)",
    chart_lbl_col_conc: "Collins (Concrete)",
    chart_lbl_en_mort: "EN (Mortar)",
    chart_lbl_col_mort: "Collins (Mortar)",
    chart_lbl_use_phase: "Use Phase",
    chart_lbl_start_eol: "EoL Start",
    chart_lbl_pie_title: "Contribution by Element (EN 16757)",
    chart_lbl_initial_emissions: "Initial Emissions",
    chart_lbl_total_uptake: "Total Capture",
    chart_lbl_net_balance: "Net Balance"
  },
  es: {
    tab_workspace: "Parámetros",
    tab_citation: "Citación",
    tab_glossary: "Glosario / Referencias",
    panel_factors: "Factores/Modelos",
    sec_lifetime: "Vida Útil y Entorno",
    label_t_use: "Tiempo de Uso T_uso (años):",
    label_t_eol: "Horizonte EoL T_eol (años):",
    label_co2: "Nivel de CO₂ (ppm):",
    label_ur: "Humedad Relativa HR (%):",
    label_eol_thick: "Grava en EoL (mm):",
    sec_collins: "Estequiometría Collins",
    label_r: "Grado de Carbonatación r:",
    label_cao_cim: "Fracción CaO Cemento:",
    label_cao_cal: "Fracción CaO Cal:",
    sec_en: "Factores de Norma EN",
    label_en_w: "Factor w (CaO Carbonatable):",
    label_en_cc: "Factor Cc (Contenido Clínker):",
    btn_cement_coeff: "⚙ Coef. Cemento (Possan)",
    btn_sidac_mat: "🧪 Materiales SIDAC",
    title_elements: "Materiales y Elementos Estructurales",
    th_name: "Nombre del Elemento",
    th_area: "Área (m²)",
    th_thick: "Esp. (m)",
    th_vol: "Vol. (m³)",
    th_material: "Material SIDAC",
    th_exposure: "Clase de Exposición",
    btn_add_elem: "➕ Agregar Elemento",
    btn_import: "📥 Importar Planilla",
    chart_tab_uptake: "Secuestro CO₂ Acumulado",
    chart_tab_depth: "Frente Carbonatación",
    chart_tab_pie: "Contribución Elemento",
    chart_tab_compare: "Comparar Métodos",
    chart_tab_balance: "Balance Carbono",
    metric_use: "Fase de Uso (T_uso Años)",
    metric_eol: "Fin de Vida (EoL Potencial)",
    metric_total: "Secuestro Total (Uso + EoL)",
    btn_export_excel: "📊 Exportar Excel (.xlsx)",
    btn_export_csv: "📄 Exportar CSV (.csv)",
    citation_head: "Cómo citar este trabajo:",
    glossary_head: "Glosario de Variables y Parámetros",
    ref_head: "Referencias Bibliográficas",
    chart_lbl_time: "Tiempo (Años)",
    chart_lbl_uptake_kg: "Captura de CO₂ (kg)",
    chart_lbl_depth_mm: "Profundidad Capped (mm)",
    chart_lbl_en_conc: "EN (Hormigón)",
    chart_lbl_col_conc: "Collins (Hormigón)",
    chart_lbl_en_mort: "EN (Mortero)",
    chart_lbl_col_mort: "Collins (Mortero)",
    chart_lbl_use_phase: "Fase de uso",
    chart_lbl_start_eol: "Inicio EoL",
    chart_lbl_pie_title: "Contribución por Elemento (EN 16757)",
    chart_lbl_initial_emissions: "Emisión Inicial",
    chart_lbl_total_uptake: "Captura Total",
    chart_lbl_net_balance: "Balance Neto"
  },
  zh: {
    tab_workspace: "参数设置",
    tab_citation: "引用说明",
    tab_glossary: "术语表 / 参考文献",
    panel_factors: "模型与系数",
    sec_lifetime: "使用寿命与环境",
    label_t_use: "使用时间 T_use (年):",
    label_t_eol: "废弃阶段 T_eol (年):",
    label_co2: "CO₂ 浓度 (ppm):",
    label_ur: "相对湿度 RH (%):",
    label_eol_thick: "废弃破碎碎石 (mm):",
    sec_collins: "Collins 化学计量",
    label_r: "碳化程度 r:",
    label_cao_cim: "水泥 CaO 比例:",
    label_cao_cal: "石灰 CaO 比例:",
    sec_en: "EN 标准系数",
    label_en_w: "系数 w (可碳化 CaO):",
    label_en_cc: "系数 Cc (熟料含量):",
    btn_cement_coeff: "⚙ 水泥系数 (Possan)",
    btn_sidac_mat: "🧪 SIDAC 材料",
    title_elements: "材料与结构构件",
    th_name: "构件名称",
    th_area: "面积 (m²)",
    th_thick: "厚度 (m)",
    th_vol: "体积 (m³)",
    th_material: "SIDAC 材料",
    th_exposure: "暴露等级",
    btn_add_elem: "➕ 添加构件",
    btn_import: "📥 导入表格",
    chart_tab_uptake: "累计 CO₂ 吸收量",
    chart_tab_depth: "碳化深度前沿",
    chart_tab_pie: "构件贡献占比",
    chart_tab_compare: "方法对比",
    chart_tab_balance: "碳平衡分析",
    metric_use: "使用阶段 (T_use 年)",
    metric_eol: "生命周期结束 (EoL 潜力)",
    metric_total: "总碳吸收 (使用 + EoL)",
    btn_export_excel: "📊 导出 Excel (.xlsx)",
    btn_export_csv: "📄 导出 CSV (.csv)",
    citation_head: "如何引用本工作：",
    glossary_head: "变量与参数术语表",
    ref_head: "参考文献",
    chart_lbl_time: "时间 (年)",
    chart_lbl_uptake_kg: "CO₂ 捕集量 (kg)",
    chart_lbl_depth_mm: "碳化深度限制 (mm)",
    chart_lbl_en_conc: "EN (混凝土)",
    chart_lbl_col_conc: "Collins (混凝土)",
    chart_lbl_en_mort: "EN (砂浆)",
    chart_lbl_col_mort: "Collins (砂浆)",
    chart_lbl_use_phase: "使用阶段",
    chart_lbl_start_eol: "EoL 开始",
    chart_lbl_pie_title: "构件贡献占比 (EN 16757)",
    chart_lbl_initial_emissions: "初始排放",
    chart_lbl_total_uptake: "总捕集量",
    chart_lbl_net_balance: "净排放"
  }
};

let currentPaicLang = 'pt';

function changePaicLanguage(lang) {
    if (!lang || !PAIC_TRANSLATIONS[lang]) lang = 'pt';
    currentPaicLang = lang;
    const tDict = PAIC_TRANSLATIONS[lang];
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (tDict[key]) {
            el.textContent = tDict[key];
        }
    });

    const langSelect = document.getElementById('lang_select');
    if (langSelect && langSelect.value !== lang) {
        langSelect.value = lang;
    }
    
    localStorage.setItem('paicacv_lang', lang);
    
    if (typeof recalculate === 'function' && elements.length > 0) {
        recalculate();
    }
}

// ============================================================================
// APPLICATION STATE
// ============================================================================

let elements = [];
let cementCoeffs = JSON.parse(JSON.stringify(DEFAULT_CEMENT_COEFFS));
let materialProps = JSON.parse(JSON.stringify(SIDAC_MATERIALS));

// Global configurations (defaults from gui.py)
let globalParams = {
    T_use: 50,
    T_eol: 10,
    co2_ppm: 440,
    ur_pct: 65,
    eol_thick_mm: 5.0, // stored in mm, converted to m in calc
    r_collins: 0.75,
    cao_cim: 0.65,
    cao_cal: 0.75,
    en_w: 0.75,
    en_cc: 0.95
};

// Chart instances
let charts = {
    uptake: null,
    depth: null,
    pie: null,
    compare: null,
    balance: null
};

// ============================================================================
// LOGICAL MATH MODELS (Ported from models.py)
// ============================================================================

function getEnKDefault(fc, exposureClass) {
    let rates;
    if (fc < 16) {
        rates = { "Outdoor rain exposed": 5.5, "Outdoor sheltered": 11.0, "Indoor with cover": 11.6, "Indoor without cover": 16.5, "In ground": 1.1 };
    } else if (fc <= 25) {
        rates = { "Outdoor rain exposed": 2.7, "Outdoor sheltered": 6.6, "Indoor with cover": 6.9, "Indoor without cover": 9.9, "In ground": 0.8 };
    } else if (fc <= 35) {
        rates = { "Outdoor rain exposed": 1.6, "Outdoor sheltered": 4.4, "Indoor with cover": 4.6, "Indoor without cover": 6.6, "In ground": 0.8 };
    } else {
        rates = { "Outdoor rain exposed": 1.1, "Outdoor sheltered": 2.7, "Indoor with cover": 2.7, "Indoor without cover": 3.8, "In ground": 0.5 };
    }
    return rates[exposureClass] || 1.0;
}

function getEnDcDefault(exposureClass) {
    const dcMap = {
        "Outdoor rain exposed": 85.0,
        "Outdoor sheltered": 75.0,
        "Indoor with cover": 40.0,
        "Indoor without cover": 40.0,
        "In ground": 85.0
    };
    return dcMap[exposureClass] !== undefined ? dcMap[exposureClass] : 40.0;
}

function getPossanKceDefault(exposureClass) {
    const kceMap = {
        "Ambiente externo desprotegido da chuva": 0.65,
        "Ambiente externo protegido da chuva": 1.0,
        "Ambiente interno protegido da chuva": 1.3
    };
    return kceMap[exposureClass] !== undefined ? kceMap[exposureClass] : 1.0;
}

function possanDepthMm(t, fc, kc, kfc, ad, kad, urFrac, kur, co2Ppm, kco2, kce) {
    const co2Percent = co2Ppm / 10000.0;
    const expo = (kad * Math.pow(ad, 1.5)) / (40.0 + fc) +
                 (kco2 * Math.sqrt(co2Percent)) / (60.0 + fc) -
                 (kur * Math.pow(urFrac - 0.58, 2)) / (100.0 + kc);
                 
    // Prevent sqrt of negative times
    const timeFactor = t > 0 ? Math.sqrt(t / 20.0) : 0;
    return kc * Math.pow(20.0 / fc, kfc) * timeFactor * Math.exp(expo) * kce;
}

/**
 * Calculates yearly timelines for depth & CO2 uptake.
 */
function calculateElementUptake(elem, glob, customCementCoeffs) {
    // 1. Resolve EN Parameters
    let k_en = elem.custom_k_en !== null ? elem.custom_k_en : getEnKDefault(elem.fc, elem.exposure_class_en);
    let dc_en = elem.custom_dc_en !== null ? elem.custom_dc_en : getEnDcDefault(elem.exposure_class_en);
    
    let utcc_en;
    if (elem.custom_utcc_en !== null) {
        utcc_en = elem.custom_utcc_en;
    } else {
        const cemCat = CP_TO_CEM_MAP[elem.cement_type] || "CEM II/A";
        utcc_en = EN_UTCC_BY_CEM[cemCat] || 0.41;
    }
    
    // 2. Resolve Possan Parameters
    const coeffs = customCementCoeffs[elem.cement_type] || DEFAULT_CEMENT_COEFFS["CP II F"];
    const kc = coeffs.kc;
    const kfc = coeffs.k_fc !== undefined ? coeffs.k_fc : (coeffs.kfc !== undefined ? coeffs.kfc : 1.5);
    const kad = coeffs.k_ad !== undefined ? coeffs.k_ad : (coeffs.kad !== undefined ? coeffs.kad : 0.24);
    const kco2 = coeffs.k_co2 !== undefined ? coeffs.k_co2 : (coeffs.kco2 !== undefined ? coeffs.kco2 : 18.8);
    const kur = coeffs.k_UR !== undefined ? coeffs.k_UR : (coeffs.kur !== undefined ? coeffs.kur : 1100.0);
    
    const kce = elem.custom_kce_possan !== null ? elem.custom_kce_possan : getPossanKceDefault(elem.exposure_class_possan);
    
    const T_use = glob.T_use;
    const T_eol = glob.T_eol;
    const totalLen = T_use + T_eol + 1;
    const EoL_thickness_m = glob.eol_thick_mm / 1000.0;
    
    // Arrays
    const en_depth = new Array(totalLen).fill(0);
    const en_uptake = new Array(totalLen).fill(0);
    const collins_depth = new Array(totalLen).fill(0);
    const collins_uptake = new Array(totalLen).fill(0);
    
    // --- EN Model ---
    // Use Phase
    const en_use_uptake = new Array(T_use + 1).fill(0);
    for (let t = 0; t <= T_use; t++) {
        const y_en_mm = k_en * Math.sqrt(t);
        const y_en_m = y_en_mm / 1000.0;
        const y_en_m_capped = Math.min(y_en_m, elem.thickness);
        en_depth[t] = y_en_m_capped;
        en_use_uptake[t] = elem.area * y_en_m_capped * elem.cement_content * utcc_en * (dc_en / 100.0);
    }
    
    // End of Life Phase (EN)
    const y50_en = en_depth[T_use];
    const rem_thick_en = Math.max(0.0, elem.thickness - y50_en);
    const potential_eol_en = elem.area * rem_thick_en * elem.cement_content * utcc_en * (dc_en / 100.0);
    
    const en_eol_uptake = new Array(T_eol + 1).fill(0);
    if (rem_thick_en > 0) {
        const k_eol_en = getEnKDefault(elem.fc, "Outdoor rain exposed");
        const dc_eol_en = getEnDcDefault("Outdoor rain exposed");
        for (let t = 0; t <= T_eol; t++) {
            const y_eol_m = (k_eol_en * Math.sqrt(t)) / 1000.0;
            const y_eol_m_capped = Math.min(y_eol_m, EoL_thickness_m);
            const frac_en = y_eol_m_capped / EoL_thickness_m;
            en_eol_uptake[t] = frac_en * (elem.area * rem_thick_en * elem.cement_content * utcc_en * (dc_eol_en / 100.0));
        }
    }
    
    // Combine EN
    for (let t = 0; t < totalLen; t++) {
        if (t <= T_use) {
            en_depth[t] = en_depth[t]; // already set
            en_uptake[t] = en_use_uptake[t];
        } else {
            const eol_t = t - T_use;
            en_depth[t] = y50_en; // stays at y50_en representing crushed state base
            en_uptake[t] = en_use_uptake[T_use] + en_eol_uptake[eol_t];
        }
    }
    
    // --- Possan / Collins Model ---
    // Use Phase
    const ur_frac = glob.ur_pct / 100.0;
    const ad = 0.0; // additions default
    const binder_cao = elem.cement_content * glob.cao_cim + elem.lime_content * glob.cao_cal;
    
    const collins_use_uptake = new Array(T_use + 1).fill(0);
    for (let t = 0; t <= T_use; t++) {
        const y_pc_mm = possanDepthMm(t, elem.fc, kc, kfc, ad, kad, ur_frac, kur, glob.co2_ppm, kco2, kce);
        const y_pc_m = y_pc_mm / 1000.0;
        const y_pc_m_capped = Math.min(y_pc_m, elem.thickness);
        collins_depth[t] = y_pc_m_capped;
        collins_use_uptake[t] = y_pc_m_capped * elem.area * binder_cao * glob.r_collins * CO2_OVER_CaO;
    }
    
    // End of Life Phase (Collins)
    const y50_pc = collins_depth[T_use];
    const rem_thick_pc = Math.max(0.0, elem.thickness - y50_pc);
    const potential_eol_collins = rem_thick_pc * elem.area * binder_cao * glob.r_collins * CO2_OVER_CaO;
    
    const collins_eol_uptake = new Array(T_eol + 1).fill(0);
    if (rem_thick_pc > 0) {
        const kce_eol = getPossanKceDefault("Outdoor rain exposed");
        for (let t = 0; t <= T_eol; t++) {
            const y_eol_pc_mm = possanDepthMm(t, elem.fc, kc, kfc, ad, kad, ur_frac, kur, glob.co2_ppm, kco2, kce_eol);
            const y_eol_pc_m = y_eol_pc_mm / 1000.0;
            const y_eol_pc_m_capped = Math.min(y_eol_pc_m, EoL_thickness_m);
            const frac_pc = y_eol_pc_m_capped / EoL_thickness_m;
            collins_eol_uptake[t] = frac_pc * potential_eol_collins;
        }
    }
    
    // Combine Collins
    for (let t = 0; t < totalLen; t++) {
        if (t <= T_use) {
            collins_depth[t] = collins_depth[t];
            collins_uptake[t] = collins_use_uptake[t];
        } else {
            const eol_t = t - T_use;
            collins_depth[t] = y50_pc;
            collins_uptake[t] = collins_use_uptake[T_use] + collins_eol_uptake[eol_t];
        }
    }
    
    return {
        en_depth,
        en_uptake,
        en_use_final: en_use_uptake[T_use],
        en_eol_final: en_eol_uptake[T_eol],
        en_potential_eol: potential_eol_en,
        
        collins_depth,
        collins_uptake,
        collins_use_final: collins_use_uptake[T_use],
        collins_eol_final: collins_eol_uptake[T_eol],
        collins_potential_eol: potential_eol_collins
    };
}

// ============================================================================
// CALCULATIONS COORDINATOR
// ============================================================================

let calculatedResults = [];
let timelineYears = [];
let agg_en_concreto = [];
let agg_en_argamassa = [];
let agg_co_concreto = [];
let agg_co_argamassa = [];
let agg_en_uptake = [];
let agg_collins_uptake = [];

function recalculate() {
    // 1. Load global config values
    const T_use = parseInt(document.getElementById("entry_t_use").value) || 50;
    const T_eol = parseInt(document.getElementById("entry_t_eol").value) || 10;
    
    globalParams.T_use = T_use;
    globalParams.T_eol = T_eol;
    globalParams.co2_ppm = parseFloat(document.getElementById("entry_co2").value) || 440;
    globalParams.ur_pct = parseFloat(document.getElementById("entry_ur").value) || 65;
    globalParams.eol_thick_mm = parseFloat(document.getElementById("entry_eol_thick").value) || 5.0;
    
    globalParams.r_collins = parseFloat(document.getElementById("entry_r").value) || 0.75;
    globalParams.cao_cim = parseFloat(document.getElementById("entry_cao_cim").value) || 0.65;
    globalParams.cao_cal = parseFloat(document.getElementById("entry_cao_cal").value) || 0.75;
    
    globalParams.en_w = parseFloat(document.getElementById("entry_en_w").value) || 0.75;
    globalParams.en_cc = parseFloat(document.getElementById("entry_en_cc").value) || 0.95;
    
    const totalLen = T_use + T_eol + 1;
    timelineYears = Array.from({length: totalLen}, (_, i) => i);
    
    // Reset aggregates
    agg_en_concreto = new Array(totalLen).fill(0);
    agg_en_argamassa = new Array(totalLen).fill(0);
    agg_co_concreto = new Array(totalLen).fill(0);
    agg_co_argamassa = new Array(totalLen).fill(0);
    agg_en_uptake = new Array(totalLen).fill(0);
    agg_collins_uptake = new Array(totalLen).fill(0);
    
    calculatedResults = [];
    
    const global_en_utcc = globalParams.en_w * globalParams.en_cc * (MM_CO2 / MM_CaO);
    
    // Process each element
    elements.forEach((elem, idx) => {
        // Calculate
        const elemCopy = JSON.parse(JSON.stringify(elem));
        if (elemCopy.custom_utcc_en === null) {
            elemCopy.custom_utcc_en = global_en_utcc;
        }
        
        const res = calculateElementUptake(elemCopy, globalParams, cementCoeffs);
        
        // Sum aggregates
        for (let t = 0; t < totalLen; t++) {
            agg_en_uptake[t] += res.en_uptake[t];
            agg_collins_uptake[t] += res.collins_uptake[t];
            
            const cat = materialProps[elem.material_name]?.category || "Concrete";
            if (cat === "Mortar") {
                agg_en_argamassa[t] += res.en_uptake[t];
                agg_co_argamassa[t] += res.collins_uptake[t];
            } else {
                agg_en_concreto[t] += res.en_uptake[t];
                agg_co_concreto[t] += res.collins_uptake[t];
            }
        }
        
        calculatedResults.push({
            element: elem,
            res: res
        });
    });
    
    // 3. Update UI Cards
    const en_use = agg_en_uptake[T_use] || 0;
    const co_use = agg_collins_uptake[T_use] || 0;
    document.getElementById("card_use_val").innerHTML = 
        `<span>EN: ${en_use.toFixed(2)} kg</span><span>Collins: ${co_use.toFixed(2)} kg</span>`;
        
    const en_eol_pot = calculatedResults.reduce((acc, cr) => acc + cr.res.en_potential_eol, 0);
    const co_eol_pot = calculatedResults.reduce((acc, cr) => acc + cr.res.collins_potential_eol, 0);
    document.getElementById("card_eol_val").innerHTML = 
        `<span>EN: ${en_eol_pot.toFixed(2)} kg</span><span>Collins: ${co_eol_pot.toFixed(2)} kg</span>`;
        
    const en_tot = en_use + en_eol_pot;
    const co_tot = co_use + co_eol_pot;
    document.getElementById("card_total_val").innerHTML = 
        `<span>EN: ${en_tot.toFixed(2)} kg</span><span>Collins: ${co_tot.toFixed(2)} kg</span>`;
        
    // 4. Redraw Plots
    drawPlots();
}

// ============================================================================
// PLOTTING CONTROLLER (using Chart.js)
// ============================================================================

function drawPlots() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const tDict = PAIC_TRANSLATIONS[currentPaicLang] || PAIC_TRANSLATIONS['pt'];
    
    // Style settings
    const textColor = isDark ? "#e2e8f0" : "#2c3e50";
    const gridColor = isDark ? "rgba(226, 232, 240, 0.1)" : "rgba(44, 62, 80, 0.08)";
    const T_use = globalParams.T_use;
    
    // --- 1. Cumulative Uptake Chart ---
    if (charts.uptake) charts.uptake.destroy();
    const ctxUp = document.getElementById("canvas_uptake").getContext("2d");
    charts.uptake = new Chart(ctxUp, {
        type: 'line',
        data: {
            labels: timelineYears,
            datasets: [
                { label: tDict.chart_lbl_en_conc, data: agg_en_concreto, borderColor: "#3a7ebf", borderWidth: 2.5, fill: false, pointRadius: 0 },
                { label: tDict.chart_lbl_col_conc, data: agg_co_concreto, borderColor: "#2b8c50", borderWidth: 2.5, fill: false, pointRadius: 0 },
                { label: tDict.chart_lbl_en_mort, data: agg_en_argamassa, borderColor: "#82bbf0", borderWidth: 2.5, borderDash: [5, 5], fill: false, pointRadius: 0 },
                { label: tDict.chart_lbl_col_mort, data: agg_co_argamassa, borderColor: "#66c98c", borderWidth: 2.5, borderDash: [5, 5], fill: false, pointRadius: 0 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: tDict.chart_lbl_time, color: textColor },
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                },
                y: {
                    title: { display: true, text: tDict.chart_lbl_uptake_kg, color: textColor },
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                }
            },
            plugins: {
                legend: { labels: { color: textColor } },
                tooltip: {
                    intersect: false,
                    mode: 'index',
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toFixed(2) + ' kg';
                            }
                            return label;
                        }
                    }
                }
            }
        },
        plugins: [{
            id: 'eolLine',
            beforeDatasetsDraw: (chart) => {
                const ctx = chart.ctx;
                const xAxis = chart.scales.x;
                const yAxis = chart.scales.y;
                const xVal = xAxis.getPixelForValue(T_use);
                
                if (xVal >= xAxis.left && xVal <= xAxis.right) {
                    ctx.save();
                    
                    // Overlay cinza para a área de EoL
                    ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)";
                    ctx.fillRect(xVal, yAxis.top, xAxis.right - xVal, yAxis.bottom - yAxis.top);
                    
                    ctx.beginPath();
                    ctx.setLineDash([6, 6]);
                    ctx.strokeStyle = "#dc2626";
                    ctx.lineWidth = 1.5;
                    ctx.moveTo(xVal, yAxis.top);
                    ctx.lineTo(xVal, yAxis.bottom);
                    ctx.stroke();
                    
                    // Text label
                    ctx.fillStyle = "#dc2626";
                    ctx.font = "bold 11px sans-serif";
                    ctx.textBaseline = "bottom";
                    
                    ctx.textAlign = "right";
                    ctx.fillText("Fase de uso", xVal - 8, yAxis.bottom - 5);
                    
                    ctx.textAlign = "left";
                    ctx.fillText("Início EoL", xVal + 8, yAxis.bottom - 5);
                    
                    ctx.restore();
                }
            }
        }]
    });

    // --- 2. Carbonation Depth Chart ---
    if (charts.depth) charts.depth.destroy();
    const ctxDp = document.getElementById("canvas_depth").getContext("2d");
    
    // Generate datasets (one EN and one Possan for each element, sharing colors)
    const colorsList = ["#3a7ebf", "#2b8c50", "#d97706", "#dc2626", "#7c3aed", "#0891b2", "#db2777", "#4f46e5", "#16a34a", "#ca8a04"];
    const depthDatasets = [];
    
    calculatedResults.forEach((cr, i) => {
        const name = cr.element.name;
        const color = colorsList[i % colorsList.length];
        
        // slice to use-phase only
        const depthEnMm = cr.res.en_depth.slice(0, T_use + 1).map(v => v * 1000);
        const depthPosMm = cr.res.collins_depth.slice(0, T_use + 1).map(v => v * 1000);
        
        depthDatasets.push({
            label: `${name} (EN)`,
            data: depthEnMm,
            borderColor: color,
            borderWidth: 1.5,
            borderDash: [4, 4],
            fill: false,
            pointRadius: 0
        });
        depthDatasets.push({
            label: `${name} (Possan)`,
            data: depthPosMm,
            borderColor: color,
            borderWidth: 2,
            fill: false,
            pointRadius: 0
        });
    });

    charts.depth = new Chart(ctxDp, {
        type: 'line',
        data: {
            labels: Array.from({length: T_use + 1}, (_, i) => i),
            datasets: depthDatasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: 'Tempo (Anos)', color: textColor },
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                },
                y: {
                    title: { display: true, text: 'Profundidade Capped (mm)', color: textColor },
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                }
            },
            plugins: {
                legend: {
                    labels: { color: textColor, boxWidth: 15, font: { size: 9 } },
                    position: 'bottom'
                },
                tooltip: {
                    intersect: false,
                    mode: 'index',
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toFixed(2) + ' mm';
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });

    // --- 3. Contribution Chart (Pie) ---
    if (charts.pie) charts.pie.destroy();
    const ctxPie = document.getElementById("canvas_pie").getContext("2d");
    
    const labels = [];
    const sizes = [];
    let totalUptakeAll = 0;
    
    calculatedResults.forEach(cr => {
        const tot = cr.res.en_use_final + cr.res.en_potential_eol;
        if (tot > 0) {
            labels.push(cr.element.name);
            sizes.push(tot);
            totalUptakeAll += tot;
        }
    });

    if (totalUptakeAll > 0) {
        charts.pie = new Chart(ctxPie, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: sizes,
                    backgroundColor: colorsList.slice(0, labels.length)
                }]
            },
            plugins: [ChartDataLabels],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: textColor }, position: 'right' },
                    title: { display: true, text: 'Contribuição por Elemento (EN 16757)', color: textColor },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed.toFixed(2) + ' kg';
                                }
                                return label;
                            }
                        }
                    },
                    datalabels: {
                        color: '#ffffff',
                        font: {
                            weight: 'bold',
                            size: 12,
                        },
                        formatter: function(value, context) {
                            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            const pct = (value / total) * 100;
                            if (pct < 4) return ''; // hide label on tiny slices
                            return pct.toFixed(1) + '%';
                        },
                        textShadowColor: 'rgba(0,0,0,0.5)',
                        textShadowBlur: 4,
                    }
                }
            }
        });
    } else {
        // Draw placeholder text inside canvas
        const ctx = ctxPie;
        ctx.fillStyle = textColor;
        ctx.font = "14px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Sem dados suficientes para gerar gráfico.", 150, 150);
    }

    // --- 4. Methods Compare Chart (Bar) ---
    if (charts.compare) charts.compare.destroy();
    const ctxCmp = document.getElementById("canvas_compare").getContext("2d");
    
    const en_tot_use = calculatedResults.reduce((acc, cr) => acc + cr.res.en_use_final, 0);
    const co_tot_use = calculatedResults.reduce((acc, cr) => acc + cr.res.collins_use_final, 0);
    const en_tot_eol = calculatedResults.reduce((acc, cr) => acc + cr.res.en_potential_eol, 0);
    const co_tot_eol = calculatedResults.reduce((acc, cr) => acc + cr.res.collins_potential_eol, 0);

    charts.compare = new Chart(ctxCmp, {
        type: 'bar',
        data: {
            labels: ['EN 16757', 'Possan/Collins'],
            datasets: [
                { label: 'Fase de Uso', data: [en_tot_use, co_tot_use], backgroundColor: '#3a7ebf' },
                { label: 'EoL Potencial', data: [en_tot_eol, co_tot_eol], backgroundColor: '#2b8c50' }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { stacked: true, ticks: { color: textColor }, grid: { color: gridColor } },
                y: {
                    stacked: true,
                    title: { display: true, text: 'Captura de CO₂ (kg)', color: textColor },
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                }
            },
            plugins: {
                legend: { labels: { color: textColor } },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toFixed(2) + ' kg';
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });

    // --- 5. Balance Chart (Bar) ---
    if (charts.balance) charts.balance.destroy();
    const ctxBal = document.getElementById("canvas_balance").getContext("2d");
    
    let totalInitialEmissions = 0;
    calculatedResults.forEach(cr => {
        const vol = cr.element.area * cr.element.thickness;
        const factor = SIDAC_EMISSIONS[cr.element.material_name] || 250.0;
        totalInitialEmissions += vol * factor;
    });
    
    const totalUptakeEn = en_tot_use + en_tot_eol;
    const netBalanceEn = Math.max(0, totalInitialEmissions - totalUptakeEn);
    
    const totalUptakeCollins = co_tot_use + co_tot_eol;
    const netBalanceCollins = Math.max(0, totalInitialEmissions - totalUptakeCollins);

    // Create Hatch Patterns for Collins
    function createHatch(colorStr) {
        const canvas = document.createElement('canvas');
        canvas.width = 8;
        canvas.height = 8;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = isDark ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.4)';
        ctx.fillRect(0, 0, 8, 8);
        ctx.strokeStyle = colorStr;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-2, 10);
        ctx.lineTo(10, -2);
        ctx.stroke();
        return ctx.createPattern(canvas, 'repeat');
    }

    const colors = ['#dc2626', '#16a34a', '#3a7ebf'];
    const hatchedColors = colors.map(c => createHatch(c));

    charts.balance = new Chart(ctxBal, {
        type: 'bar',
        data: {
            labels: ['Emissão Inicial', 'Captura Total', 'Balanço Líquido'],
            datasets: [
                {
                    label: 'EN 16757',
                    data: [totalInitialEmissions, totalUptakeEn, netBalanceEn],
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                },
                {
                    label: 'Possan/Collins',
                    data: [totalInitialEmissions, totalUptakeCollins, netBalanceCollins],
                    backgroundColor: hatchedColors,
                    borderColor: colors,
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { ticks: { color: textColor }, grid: { color: gridColor } },
                y: {
                    title: { display: true, text: 'kgCO₂e', color: textColor },
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                }
            },
            plugins: {
                legend: { display: true, labels: { color: textColor } },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toFixed(2) + ' kgCO₂e';
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// ============================================================================
// DYNAMIC TABLE RENDER
// ============================================================================

function renderElementTable() {
    const tableBody = document.querySelector("#element_table_body");
    tableBody.innerHTML = "";
    
    elements.forEach((elem, idx) => {
        const row = document.createElement("tr");
        
        // Calculate Volume
        const vol = elem.area * elem.thickness;
        
        // Subtext for Material
        let subText = "";
        if (elem.material_name !== "Customizado" && materialProps[elem.material_name]) {
            const mp = materialProps[elem.material_name];
            subText = `Cim: ${mp.cement.toFixed(2)} kg/m³ | Cal: ${mp.lime.toFixed(2)} kg/m³ | fc: ${mp.fc.toFixed(2)} MPa`;
        } else {
            subText = `Cim: ${elem.cement_content.toFixed(2)} kg/m³ | Cal: ${elem.lime_content.toFixed(2)} kg/m³ | fc: ${elem.fc.toFixed(2)} MPa`;
        }
        
        // 1. Delete Cell
        const tdDelete = document.createElement("td");
        tdDelete.className = "text-center";
        tdDelete.innerHTML = `<button class="btn btn-sm btn-danger" onclick="deleteElementRow(${idx})">✕</button>`;
        row.appendChild(tdDelete);
        
        // 2. Name
        const tdName = document.createElement("td");
        tdName.innerHTML = `<input type="text" class="form-control" value="${elem.name}" onchange="updateElemField(${idx}, 'name', this.value)">`;
        row.appendChild(tdName);
        
        // 3. Area
        const tdArea = document.createElement("td");
        tdArea.innerHTML = `<input type="number" step="0.01" class="form-control text-center" style="width: 70px" value="${elem.area.toFixed(2)}" onchange="updateElemField(${idx}, 'area', parseFloat(this.value))">`;
        row.appendChild(tdArea);
        
        // 4. Thickness
        const tdThick = document.createElement("td");
        tdThick.innerHTML = `<input type="number" step="0.01" class="form-control text-center" style="width: 70px" value="${elem.thickness.toFixed(2)}" onchange="updateElemField(${idx}, 'thickness', parseFloat(this.value))">`;
        row.appendChild(tdThick);
        
        // 5. Volume (Read-only)
        const tdVol = document.createElement("td");
        tdVol.className = "text-center";
        tdVol.style.color = "var(--text-muted)";
        tdVol.innerText = vol.toFixed(2);
        row.appendChild(tdVol);
        
        // 6. Material Selector
        const tdMat = document.createElement("td");
        const matSelect = document.createElement("select");
        matSelect.className = "form-control";
        matSelect.style.width = "150px";
        
        // Populate options
        Object.keys(materialProps).forEach(matName => {
            const opt = document.createElement("option");
            opt.value = matName;
            opt.innerText = matName;
            if (elem.material_name === matName) opt.selected = true;
            matSelect.appendChild(opt);
        });
        
        const optCust = document.createElement("option");
        optCust.value = "Customizado";
        optCust.innerText = "Customizado";
        if (elem.material_name === "Customizado") optCust.selected = true;
        matSelect.appendChild(optCust);
        
        matSelect.onchange = (e) => updateElemMaterial(idx, e.target.value);
        
        const matDiv = document.createElement("div");
        matDiv.className = "cell-material";
        matDiv.appendChild(matSelect);
        matDiv.innerHTML += `<span class="cell-subtext">${subText}</span>`;
        
        // Rebind change listener on innerHTML replace
        matDiv.querySelector("select").value = elem.material_name;
        matDiv.querySelector("select").onchange = (e) => updateElemMaterial(idx, e.target.value);
        
        tdMat.appendChild(matDiv);
        row.appendChild(tdMat);
        
        // 7. Exposure EN/Possan Selector
        const tdExp = document.createElement("td");
        tdExp.innerHTML = `
            <div class="cell-exposure">
                <div class="exposure-row">
                    <span>EN:</span>
                    <select class="form-control" onchange="updateElemField(${idx}, 'exposure_class_en', this.value)">
                        <option value="Indoor with cover" ${elem.exposure_class_en === 'Indoor with cover' ? 'selected' : ''}>Indoor with cover</option>
                        <option value="Indoor without cover" ${elem.exposure_class_en === 'Indoor without cover' ? 'selected' : ''}>Indoor without cover</option>
                        <option value="Outdoor sheltered" ${elem.exposure_class_en === 'Outdoor sheltered' ? 'selected' : ''}>Outdoor sheltered</option>
                        <option value="Outdoor rain exposed" ${elem.exposure_class_en === 'Outdoor rain exposed' ? 'selected' : ''}>Outdoor rain exposed</option>
                        <option value="In ground" ${elem.exposure_class_en === 'In ground' ? 'selected' : ''}>In ground</option>
                    </select>
                </div>
                <div class="exposure-row">
                    <span>Possan:</span>
                    <select class="form-control" onchange="updateElemField(${idx}, 'exposure_class_possan', this.value)">
                        <option value="Ambiente interno protegido da chuva" ${elem.exposure_class_possan === 'Ambiente interno protegido da chuva' ? 'selected' : ''}>Ambiente interno protegido da chuva</option>
                        <option value="Ambiente externo protegido da chuva" ${elem.exposure_class_possan === 'Ambiente externo protegido da chuva' ? 'selected' : ''}>Ambiente externo protegido da chuva</option>
                        <option value="Ambiente externo desprotegido da chuva" ${elem.exposure_class_possan === 'Ambiente externo desprotegido da chuva' ? 'selected' : ''}>Ambiente externo desprotegido da chuva</option>
                    </select>
                </div>
            </div>
        `;
        row.appendChild(tdExp);
        
        // 8. Advanced Button
        const tdConfig = document.createElement("td");
        tdConfig.className = "text-center";
        tdConfig.innerHTML = `<button class="btn btn-sm btn-secondary" onclick="openElementConfigModal(${idx})">⚙</button>`;
        row.appendChild(tdConfig);
        
        tableBody.appendChild(row);
    });
}

// ============================================================================
// DIALOG CONTROLLERS (Modal Dialogs)
// ============================================================================

// 1. Cement configuration modal
function openCementModal() {
    const dialog = document.getElementById("cement_dialog");
    const container = document.getElementById("cement_coeffs_container");
    container.innerHTML = "";
    
    // Draw table rows
    Object.entries(cementCoeffs).forEach(([cType, val]) => {
        const row = document.createElement("div");
        row.className = "coeff-grid";
        row.style.marginBottom = "10px";
        
        row.innerHTML = `
            <span style="font-weight: 600">${cType}</span>
            <input type="number" step="0.01" class="form-control text-center" data-type="${cType}" data-coeff="kc" value="${val.kc.toFixed(2)}">
            <input type="number" step="0.01" class="form-control text-center" data-type="${cType}" data-coeff="k_fc" value="${val.k_fc.toFixed(2)}">
            <input type="number" step="0.01" class="form-control text-center" data-type="${cType}" data-coeff="k_ad" value="${val.k_ad.toFixed(2)}">
            <input type="number" step="0.01" class="form-control text-center" data-type="${cType}" data-coeff="k_co2" value="${val.k_co2.toFixed(2)}">
            <input type="number" step="0.01" class="form-control text-center" data-type="${cType}" data-coeff="k_UR" value="${val.k_UR.toFixed(2)}">
        `;
        container.appendChild(row);
    });
    
    dialog.showModal();
}

function saveCementModal() {
    const dialog = document.getElementById("cement_dialog");
    const inputs = dialog.querySelectorAll("input");
    
    inputs.forEach(input => {
        const type = input.getAttribute("data-type");
        const coeff = input.getAttribute("data-coeff");
        const val = parseFloat(input.value);
        if (!isNaN(val)) {
            cementCoeffs[type][coeff] = val;
        }
    });
    
    dialog.close();
    recalculate();
}

// 2. Material preset config modal
function openMaterialModal() {
    const dialog = document.getElementById("material_dialog");
    const container = document.getElementById("material_props_container");
    container.innerHTML = "";
    
    const cementTypes = Object.keys(cementCoeffs);
    
    Object.entries(materialProps).forEach(([matName, props]) => {
        const row = document.createElement("div");
        row.className = "material-props-grid";
        row.style.marginBottom = "8px";
        
        // cement types options
        let selectHtml = `<select class="form-control" data-mat="${matName}" data-prop="cement_type">`;
        cementTypes.forEach(ct => {
            selectHtml += `<option value="${ct}" ${props.cement_type === ct ? 'selected' : ''}>${ct}</option>`;
        });
        selectHtml += `</select>`;
        
        row.innerHTML = `
            <span style="font-weight: 600; font-size: 0.8rem;">${matName}</span>
            <input type="number" step="0.01" class="form-control text-center" data-mat="${matName}" data-prop="fc" value="${props.fc.toFixed(2)}">
            <input type="number" step="0.01" class="form-control text-center" data-mat="${matName}" data-prop="cement" value="${props.cement.toFixed(2)}">
            <input type="number" step="0.01" class="form-control text-center" data-mat="${matName}" data-prop="lime" value="${props.lime.toFixed(2)}">
            ${selectHtml}
        `;
        container.appendChild(row);
    });
    
    dialog.showModal();
}

function restoreMaterialDefaults() {
    materialProps = JSON.parse(JSON.stringify(SIDAC_MATERIALS));
    openMaterialModal(); // redraw
}

function saveMaterialModal() {
    const dialog = document.getElementById("material_dialog");
    
    // Scan inputs
    const inputs = dialog.querySelectorAll("input");
    inputs.forEach(input => {
        const mat = input.getAttribute("data-mat");
        const prop = input.getAttribute("data-prop");
        const val = parseFloat(input.value);
        if (!isNaN(val)) {
            materialProps[mat][prop] = val;
        }
    });
    
    // Scan selects
    const selects = dialog.querySelectorAll("select");
    selects.forEach(sel => {
        const mat = sel.getAttribute("data-mat");
        const prop = sel.getAttribute("data-prop");
        materialProps[mat][prop] = sel.value;
    });
    
    // Re-apply updated props to elements that use presets
    elements.forEach(elem => {
        const mat = elem.material_name;
        if (mat !== "Customizado" && materialProps[mat]) {
            const mp = materialProps[mat];
            elem.fc = mp.fc;
            elem.cement_content = mp.cement;
            elem.lime_content = mp.lime;
            elem.cement_type = mp.cement_type;
        }
    });
    
    dialog.close();
    renderElementTable();
    recalculate();
}

// 3. Element advanced configuration modal
let currentEditingElementIndex = null;

function openElementConfigModal(idx) {
    currentEditingElementIndex = idx;
    const elem = elements[idx];
    const dialog = document.getElementById("element_dialog");
    
    // Setup title
    document.getElementById("element_modal_subtitle").innerText = elem.name;
    
    // TAB 1 values
    document.getElementById("elem_fc").value = elem.fc.toFixed(2);
    document.getElementById("elem_cement_content").value = elem.cement_content.toFixed(2);
    document.getElementById("elem_lime_content").value = elem.lime_content.toFixed(2);
    
    const cementSelect = document.getElementById("elem_cement_type");
    cementSelect.innerHTML = "";
    Object.keys(cementCoeffs).forEach(ct => {
        cementSelect.innerHTML += `<option value="${ct}" ${elem.cement_type === ct ? 'selected' : ''}>${ct}</option>`;
    });
    
    // TAB 2 (EN) values
    const k_default = getEnKDefault(elem.fc, elem.exposure_class_en);
    const dc_default = getEnDcDefault(elem.exposure_class_en);
    const cemCat = CP_TO_CEM_MAP[elem.cement_type] || "CEM II/A";
    const utcc_default = EN_UTCC_BY_CEM[cemCat] || 0.41;
    
    // Set values and active/inactive checkbox state
    document.getElementById("chk_override_k").checked = elem.custom_k_en !== null;
    document.getElementById("elem_k_en").value = (elem.custom_k_en !== null ? elem.custom_k_en : k_default).toFixed(2);
    
    document.getElementById("chk_override_dc").checked = elem.custom_dc_en !== null;
    document.getElementById("elem_dc_en").value = (elem.custom_dc_en !== null ? elem.custom_dc_en : dc_default).toFixed(2);
    
    document.getElementById("chk_override_utcc").checked = elem.custom_utcc_en !== null;
    document.getElementById("elem_utcc_en").value = (elem.custom_utcc_en !== null ? elem.custom_utcc_en : utcc_default).toFixed(2);
    
    // TAB 3 (Possan) values
    const kce_default = getPossanKceDefault(elem.exposure_class_possan);
    
    document.getElementById("chk_override_kce").checked = elem.custom_kce_possan !== null;
    document.getElementById("elem_kce_possan").value = (elem.custom_kce_possan !== null ? elem.custom_kce_possan : kce_default).toFixed(2);
    
    // Setup reference texts
    document.getElementById("ref_en_k").innerText = k_default.toFixed(2);
    document.getElementById("ref_en_dc").innerText = dc_default.toFixed(2);
    document.getElementById("ref_possan_kce").innerText = kce_default.toFixed(2);
    
    // Exposure Highlight reference table
    document.querySelectorAll(".possan-ref-row").forEach(row => {
        if (row.getAttribute("data-exp") === elem.exposure_class_possan) {
            row.style.fontWeight = "bold";
            row.style.color = "#7ec8a0";
        } else {
            row.style.fontWeight = "normal";
            row.style.color = "#888888";
        }
    });
    
    // Set fields disabled/enabled states
    toggleEnFields();
    togglePossanFields();
    
    // Switch to first tab initially
    switchModalTab(null, 'elem_tab_materials');
    
    dialog.showModal();
}

function toggleEnFields() {
    document.getElementById("elem_k_en").disabled = !document.getElementById("chk_override_k").checked;
    document.getElementById("elem_dc_en").disabled = !document.getElementById("chk_override_dc").checked;
    document.getElementById("elem_utcc_en").disabled = !document.getElementById("chk_override_utcc").checked;
}

function togglePossanFields() {
    document.getElementById("elem_kce_possan").disabled = !document.getElementById("chk_override_kce").checked;
}

function switchModalTab(evt, tabId) {
    // Hide all contents
    const contents = document.querySelectorAll(".modal-tab-content");
    contents.forEach(c => c.classList.remove("active"));
    
    // Deactivate buttons
    const btns = document.querySelectorAll(".modal-tab-btn");
    btns.forEach(b => b.classList.remove("active"));
    
    // Show current tab
    document.getElementById(tabId).classList.add("active");
    if (evt) {
        evt.currentTarget.classList.add("active");
    } else {
        // default select first button
        document.querySelector(`[onclick*="'${tabId}'"]`).classList.add("active");
    }
}

function saveElementConfigModal() {
    if (currentEditingElementIndex === null) return;
    
    const elem = elements[currentEditingElementIndex];
    
    // TAB 1
    elem.fc = parseFloat(document.getElementById("elem_fc").value) || 20;
    elem.cement_content = parseFloat(document.getElementById("elem_cement_content").value) || 260;
    elem.lime_content = parseFloat(document.getElementById("elem_lime_content").value) || 0;
    elem.cement_type = document.getElementById("elem_cement_type").value;
    
    // TAB 2 overrides
    if (document.getElementById("chk_override_k").checked) {
        elem.custom_k_en = parseFloat(document.getElementById("elem_k_en").value) || 1.0;
    } else {
        elem.custom_k_en = null;
    }
    
    if (document.getElementById("chk_override_dc").checked) {
        elem.custom_dc_en = parseFloat(document.getElementById("elem_dc_en").value) || 40.0;
    } else {
        elem.custom_dc_en = null;
    }
    
    if (document.getElementById("chk_override_utcc").checked) {
        elem.custom_utcc_en = parseFloat(document.getElementById("elem_utcc_en").value) || 0.41;
    } else {
        elem.custom_utcc_en = null;
    }
    
    // TAB 3 override
    if (document.getElementById("chk_override_kce").checked) {
        elem.custom_kce_possan = parseFloat(document.getElementById("elem_kce_possan").value) || 1.0;
    } else {
        elem.custom_kce_possan = null;
    }
    
    document.getElementById("element_dialog").close();
    renderElementTable();
    recalculate();
}

// ============================================================================
// TABLE ROW ACTIONS
// ============================================================================

function addDefaultElement() {
    elements.push({
        name: `Elemento ${elements.length + 1}`,
        area: 10.0,
        thickness: 0.10,
        material_name: "Concrete 20Mpa",
        exposure_class_en: "Indoor with cover",
        exposure_class_possan: "Ambiente interno protegido da chuva",
        fc: 20.0,
        cement_content: 260.0,
        lime_content: 0.0,
        cement_type: "CP II F",
        custom_k_en: null,
        custom_dc_en: null,
        custom_utcc_en: null,
        custom_kce_possan: null
    });
}

function addElementRow() {
    addDefaultElement();
    renderElementTable();
    recalculate();
}

function deleteElementRow(idx) {
    if (elements.length <= 1) {
        alert("A tabela deve conter pelo menos um elemento.");
        return;
    }
    elements.splice(idx, 1);
    renderElementTable();
    recalculate();
}

function updateElemField(idx, field, value) {
    if (idx < elements.length) {
        elements[idx][field] = value;
        
        // If updating thickness or area, re-render to update Volume column
        if (field === 'thickness' || field === 'area') {
            renderElementTable();
        }
        recalculate();
    }
}

function updateElemMaterial(idx, val) {
    elements[idx].material_name = val;
    if (val !== "Customizado" && materialProps[val]) {
        const defaults = materialProps[val];
        elements[idx].fc = defaults.fc;
        elements[idx].cement_content = defaults.cement;
        elements[idx].lime_content = defaults.lime;
        elements[idx].cement_type = defaults.cement_type;
        // Reset overrides when preset material is selected
        elements[idx].custom_k_en = null;
        elements[idx].custom_dc_en = null;
        elements[idx].custom_utcc_en = null;
    }
    renderElementTable();
    recalculate();
}

// ============================================================================
// IMPORT & EXPORT LOGIC
// ============================================================================

function exportResultsCSV() {
    if (elements.length === 0) {
        alert("Não há dados para exportar.");
        return;
    }
    
    let csv = "Elemento;Área (m²);Espessura (m);Volume (m³);Material;Exposição (EN);Exposição (Possan);fc (MPa);Cimento (kg/m³);Cal (kg/m³);EN Uso (kg);EN EoL Din. (kg);EN EoL Pot. (kg);Collins Uso (kg);Collins EoL Din. (kg);Collins EoL Pot. (kg)\r\n";
    
    calculatedResults.forEach(cr => {
        const vol = cr.element.area * cr.element.thickness;
        const row = [
            cr.element.name,
            cr.element.area.toFixed(2),
            cr.element.thickness.toFixed(2),
            vol.toFixed(2),
            cr.element.material_name,
            cr.element.exposure_class_en,
            cr.element.exposure_class_possan,
            cr.element.fc.toFixed(2),
            cr.element.cement_content.toFixed(2),
            cr.element.lime_content.toFixed(2),
            cr.res.en_use_final.toFixed(2),
            cr.res.en_eol_final.toFixed(2),
            cr.res.en_potential_eol.toFixed(2),
            cr.res.collins_use_final.toFixed(2),
            cr.res.collins_eol_final.toFixed(2),
            cr.res.collins_potential_eol.toFixed(2)
        ];
        csv += row.join(";") + "\r\n";
    });
    
    // Download trigger
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { type: "text/csv;charset=utf-8;" }); // utf-8-sig BOM
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "Relatorio_Carbonatacao.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportResultsExcel() {
    if (elements.length === 0) {
        alert("Não há dados para exportar.");
        return;
    }
    
    try {
        const wb = XLSX.utils.book_new();
        
        // Sheet 1: Summary element table
        const ws1Data = [];
        ws1Data.push(["Relatório de Captura de CO₂ por Carbonatação"]);
        ws1Data.push([]); // blank row
        
        const headers = [
            "Elemento", "Área (m²)", "Espessura (m)", "Volume (m³)", 
            "Material", "Exposição (EN)", "Exposição (Possan)", "fc (MPa)", "Cimento (kg/m³)", "Cal (kg/m³)",
            "EN Uso (kg)", "EN EoL Din. (kg)", "EN EoL Pot. (kg)",
            "Collins Uso (kg)", "Collins EoL Din. (kg)", "Collins EoL Pot. (kg)"
        ];
        ws1Data.push(headers);
        
        let startRow = 4;
        calculatedResults.forEach((cr, idx) => {
            const vol = cr.element.area * cr.element.thickness;
            ws1Data.push([
                cr.element.name,
                cr.element.area,
                cr.element.thickness,
                vol,
                cr.element.material_name,
                cr.element.exposure_class_en,
                cr.element.exposure_class_possan,
                cr.element.fc,
                cr.element.cement_content,
                cr.element.lime_content,
                cr.res.en_use_final,
                cr.res.en_eol_final,
                cr.res.en_potential_eol,
                cr.res.collins_use_final,
                cr.res.collins_eol_final,
                cr.res.collins_potential_eol
            ]);
        });
        
        // Totals Formula Row
        const lastRowIdx = ws1Data.length;
        const totalRow = ["TOTAL", "", "", ""]; // placeholders for formula values
        // Area sum, Thickness sum, Vol sum, Cal sum, EN sums, Collins sums
        // Col indices: A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, I=9, J=10, K=11, L=12, M=13, N=14, O=15, P=16
        // Col letters: A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P
        const formulaCols = [2, 3, 4, 10, 11, 12, 13, 14, 15, 16];
        
        const ws1 = XLSX.utils.aoa_to_sheet(ws1Data);
        
        // Write SUM formulas to the worksheet cells manually
        const r_total = lastRowIdx + 1;
        ws1["A" + r_total] = { v: "TOTAL", t: 's' };
        
        formulaCols.forEach(colIdx => {
            const letter = String.fromCharCode(64 + colIdx); // A, B, C...
            const cellRef = letter + r_total;
            ws1[cellRef] = {
                f: `SUM(${letter}4:${letter}${r_total - 1})`,
                t: 'n'
            };
        });
        
        // Set column widths
        ws1['!cols'] = headers.map(() => ({ wch: 15 }));
        
        XLSX.utils.book_append_sheet(wb, ws1, "Resumo dos Elementos");
        
        // Sheet 2: Detailed Yearly Timeline Panel — annual (per-year) values
        const ws2Data = [];
        ws2Data.push(["Inventário ACV — Absorção Anual de CO₂ por Carbonatação (kg/ano)"]);
        ws2Data.push([]);
        
        const ws2Headers = ["Ano", "Total EN 16757 (kg/ano)", "Total Possan/Collins (kg/ano)"];
        elements.forEach(elem => {
            ws2Headers.push(`${elem.name} - EN (kg/ano)`);
            ws2Headers.push(`${elem.name} - Collins (kg/ano)`);
        });
        ws2Data.push(ws2Headers);
        
        // Populate years — show annual delta (cumulative[t] - cumulative[t-1])
        timelineYears.forEach((year, yIdx) => {
            const prevIdx = yIdx > 0 ? yIdx - 1 : null;
            
            const deltaTotal_en     = prevIdx !== null ? agg_en_uptake[yIdx]      - agg_en_uptake[prevIdx]      : agg_en_uptake[yIdx];
            const deltaTotal_co     = prevIdx !== null ? agg_collins_uptake[yIdx]  - agg_collins_uptake[prevIdx]  : agg_collins_uptake[yIdx];
            
            const row = [year, deltaTotal_en, deltaTotal_co];
            calculatedResults.forEach(cr => {
                const delta_en  = prevIdx !== null ? cr.res.en_uptake[yIdx]      - cr.res.en_uptake[prevIdx]      : cr.res.en_uptake[yIdx];
                const delta_co  = prevIdx !== null ? cr.res.collins_uptake[yIdx]  - cr.res.collins_uptake[prevIdx]  : cr.res.collins_uptake[yIdx];
                row.push(delta_en);
                row.push(delta_co);
            });
            ws2Data.push(row);
        });
        
        const ws2 = XLSX.utils.aoa_to_sheet(ws2Data);
        ws2['!cols'] = ws2Headers.map(() => ({ wch: 22 }));
        
        XLSX.utils.book_append_sheet(wb, ws2, "Inventário ACV");
        
        // Write file
        XLSX.writeFile(wb, "Relatorio_Carbonatacao.xlsx");
        
    } catch(err) {
        alert("Erro ao exportar Excel: " + err.message);
    }
}

function handleFileInput(evt) {
    const file = evt.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    // Check extension
    if (file.name.endsWith(".csv")) {
        reader.onload = (e) => {
            const text = e.target.result;
            parseCSVContent(text);
        };
        reader.readAsText(file, "UTF-8");
    } else {
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            parseExcelContent(data);
        };
        reader.readAsArrayBuffer(file);
    }
    
    // Clear input value so file can be imported again
    evt.target.value = "";
}

function parseCSVContent(text) {
    try {
        const lines = text.split(/\r?\n/);
        if (lines.length < 2) throw new Error("Planilha vazia ou inválida.");
        
        // Check delimiter (usually semicolon or comma)
        const delimiter = lines[0].includes(";") ? ";" : ",";
        const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''));
        
        const idxElem = headers.indexOf("Elemento");
        if (idxElem === -1) throw new Error("Coluna 'Elemento' não encontrada.");
        
        const rows = [];
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            const cols = lines[i].split(delimiter).map(c => c.trim().replace(/^"|"$/g, ''));
            if (cols[idxElem] === "" || cols[idxElem].toUpperCase() === "TOTAL" || cols[idxElem] === "-") break;
            
            rows.push({
                name: cols[idxElem],
                area: parseFloat(cols[headers.indexOf("Área (m²)")]) || 10.0,
                thickness: parseFloat(cols[headers.indexOf("Espessura (m)")]) || 0.1,
                material_name: cols[headers.indexOf("Material")] || "Concrete 20Mpa",
                exposure_class_en: cols[headers.indexOf("Exposição (EN)")] || "Indoor with cover",
                exposure_class_possan: cols[headers.indexOf("Exposição (Possan)")] || "Ambiente interno protegido da chuva",
                fc: parseFloat(cols[headers.indexOf("fc (MPa)")]) || 20.0,
                cement_content: parseFloat(cols[headers.indexOf("Cimento (kg/m³)")]) || 260.0,
                lime_content: parseFloat(cols[headers.indexOf("Cal (kg/m³)")]) || 0.0,
                cement_type: "CP II F",
                custom_k_en: null,
                custom_dc_en: null,
                custom_utcc_en: null,
                custom_kce_possan: null
            });
        }
        
        applyImportedData(rows);
    } catch(err) {
        customAlert("Erro ao importar CSV: " + err.message);
    }
}

function parseExcelContent(data) {
    try {
        const workbook = XLSX.read(data, { type: 'array' });
        
        let ws = workbook.Sheets["Preencher"];
        if (!ws) {
            // fallback to first sheet if Preencher sheet doesn't exist
            ws = workbook.Sheets[workbook.SheetNames[0]];
            alert(`Aviso: Aba 'Preencher' não encontrada. Importando a aba '${workbook.SheetNames[0]}'`);
        }
        
        // Convert to array of arrays
        const rowsAoa = XLSX.utils.sheet_to_json(ws, { header: 1 });
        if (rowsAoa.length === 0) throw new Error("Planilha vazia.");
        
        // Locate header row containing 'Elemento'
        let headerRowIdx = -1;
        for (let i = 0; i < Math.min(10, rowsAoa.length); i++) {
            if (rowsAoa[i] && rowsAoa[i].includes("Elemento")) {
                headerRowIdx = i;
                break;
            }
        }
        
        if (headerRowIdx === -1) {
            // try default header index 0
            headerRowIdx = 0;
            if (!rowsAoa[0] || !rowsAoa[0].includes("Elemento")) {
                throw new Error("Não foi possível encontrar a coluna 'Elemento' na planilha.");
            }
        }
        
        const headers = rowsAoa[headerRowIdx].map(h => String(h || '').trim());
        
        const idxName = headers.indexOf("Elemento");
        const idxArea = headers.findIndex(h => h.includes("Área"));
        const idxThick = headers.findIndex(h => h.includes("Espessura"));
        const idxMat = headers.indexOf("Material");
        const idxEn = headers.findIndex(h => h.includes("Exposição (EN)") || h.includes("Classe Exposição (EN)"));
        const idxPos = headers.findIndex(h => h.includes("Exposição (Possan)") || h.includes("Classe Exposição (Possan)"));
        const idxFc = headers.findIndex(h => h.includes("fc (MPa)") || h.includes("Fck/fc"));
        const idxCim = headers.findIndex(h => h.includes("Cimento"));
        const idxLime = headers.findIndex(h => h.includes("Cal"));
        
        const matMap = {};
        Object.keys(materialProps).forEach(k => matMap[k.toLowerCase()] = k);
        
        const parsedElements = [];
        for (let i = headerRowIdx + 1; i < rowsAoa.length; i++) {
            const row = rowsAoa[i];
            if (!row || !row[idxName]) continue;
            
            const name = String(row[idxName]).trim();
            if (name === "" || name === "nan" || name.toUpperCase() === "TOTAL" || name === "-") break;
            
            const rawMat = String(row[idxMat] || "Customizado").trim().toLowerCase();
            const matName = matMap[rawMat] ? matMap[rawMat] : "Customizado";
            
            let exp_en = String(row[idxEn] || "Indoor with cover").trim();
            let exp_possan = String(row[idxPos] || "Ambiente interno protegido da chuva").trim();
            
            // Normalize exposures
            const enList = ["Indoor with cover", "Indoor without cover", "Outdoor sheltered", "Outdoor rain exposed", "In ground"];
            const matchEn = enList.find(e => e.toLowerCase() === exp_en.toLowerCase());
            if (matchEn) exp_en = matchEn;
            
            if (exp_possan.toLowerCase().includes("interno desprotegido")) {
                exp_possan = "Ambiente interno protegido da chuva";
            }
            const posList = ["Ambiente interno protegido da chuva", "Ambiente externo protegido da chuva", "Ambiente externo desprotegido da chuva"];
            const matchPos = posList.find(p => p.toLowerCase() === exp_possan.toLowerCase());
            if (matchPos) exp_possan = matchPos;
            
            const elem = {
                name: name,
                area: parseFloat(row[idxArea]) || 10.0,
                thickness: parseFloat(row[idxThick]) || 0.1,
                material_name: matName,
                exposure_class_en: exp_en,
                exposure_class_possan: exp_possan,
                fc: parseFloat(row[idxFc]) || 20.0,
                cement_content: parseFloat(row[idxCim]) || 260.0,
                lime_content: parseFloat(row[idxLime]) || 0.0,
                cement_type: "CP II F",
                custom_k_en: null,
                custom_dc_en: null,
                custom_utcc_en: null,
                custom_kce_possan: null
            };
            
            // Inject defaults if presets
            if (matName !== "Customizado" && materialProps[matName]) {
                const defaults = materialProps[matName];
                elem.fc = defaults.fc;
                elem.cement_content = defaults.cement;
                elem.lime_content = defaults.lime;
                elem.cement_type = defaults.cement_type;
            }
            
            parsedElements.push(elem);
        }
        
        applyImportedData(parsedElements);
        
    } catch(err) {
        customAlert("Erro ao importar planilha Excel: " + err.message);
    }
}

async function applyImportedData(newElements) {
    if (newElements.length === 0) {
        await customAlert("Nenhum elemento válido foi importado.");
        return;
    }
    
    const replace = await customConfirm(
        `Foram encontrados ${newElements.length} elementos.\nClique em OK para SUBSTITUIR a tabela atual.\nClique em Adicionar para ADICIONAR aos elementos existentes.`,
        'Substituir',
        'Adicionar'
    );
    
    if (replace) {
        elements = newElements;
    } else {
        elements = elements.concat(newElements);
    }
    
    renderElementTable();
    recalculate();
}

// ============================================================================
// CUSTOM MODAL HELPERS (replaces native alert / confirm to preserve fullscreen)
// ============================================================================

/**
 * Shows a non-blocking alert dialog styled with the app's design system.
 * @param {string} message - The message to display.
 * @returns {Promise<void>} Resolves when the user clicks OK.
 */
function customAlert(message) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';

        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');

        const text = document.createElement('p');
        text.className = 'custom-modal-text';
        text.textContent = message; // textContent is XSS-safe

        const buttons = document.createElement('div');
        buttons.className = 'custom-modal-buttons';

        const okBtn = document.createElement('button');
        okBtn.className = 'btn btn-primary';
        okBtn.textContent = 'OK';
        okBtn.addEventListener('click', () => { overlay.remove(); resolve(); });

        buttons.appendChild(okBtn);
        modal.appendChild(text);
        modal.appendChild(buttons);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        okBtn.focus();
    });
}

/**
 * Shows a non-blocking confirm dialog styled with the app's design system.
 * @param {string} message - The message to display.
 * @param {string} okLabel - Label for the confirm button.
 * @param {string} cancelLabel - Label for the cancel button.
 * @returns {Promise<boolean>} Resolves true if the user clicks OK, false otherwise.
 */
function customConfirm(message, okLabel = 'OK', cancelLabel = 'Cancelar') {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';

        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');

        const text = document.createElement('p');
        text.className = 'custom-modal-text';
        text.textContent = message; // textContent is XSS-safe

        const buttons = document.createElement('div');
        buttons.className = 'custom-modal-buttons';

        const okBtn = document.createElement('button');
        okBtn.className = 'btn btn-primary';
        okBtn.textContent = okLabel;
        okBtn.addEventListener('click', () => { overlay.remove(); resolve(true); });

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'btn btn-secondary';
        cancelBtn.textContent = cancelLabel;
        cancelBtn.addEventListener('click', () => { overlay.remove(); resolve(false); });

        buttons.appendChild(okBtn);
        buttons.appendChild(cancelBtn);
        modal.appendChild(text);
        modal.appendChild(buttons);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        okBtn.focus();
    });
}

// ============================================================================
// SYSTEM & NAVIGATION EVENT HANDLERS
// ============================================================================

function switchTab(evt, panelId) {
    // Top Tabs navigation
    const panels = document.querySelectorAll(".main-tab-panel");
    panels.forEach(p => p.classList.remove("active"));
    
    const tabBtns = document.querySelectorAll(".main-tab-btn");
    tabBtns.forEach(b => b.classList.remove("active"));
    
    document.getElementById(panelId).classList.add("active");
    evt.currentTarget.classList.add("active");
    
    // Draw plots again if switching to Workspace view
    if (panelId === 'main_tab_workspace') {
        setTimeout(drawPlots, 50);
    }
}

function switchChartTab(evt, tabContentId) {
    const contents = document.querySelectorAll(".tab-content");
    contents.forEach(c => c.classList.remove("active"));
    
    const btns = document.querySelectorAll(".tab-btn");
    btns.forEach(b => b.classList.remove("active"));
    
    document.getElementById(tabContentId).classList.add("active");
    evt.currentTarget.classList.add("active");
}

function toggleTheme() {
    try {
        if (window.self !== window.top && window.parent && window.parent.document) {
            const parentButton = window.parent.document.querySelector('button[aria-label="Toggle theme"]');
            if (parentButton) {
                parentButton.click();
                return;
            }
        }
    } catch (e) {
        console.warn("Could not toggle theme on parent page:", e);
    }

    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    
    // Redraw charts
    recalculate();
}

function toggleFullscreen() {
    try {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    } catch (e) {
        console.warn("Fullscreen API not supported or blocked:", e);
    }
}

// Initialize application on load
window.addEventListener("DOMContentLoaded", () => {
    // Sync language with parent site if embedded in an iframe
    const syncLanguage = () => {
        let parentLang = 'pt';
        try {
            if (window.parent && window.parent.i18next && window.parent.i18next.language) {
                parentLang = window.parent.i18next.language;
            } else if (window.parent && window.parent.localStorage) {
                parentLang = window.parent.localStorage.getItem('i18nextLng') || 'pt';
            }
        } catch(e) {
            parentLang = localStorage.getItem('paicacv_lang') || 'pt';
        }
        
        let code = 'pt';
        if (parentLang.startsWith('es')) code = 'es';
        else if (parentLang.startsWith('zh')) code = 'zh';
        else if (parentLang.startsWith('en')) code = 'en';
        
        changePaicLanguage(code);
    };

    syncLanguage();

    try {
        if (window.self !== window.top && window.parent) {
            const langCheckInterval = setInterval(syncLanguage, 1000);
            window.addEventListener('beforeunload', () => clearInterval(langCheckInterval));
        }
    } catch(e) {}

    // Sync theme with parent site if embedded in an iframe
    try {
        if (window.self !== window.top) {
            if (window.parent && window.parent.document && window.parent.document.documentElement) {
                const syncTheme = () => {
                    const isParentDark = window.parent.document.documentElement.classList.contains("dark");
                    document.documentElement.setAttribute("data-theme", isParentDark ? "dark" : "light");
                    recalculate();
                };
                
                // Sync initially
                syncTheme();
                
                // Observe parent class changes
                const observer = new MutationObserver(syncTheme);
                observer.observe(window.parent.document.documentElement, {
                    attributes: true,
                    attributeFilter: ['class']
                });
            }
        }
    } catch (e) {
        console.warn("Could not sync theme with parent window:", e);
    }

    // Add one default row to begin
    addDefaultElement();
    
    // Set active main tab initially
    document.querySelector(".main-tab-btn").classList.add("active");
    document.getElementById("main_tab_workspace").classList.add("active");
    
    // Set active chart tab initially
    document.querySelector(".tab-btn").classList.add("active");
    document.getElementById("tab_content_uptake").classList.add("active");
    
    // Bind Enter and Blur events to inputs to recalculate dynamically
    const inputs = document.querySelectorAll(".sidebar input");
    inputs.forEach(input => {
        input.addEventListener("blur", () => {
            const val = parseFloat(input.value);
            if (!isNaN(val)) {
                input.value = val.toFixed(2);
            }
            recalculate();
        });
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const val = parseFloat(input.value);
                if (!isNaN(val)) {
                    input.value = val.toFixed(2);
                }
                recalculate();
                input.blur();
            }
        });
        // Initial formatting of the input value on load
        const initVal = parseFloat(input.value);
        if (!isNaN(initVal)) {
            input.value = initVal.toFixed(2);
        }
    });
    
    // Handle fullscreen aspect ratio correction
    document.addEventListener("fullscreenchange", () => {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
            if(typeof drawPlots === 'function') drawPlots();
        }, 150);
    });

    // Render initially
    renderElementTable();
    recalculate();
});
